////////////////////////////////////////////////////////
//
// Блокирует прокрутку документа, пока открыт оверлей.
//
////////////////////////////////////////////////////////

import { useEffect } from "react";

let lockCount = 0;

/** Держит счётчик шторок: страница снова скроллится, когда закрыта последняя. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      return;
    }

    lockCount += 1;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      lockCount -= 1;
      if (lockCount > 0) {
        return;
      }
      lockCount = 0;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [locked]);
}
