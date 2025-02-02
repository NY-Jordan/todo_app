import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState<{width : number|undefined, height : number|undefined}>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Vérifie que le code est exécuté côté client (navigateur)
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      // Initialiser la taille au premier rendu
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);


  return size;

}
