import "./globals.css";
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
  <html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Optimisations DNS */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Pixel Création Studio — Développement Web & IA",
  description: "Agence web freelance spécialisée en création de sites web, e-commerce, applications web, SEO et intelligence artificielle. Sites rapides, modernes et sécurisés.",
  keywords: ["développement web", "site web", "e-commerce", "SEO", "intelligence artificielle", "Next.js", "freelance"],
  authors: [{ name: "Pixel Création Studio" }],
  creator: "Pixel Création Studio",
  metadataBase: new URL("https://pixelcreationstudio.com"),
  openGraph: {
    title: "Pixel Création Studio — Développement Web & IA",
    description: "Sites performants, sécurisés et optimisés SEO pour entreprises, particuliers et professionnels.",
    siteName: "Pixel Création Studio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Création Studio — Développement Web & IA",
    description: "Sites performants, sécurisés et optimisés SEO pour entreprises, particuliers et professionnels.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


