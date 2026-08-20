////////////////////////////////////////////////////////
//
// Подключает тяжёлые блоки, когда они попадают в зону видимости.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState, type RefObject } from "react";

/** True после первого пересечения с viewport. */
export function useInView<T extends HTMLElement>(rootMargin = "160px"): {
  ref: RefObject<T | null>;
  visible: boolean;
} {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return { ref, visible };
}
