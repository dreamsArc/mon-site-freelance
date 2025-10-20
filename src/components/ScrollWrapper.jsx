import { useEffect, useRef } from "react";

export default function ScrollWrapper({ children }) {
  const containerRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Permettre le scroll vertical normal
      // Supprimer la transformation en scroll horizontal
      // Le scroll fonctionne naturellement
    };

    // Supprimer l'écouteur d'événement qui bloquait le scroll
    // el.addEventListener("wheel", onWheel, { passive: false });
    // return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>
  );
}
