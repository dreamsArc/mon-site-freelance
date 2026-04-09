'use client';

import { useEffect } from 'react';


export default function Providers({ children }) {
  useEffect(() => {
    // Crisp Chatbot - Configuration propre
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    
    // Vérifier si le script n'est pas déjà chargé
    if (!document.querySelector('script[src*="client.crisp.chat"]')) {
      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return children;
}
