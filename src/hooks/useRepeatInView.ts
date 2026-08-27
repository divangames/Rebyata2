////////////////////////////////////////////////////////
//
// Повторно сообщает, когда блок входит в кадр и когда уходит.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState, type RefObject } from "react";

/** True, пока элемент достаточно виден; сбрасывается при уходе с экрана. */
export function useRepeatInView<T extends HTMLElement>(threshold = 0.28): {
  ref: RefObject<T | null>;
  visible: boolean;
} {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setVisible(true);
          return;
        }
        if (!entry.isIntersecting || entry.intersectionRatio < 0.08) {
          setVisible(false);
        }
      },
      { threshold: [0, 0.08, threshold, 0.6] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
