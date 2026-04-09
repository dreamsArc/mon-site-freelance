/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Anti-clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Anti-MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Politique de referrer
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Désactiver accès caméra / micro / géolocalisation
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Forcer HTTPS pendant 2 ans (activer uniquement en production avec HTTPS)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // CSP : autorise Crisp + ressources locales
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' client.crisp.chat",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com client.crisp.chat *.crisp.chat",
              "font-src 'self' fonts.gstatic.com client.crisp.chat *.crisp.chat data:",
              "img-src 'self' data: blob: *.crisp.chat",
              "connect-src 'self' wss://client.crisp.chat *.crisp.chat",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
