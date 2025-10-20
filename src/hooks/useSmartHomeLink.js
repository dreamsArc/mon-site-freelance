'use client';
import { usePathname } from 'next/navigation';

export function useSmartHomeLink() {
  const pathname = usePathname();
  
  // Si on est sur une sous-page, on ajoute skipIntro=true pour éviter l'IntroScreen
  const isOnSubPage = pathname === '/produits' || pathname === '/contact';
  return isOnSubPage ? '/?skipIntro=true' : '/';
}