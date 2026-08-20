////////////////////////////////////////////////////////
//
// Держит оверлей в DOM, пока доигрывает анимация выхода.
//
////////////////////////////////////////////////////////

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Возвращает флаги монтирования и видимости для CSS-перехода. */
export function usePresence(open: boolean) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }

    setShown(false);
    if (reduced) {
      setMounted(false);
    }
  }, [open, reduced]);

  useLayoutEffect(() => {
    if (!open || !mounted) {
      return;
    }

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setShown(true);
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open, mounted]);

  /** Снимает узел только после CSS-перехода закрытия. */
  const onExitComplete = useCallback(() => {
    if (!open) {
      setMounted(false);
    }
  }, [open]);

  return { mounted, shown, reduced, onExitComplete };
}
