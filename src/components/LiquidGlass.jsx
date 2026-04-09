'use client';
import { useEffect, useRef } from 'react';

/* ── Constants ── */
const MAX_DROPLETS  = 30;
const FIXED_DT_MS   = 10;
const MAX_FRAME_DT  = 100;
const MAX_CATCHUP   = 5;
const MAX_ENTRIES   = MAX_DROPLETS * 2; // main + ghost

/* ── GLSL shaders ── */
const VERT = `void main(){ gl_Position = vec4(position, 1.0); }`;

/* MAX_N must match MAX_ENTRIES */
const FRAG = `
precision highp float;
#define MAX_N ${MAX_ENTRIES}

uniform vec2      uRes;
uniform sampler2D uData;
uniform sampler2D uBg;
uniform int       uCount;

void main(){
  vec2  uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2  p   = (uv - 0.5) * vec2(asp, 1.0);

  float field = 0.0;
  vec2  grad  = vec2(0.0);
  vec2  lens  = vec2(0.0);
  float lensW = 0.0;

  for(int i = 0; i < MAX_N; i++){
    if(i >= uCount) break;
    vec4  d     = texture2D(uData, vec2((float(i) + 0.5) / float(MAX_N), 0.5));
    vec2  c     = d.xy;
    float r     = d.z;
    if(r < 0.001) continue;
    vec2  delta = p - c;
    float dSq   = dot(delta, delta) + 1e-5;
    float contrib = r * r / dSq;
    field += contrib;
    grad  += -2.0 * contrib / dSq * delta;
    float w = r * r / (dSq + r * r);
    lens  += (c - p) * w;
    lensW += w;
  }

  lens /= (lensW + 0.001);
  float lensLen = length(lens);

  float thr  = 1.0;
  float edge = smoothstep(thr - 0.08, thr + 0.03, field);

  /* Refraction */
  float mappedLens   = atan(lensLen * 6.0) * 0.038;
  vec2  refractDir   = lensLen > 1e-5 ? lens / lensLen : vec2(0.0);
  float refractMask  = smoothstep(thr - 0.2, thr + 1.5, field);
  vec2  refractedUV  = clamp(uv + refractDir * mappedLens * refractMask, 0.001, 0.999);

  vec3  bgClean = texture2D(uBg, uv).rgb;

  /* Normal / lighting */
  float gradLen = length(grad);
  float nScale  = atan(gradLen * 0.6) * 0.45;  /* amplified normal */
  vec2  nGrad   = gradLen > 1e-4 ? (grad / gradLen) * nScale : vec2(0.0);
  vec3  N = normalize(vec3(-nGrad, 1.0));
  /* Two light sources: key + fill */
  vec3  L1 = normalize(vec3( 0.4,  0.7, 1.0));
  vec3  L2 = normalize(vec3(-0.5, -0.3, 0.8));
  vec3  V  = vec3(0.0, 0.0, 1.0);
  vec3  H1 = normalize(L1 + V);
  vec3  H2 = normalize(L2 + V);
  float diff  = max(dot(N, L1), 0.0) * 0.7 + max(dot(N, L2), 0.0) * 0.3;
  float spec1 = pow(max(dot(N, H1), 0.0), 220.0);  /* tight hot spot */
  float spec2 = pow(max(dot(N, H1), 0.0),  40.0);  /* wide soft bloom */
  float spec  = spec1 * 1.1 + spec2 * 0.18;

  float cosTheta = max(dot(N, V), 0.0);
  float fresnel  = 0.05 + 0.95 * pow(1.0 - cosTheta, 3.5); /* stronger rim */
  float rim      = smoothstep(thr + 0.5, thr, field) * edge;

  /* Chromatic aberration — slightly wider for more iridescence */
  float caStr = 0.003 * edge;
  vec3  bgCA;
  bgCA.r = texture2D(uBg, refractedUV + vec2( caStr,  caStr * 0.6)).r;
  bgCA.g = texture2D(uBg, refractedUV).g;
  bgCA.b = texture2D(uBg, refractedUV - vec2( caStr,  caStr * 0.6)).b;

  float depth = smoothstep(thr, thr + 3.0, field);
  vec3  tint  = mix(vec3(1.0), vec3(0.88, 0.95, 1.02), depth * 0.5);

  float shadowField = smoothstep(thr - 0.35, thr - 0.05, field);
  float shadowAlpha = shadowField * 0.18 * (1.0 - edge);

  float borderOuter = smoothstep(thr - 0.12, thr - 0.01, field);
  float borderInner = smoothstep(thr + 0.0,  thr + 0.07,  field);
  float border      = borderOuter * (1.0 - borderInner) * 0.55; /* brighter border */

  /* Glass body: iridescent tint + refraction + lighting */
  vec3 glassCol = bgCA * tint * 0.30             /* refracted bg tint */
                + vec3(0.82, 0.92, 1.0) * fresnel * 0.55  /* icy blue rim glow */
                + vec3(1.0)             * spec    * 1.10  /* hot specular */
                + vec3(0.9, 0.95, 1.0) * rim     * 0.40  /* rim light */
                + tint                 * diff    * 0.14;  /* diffuse fill */

  /* Iridescent rainbow micro-tint based on normal angle */
  float iriAngle = atan(N.y, N.x) * 0.5 + 0.5;
  vec3  iri = vec3(
    0.5 + 0.5 * sin(iriAngle * 6.28 + 0.0),
    0.5 + 0.5 * sin(iriAngle * 6.28 + 2.09),
    0.5 + 0.5 * sin(iriAngle * 6.28 + 4.19)
  );
  glassCol += iri * edge * 0.06; /* very subtle, just a hint */

  float glassAlpha = edge * 0.58 + border;

  gl_FragColor = vec4(glassCol, clamp(glassAlpha + shadowAlpha, 0.0, 1.0));
}
`;

