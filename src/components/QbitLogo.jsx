'use client';
import { useEffect, useRef } from 'react';

export default function QbitLogo({ size = 'normal' }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const containerSize = size === 'small' ? 120 : 200;
    
    canvas.width = containerSize;
    canvas.height = containerSize;
    
    const cubeSize = size === 'small' ? 15 : 25;
    let rotation = 0;
    let glitchActive = false;
    let glitchTimer = 0;

    class Vertex {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      project() {
        const scale = 200 / (200 + this.z);
        return {
          x: this.x * scale + containerSize / 2,
          y: this.y * scale + containerSize / 2 + 35, // Descendre le cube encore plus
          scale: scale
        };
      }
    }

    const vertices = [
      new Vertex(-cubeSize, -cubeSize, -cubeSize),
      new Vertex(cubeSize, -cubeSize, -cubeSize),
      new Vertex(cubeSize, cubeSize, -cubeSize),
      new Vertex(-cubeSize, cubeSize, -cubeSize),
      new Vertex(-cubeSize, -cubeSize, cubeSize),
      new Vertex(cubeSize, -cubeSize, cubeSize),
      new Vertex(cubeSize, cubeSize, cubeSize),
      new Vertex(-cubeSize, cubeSize, cubeSize)
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    function rotateY(vertex, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return new Vertex(
        vertex.x * cos - vertex.z * sin,
        vertex.y,
        vertex.x * sin + vertex.z * cos
      );
    }

    function rotateX(vertex, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return new Vertex(
        vertex.x,
        vertex.y * cos - vertex.z * sin,
        vertex.y * sin + vertex.z * cos
      );
    }

    function drawSmoothDrop(centerX, centerY, scale) {
      const alpha = 1.0; // Augmenté de 0.9 à 1.0 pour plus d'éclat
      const dropSize = (size === 'small' ? 8 : 12) * scale; // Taille réduite
      
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Retourner la goutte (inverser verticalement)
      ctx.scale(1, -1);
      
      ctx.beginPath();
      ctx.moveTo(0, -dropSize);
      
      ctx.bezierCurveTo(
        dropSize * 0.3, -dropSize,
        dropSize * 0.45, -dropSize * 0.6,
        dropSize * 0.45, -dropSize * 0.1
      );
      
      ctx.bezierCurveTo(
        dropSize * 0.45, dropSize * 0.35,
        dropSize * 0.2, dropSize * 0.75,
        0, dropSize
      );
      
      ctx.bezierCurveTo(
        -dropSize * 0.2, dropSize * 0.75,
        -dropSize * 0.45, dropSize * 0.35,
        -dropSize * 0.45, -dropSize * 0.1
      );
      
      ctx.bezierCurveTo(
        -dropSize * 0.45, -dropSize * 0.6,
        -dropSize * 0.3, -dropSize,
        0, -dropSize
      );
      
      ctx.closePath();
      
      // Gradient néon amélioré - même style que le texte Digital Qbit Pixel
      const gradient = ctx.createLinearGradient(0, -dropSize, 0, dropSize);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`); // Blanc pur pour l'éclat
      gradient.addColorStop(0.15, `rgba(255, 244, 204, ${alpha})`); // Très lumineux
      gradient.addColorStop(0.35, `rgba(255, 224, 102, ${alpha})`); // Doré vif
      gradient.addColorStop(0.60, `rgba(212, 175, 55, ${alpha})`); // Doré principal
      gradient.addColorStop(0.85, `rgba(184, 148, 31, ${alpha})`); // Plus foncé
      gradient.addColorStop(1, `rgba(139, 105, 20, ${alpha})`); // Base sombre
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Effet de lueur néon plus subtil - style du texte amélioré
      ctx.shadowBlur = size === 'small' ? 8 : 12; // Réduit pour plus de netteté
      ctx.shadowColor = 'rgba(255, 215, 0, 0.6)'; // Moins intense, plus raffiné
      ctx.fill();
      
      // Pas de reflet interne pour correspondre à la demande
      
      // Contour doré net pour plus de définition - style néon
      ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.9})`; // Contour plus visible
      ctx.lineWidth = 1.2; // Légèrement plus fin pour plus de netteté
      ctx.stroke();
      
      ctx.restore();
    }

    function drawCube(rotatedVertices) {
      const alpha = 0.4;
      
      edges.forEach((edge, index) => {
        const v1 = rotatedVertices[edge[0]].project();
        const v2 = rotatedVertices[edge[1]].project();
        
        let offset = 0;
        if (glitchActive) {
          offset = (Math.random() - 0.5) * 8;
        }

        const gradient = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
        const goldIntensity = Math.sin(Date.now() / 1000 + index) * 0.2 + 0.8;
        
        gradient.addColorStop(0, `rgba(212, 175, 55, ${alpha * goldIntensity})`);
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${alpha})`);
        gradient.addColorStop(1, `rgba(212, 175, 55, ${alpha * goldIntensity})`);

        ctx.beginPath();
        ctx.moveTo(v1.x + offset, v1.y);
        ctx.lineTo(v2.x + offset, v2.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = size === 'small' ? 1.5 : 2;
        ctx.shadowBlur = size === 'small' ? 8 : 12;
        ctx.shadowColor = `rgba(212, 175, 55, ${alpha * 0.4})`;
        ctx.stroke();
      });
    }

    function animate() {
      ctx.clearRect(0, 0, containerSize, containerSize);

      rotation += 0.004; // Animation plus douce (réduit de 0.008 à 0.004)
      glitchTimer++;

      if (glitchTimer > 250 && glitchTimer < 258) {
        glitchActive = true;
      } else {
        glitchActive = false;
      }

      if (glitchTimer > 300) {
        glitchTimer = 0;
      }

      const rotatedVertices = vertices.map(v => {
        let rotated = rotateY(v, rotation);
        rotated = rotateX(rotated, Math.PI / 6);
        return rotated;
      });

      drawCube(rotatedVertices);

      const center = new Vertex(0, 0, 0);
      let rotatedCenter = rotateY(center, rotation);
      rotatedCenter = rotateX(rotatedCenter, Math.PI / 6);
      const projectedCenter = rotatedCenter.project();
      drawSmoothDrop(projectedCenter.x, projectedCenter.y, projectedCenter.scale);

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size]);

  return (
    <div className="qbit-logo-container">
      <canvas 
        ref={canvasRef}
        className="qbit-logo-canvas"
        style={{
          filter: 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))'
        }}
      />
    </div>
  );
}