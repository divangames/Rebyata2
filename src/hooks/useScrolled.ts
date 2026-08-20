////////////////////////////////////////////////////////
//
// Следит за прокруткой, чтобы шапка сменила режим.
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

/** Возвращает текущую вертикальную прокрутку окна или контейнера. */
function readScrollY(): number {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/** Возвращает true, когда страница уехала с самого верха. */
export function useScrolled(offset = 28): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /** Обновляет флаг без лишних ререндеров. */
    function update() {
      const next = readScrollY() > offset;
      setScrolled((prev) => (prev === next ? prev : next));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return scrolled;
}