/* ── Physics constants ── */
const DAMP         = 0.993;
const MOUSE_R      = 0.26;
const MOUSE_F      = 0.009;
const TENSION_R    = 0.12;
const TENSION_F    = 0.0004;
const MERGE_RATIO  = 0.62;
const SPLIT_SPEED  = 0.013;
const SPLIT_MIN_R  = 0.04;
const MAX_SPEED    = 0.015;
const BOUNCE       = 0.4;
const WANDER_F     = 0.00004;
const CENTER_PULL  = 0.000008;
const SOFT_K       = 0.22;
const SOFT_D       = 0.6;

export default function LiquidGlass() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let THREE;
    let renderer, scene, camera, mat;
    let dropletBuf, dropletTex;
    let drops = [], uid = 0;
    let aspect = wrap.clientWidth / (wrap.clientHeight || 1);
    let animId, last = performance.now(), acc = 0;
    let autoTimer = 0, spawnCd = 0;
    let destroyed = false;
    const mouse = { x: 999, y: 999, active: false, down: false };
    let grabbed = null; // { drop, targetX, targetY, velHistory[] }

    /* ── Spawn helper ── */
    function spawn(x, y, r) {
      if (drops.length >= MAX_DROPLETS) return;
      const area = Math.PI * r * r;
      const ang  = Math.random() * Math.PI * 2;
      const spd  = 0.0003 + Math.random() * 0.0008;
      drops.push({
        id: uid++, x, y, r, area,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.5,
        softPrevX: x, softPrevY: y,
        softOffX: 0, softOffY: 0,
        softVelX: 0, softVelY: 0,
      });
    }

    /* ── Physics ── */
    function applyForces() {
      // Inertie de suivi pour la bulle grippée
      if (grabbed) {
        const d = grabbed.drop;
        const stiffness = 0.52; // ressort vers le curseur
        const damp      = 0.50; // amortissement (fluidité)
        const ex = grabbed.targetX - d.x;
        const ey = grabbed.targetY - d.y;
        d.vx = d.vx * damp + ex * stiffness;
        d.vy = d.vy * damp + ey * stiffness;
        // Enregistre la vélocité réelle pour le lancer
        grabbed.velHistory.push({ vx: d.vx, vy: d.vy });
        if (grabbed.velHistory.length > 6) grabbed.velHistory.shift();
      }
      for (const d of drops) {
        if (d.grabbed) continue; // la physique normale est suspendue
        d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
        d.vx += Math.cos(d.wanderAngle) * WANDER_F - d.x * CENTER_PULL;
        d.vy += Math.sin(d.wanderAngle) * WANDER_F - d.y * CENTER_PULL;
        if (mouse.active) {
          const dx = d.x - mouse.x, dy = d.y - mouse.y;
          const dSq = dx * dx + dy * dy, rr = MOUSE_R + d.r;
          if (dSq < rr * rr && dSq > 1e-5) {
            const dist = Math.sqrt(dSq), s = 1 - dist / rr;
            const f = s * s * MOUSE_F / dist;
            d.vx += dx * f; d.vy += dy * f;
          }
        }
      }
      for (let i = 0; i < drops.length; i++) {
        for (let j = i + 1; j < drops.length; j++) {
          const a = drops[i], b = drops[j];
          const dx = b.x - a.x, dy = b.y - a.y, dSq = dx * dx + dy * dy;
          const rng = TENSION_R + a.r + b.r;
          if (dSq < rng * rng && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const f = (1 - dist / rng) * TENSION_F / dist;
            const fx = dx * f, fy = dy * f;
            a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
          }
        }
      }
    }

    function integrate() {
      for (const d of drops) {
        if (d.grabbed) {
          // Position mise à jour par applyForces via vx/vy
          d.x += d.vx; d.y += d.vy;
          continue;
        }
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp > MAX_SPEED) { const s = MAX_SPEED / sp; d.vx *= s; d.vy *= s; }
        d.x += d.vx; d.y += d.vy; d.vx *= DAMP; d.vy *= DAMP;
        const wx = aspect * 0.5, wy = 0.5;
        if (d.x - d.r < -wx) { d.x = -wx + d.r; d.vx =  Math.abs(d.vx) * BOUNCE; }
        if (d.x + d.r >  wx) { d.x =  wx - d.r; d.vx = -Math.abs(d.vx) * BOUNCE; }
        if (d.y - d.r < -wy) { d.y = -wy + d.r; d.vy =  Math.abs(d.vy) * BOUNCE; }
        if (d.y + d.r >  wy) { d.y =  wy - d.r; d.vy = -Math.abs(d.vy) * BOUNCE; }
      }
    }

    function mergeDroplets() {
      for (let i = 0; i < drops.length; i++) {
        if (!drops[i].alive) continue;
        for (let j = i + 1; j < drops.length; j++) {
          if (!drops[j].alive) continue;
          const a = drops[i], b = drops[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          if (Math.sqrt(dx * dx + dy * dy) < (a.r + b.r) * MERGE_RATIO) {
            const na = a.area + b.area;
            a.x  = (a.x * a.area  + b.x * b.area)  / na;
            a.y  = (a.y * a.area  + b.y * b.area)  / na;
            a.vx = (a.vx * a.area + b.vx * b.area) / na;
            a.vy = (a.vy * a.area + b.vy * b.area) / na;
            a.r = Math.sqrt(na / Math.PI); a.area = na; b.alive = false;
          }
        }
      }
      drops = drops.filter(d => d.alive);
    }

    function splitDroplets() {
      const add = [];
      for (const d of drops) {
        if (d.r < SPLIT_MIN_R) continue;
        const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (sp < SPLIT_SPEED) continue;
        const ha = d.area * 0.5, nr = Math.sqrt(ha / Math.PI);
        const nx = -d.vy / sp, ny = d.vx / sp, off = nr * 0.7;
        d.r = nr; d.area = ha; d.x -= nx * off; d.y -= ny * off;
        add.push({
          id: uid++, x: d.x + nx * off * 2, y: d.y + ny * off * 2, r: nr, area: ha,
          vx: d.vx + nx * sp * 0.35, vy: d.vy + ny * sp * 0.35, alive: true,
          wanderAngle: Math.random() * Math.PI * 2, wanderSpeed: 0.3 + Math.random() * 0.5,
          softPrevX: d.x + nx * off * 2, softPrevY: d.y + ny * off * 2,
          softOffX: 0, softOffY: 0, softVelX: 0, softVelY: 0,
        });
      }
      for (const a of add) if (drops.length < MAX_DROPLETS) drops.push(a);
    }

    function updateSoft() {
      for (const d of drops) {
        if (d.grabbed) { d.softPrevX = d.x; d.softPrevY = d.y; d.softOffX = 0; d.softOffY = 0; continue; }
        const dx = d.x - d.softPrevX, dy = d.y - d.softPrevY;
        d.softVelX = (d.softVelX + (dx - d.softOffX) * SOFT_K) * SOFT_D;
        d.softVelY = (d.softVelY + (dy - d.softOffY) * SOFT_K) * SOFT_D;
        d.softOffX += d.softVelX; d.softOffY += d.softVelY;
        d.softPrevX = d.x; d.softPrevY = d.y;
      }
    }

    function fixedUpdate() {
      applyForces(); integrate(); mergeDroplets(); splitDroplets(); updateSoft();
      // Auto-spawn
      autoTimer += FIXED_DT_MS;
      if (autoTimer > 2500 && drops.length < 10) {
        autoTimer = 0;
        spawn((Math.random() - 0.5) * aspect * 0.6, (Math.random() - 0.5) * 0.6, 0.025 + Math.random() * 0.03);
      }
      // Mouse click spawn (seulement si aucune bulle n'est grippée)
      if (mouse.down && mouse.active && !grabbed) {
        spawnCd -= FIXED_DT_MS;
        if (spawnCd <= 0 && drops.length < MAX_DROPLETS) {
          spawnCd = 130;
          spawn(mouse.x + (Math.random() - 0.5) * 0.02, mouse.y + (Math.random() - 0.5) * 0.02, 0.02 + Math.random() * 0.015);
        }
      }
    }

    function syncTexture() {
      dropletBuf.fill(0);
      const n = Math.min(drops.length, MAX_DROPLETS);
      for (let i = 0; i < n; i++) {
        const d = drops[i];
        dropletBuf[i * 4]     = d.x;
        dropletBuf[i * 4 + 1] = d.y;
        dropletBuf[i * 4 + 2] = d.r;
        dropletBuf[i * 4 + 3] = 1;
        // Ghost trailing blob (teardrop tail)
        const gi = (n + i) * 4;
        dropletBuf[gi]     = d.x - d.softOffX * 3.5;
        dropletBuf[gi + 1] = d.y - d.softOffY * 3.5;
        dropletBuf[gi + 2] = d.r * 0.7;
        dropletBuf[gi + 3] = 1;
      }
      dropletTex.needsUpdate = true;
      mat.uniforms.uCount.value = n * 2;
    }

    /* ── Background texture ── */
    function buildBgTexture(T, w, h) {
      const bc  = document.createElement('canvas');
      bc.width  = w; bc.height = h;
      const bx  = bc.getContext('2d');
      // Dark spatial gradient matching the site theme
      const grd = bx.createLinearGradient(0, 0, w * 0.7, h);
      grd.addColorStop(0,    '#08081a');
      grd.addColorStop(0.35, '#0a1228');
      grd.addColorStop(0.7,  '#050818');
      grd.addColorStop(1,    '#020208');
      bx.fillStyle = grd;
      bx.fillRect(0, 0, w, h);
      // Subtle gold radial shimmer
      bx.globalAlpha = 0.07;
      const rg = bx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.55);
      rg.addColorStop(0, '#d4af37');
      rg.addColorStop(1, 'transparent');
      bx.fillStyle = rg;
      bx.fillRect(0, 0, w, h);
      bx.globalAlpha = 1;

      const tex = new T.CanvasTexture(bc);
      tex.minFilter = T.LinearFilter;
      tex.magFilter = T.LinearFilter;
      return tex;
    }

    /* ── Init Three.js (lazy import to avoid SSR issues) ── */
    import('three').then(T => {
      if (destroyed) return;
      THREE = T;

      const w = wrap.clientWidth  || window.innerWidth;
      const h = wrap.clientHeight || window.innerHeight;
      aspect  = w / h;

      // Renderer — transparent, half pixel ratio on mobile for perf
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      renderer = new T.WebGLRenderer({ antialias: false, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0); // fully transparent clear
      Object.assign(renderer.domElement.style, {
        position: 'absolute', inset: '0',
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '15',
      });
      wrap.appendChild(renderer.domElement);

      scene  = new T.Scene();
      camera = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Droplet data texture (Float, nearest)
      dropletBuf = new Float32Array(MAX_ENTRIES * 4);
      dropletTex = new T.DataTexture(dropletBuf, MAX_ENTRIES, 1, T.RGBAFormat, T.FloatType);
      dropletTex.minFilter = dropletTex.magFilter = T.NearestFilter;

      const bgTex = buildBgTexture(T, w, h);

      mat = new T.ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent:    true,
        depthWrite:     false,
        uniforms: {
          uRes:   { value: new T.Vector2(renderer.domElement.width, renderer.domElement.height) },
          uData:  { value: dropletTex },
          uBg:    { value: bgTex },
          uCount: { value: 0 },
        },
      });
      scene.add(new T.Mesh(new T.PlaneGeometry(2, 2), mat));

      // Seed initial droplets
      for (let i = 0; i < 10; i++) {
        spawn(
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.5,
          0.03 + Math.random() * 0.045,
        );
      }

      /* ── Events (on the parent container, canvas is pointer-events:none) ── */
      const parent = wrap.parentElement || wrap;

      const toWorld = (e) => {
        const rect = wrap.getBoundingClientRect();
        return {
          x: ((e.clientX - rect.left) / rect.width  - 0.5) * aspect,
          y:  0.5 - (e.clientY - rect.top) / rect.height,
        };
      };

      const onMove = (e) => {
        const w = toWorld(e);
        mouse.x = w.x; mouse.y = w.y; mouse.active = true;
        if (grabbed) {
          grabbed.targetX = w.x;
          grabbed.targetY = w.y;
        }
      };

      const onDown = (e) => {
        mouse.down = true;
        const w = toWorld(e);
        // Cherche la bulle la plus proche sous le curseur
        let closest = null, bestD = Infinity;
        for (const d of drops) {
          const dx = d.x - w.x, dy = d.y - w.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < d.r * 1.4 && dist < bestD) { bestD = dist; closest = d; }
        }
        if (closest) {
          closest.grabbed = true;
          grabbed = { drop: closest, targetX: w.x, targetY: w.y, velHistory: [] };
        }
      };

      const onUp = () => {
        mouse.down = false;
        if (grabbed) {
          const d = grabbed.drop;
          d.grabbed = false;
          // Calcule la vélocité de lancer sur les dernières entrées
          const h = grabbed.velHistory;
          if (h.length > 0) {
            let avx = 0, avy = 0;
            for (const v of h) { avx += v.vx; avy += v.vy; }
            avx /= h.length; avy /= h.length;
            // Amplification + plafond pour garantir le split
            const mul = 2.8;
            d.vx = avx * mul;
            d.vy = avy * mul;
            const sp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
            const minSp = SPLIT_SPEED * 1.5;
            if (sp > 0.0001 && sp < minSp) {
              const ratio = minSp / sp;
              d.vx *= ratio; d.vy *= ratio;
            }
          } else {
            // Clic sans mouvement : petite impulsion aléatoire
            const ang = Math.random() * Math.PI * 2;
            d.vx = Math.cos(ang) * SPLIT_SPEED * 1.5;
            d.vy = Math.sin(ang) * SPLIT_SPEED * 1.5;
          }
          grabbed = null;
        }
      };

      const onLeave = () => { mouse.active = false; mouse.down = false; if (grabbed) { grabbed.drop.grabbed = false; grabbed = null; } };
      parent.addEventListener('pointermove',  onMove,  { passive: true });
      parent.addEventListener('pointerdown',  onDown,  { passive: true });
      parent.addEventListener('pointerup',    onUp,    { passive: true });
      parent.addEventListener('pointerleave', onLeave, { passive: true });

      const onResize = () => {
        if (!wrap || destroyed) return;
        const nw = wrap.clientWidth, nh = wrap.clientHeight;
        aspect = nw / nh;
        renderer.setSize(nw, nh);
        mat.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
      };
      window.addEventListener('resize', onResize, { passive: true });

      /* ── Render loop ── */
      let paused = false;
      const onVis = () => { paused = document.hidden; if (!paused) last = performance.now(); };
      document.addEventListener('visibilitychange', onVis);

      function loop() {
        if (destroyed) return;
        animId = requestAnimationFrame(loop);
        if (paused) return;

        const now = performance.now();
        const dt  = Math.min(now - last, MAX_FRAME_DT);
        last = now; acc += dt;

        let g = 0;
        while (acc >= FIXED_DT_MS && g < MAX_CATCHUP) {
          fixedUpdate(); acc -= FIXED_DT_MS; g++;
        }
        if (g >= MAX_CATCHUP) acc = 0;

        syncTexture();
        renderer.render(scene, camera);
      }
      loop();

      /* Store cleanup */
      wrap._liquidCleanup = () => {
        destroyed = true;
        cancelAnimationFrame(animId);
        parent.removeEventListener('pointermove',  onMove);
        parent.removeEventListener('pointerdown',  onDown);
        parent.removeEventListener('pointerup',    onUp);
        parent.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('resize',       onResize);
        document.removeEventListener('visibilitychange', onVis);
        mat?.dispose();
        dropletTex?.dispose();
        bgTex?.dispose();
        renderer?.dispose();
        renderer?.domElement?.remove();
      };
    });

    return () => {
      destroyed = true;
      if (wrapRef.current?._liquidCleanup) wrapRef.current._liquidCleanup();
    };
  }, []);

  return <div ref={wrapRef} className="absolute inset-0" style={{ zIndex: 15, pointerEvents: 'none' }} />;
}
