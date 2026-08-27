////////////////////////////////////////////////////////
//
// Бесконечная горизонтальная лента: три копии и прыжок в середину.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, type RefObject } from "react";

type StripApi = {
  ref: RefObject<HTMLUListElement | null>;
};

/** Шаг одной карточки: ширина плюс gap ленты. */
function measureStride(scroller: HTMLElement): { stride: number; peek: number } {
  const slide = scroller.querySelector<HTMLElement>("[data-strip-slide]");
  const styles = getComputedStyle(scroller);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
  const peek = Number.parseFloat(styles.scrollPaddingInlineStart) || 0;
  const stride = (slide?.offsetWidth ?? 0) + gap;
  return { stride, peek };
}

/**
 * Крутит ленту по кругу: после крайних копий мгновенно возвращает в средний набор.
 * Стартовая позиция — первая карточка среднего набора, слева торчит хвост предыдущей.
 */
export function useInfiniteStrip(itemCount: number): StripApi {
  const ref = useRef<HTMLUListElement | null>(null);
  const jumping = useRef(false);
  const indexRef = useRef(itemCount);

  useEffect(() => {
    const scroller = ref.current;
    if (!scroller || itemCount < 1) {
      return;
    }

    indexRef.current = itemCount;
    const track = scroller;

    /** Ставит scrollLeft на индекс без анимации. */
    function jumpTo(index: number) {
      const { stride, peek } = measureStride(track);
      if (stride <= 0) {
        return;
      }
      jumping.current = true;
      track.scrollTo({ left: index * stride - peek, behavior: "auto" });
      indexRef.current = index;
      requestAnimationFrame(() => {
        jumping.current = false;
      });
    }

    /** Если уехали в крайнюю копию — переносим в ту же карточку среднего набора. */
    function normalize() {
      if (jumping.current) {
        return;
      }
      const { stride, peek } = measureStride(track);
      if (stride <= 0) {
        return;
      }
      const next = Math.round((track.scrollLeft + peek) / stride);
      if (next < itemCount) {
        jumpTo(next + itemCount);
        return;
      }
      if (next >= itemCount * 2) {
        jumpTo(next - itemCount);
        return;
      }
      indexRef.current = next;
    }

    let settle = 0;

    /** После паузы скролла нормализует копию — запасной путь без scrollend. */
    function onScroll() {
      if (jumping.current) {
        return;
      }
      window.clearTimeout(settle);
      settle = window.setTimeout(normalize, 90);
    }

    jumpTo(itemCount);
    const observer = new ResizeObserver(() => jumpTo(indexRef.current));
    observer.observe(scroller);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scrollend", normalize);

    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scrollend", normalize);
    };
  }, [itemCount]);

  return { ref };
}
