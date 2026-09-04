////////////////////////////////////////////////////////
//
// Горизонтальный ряд работ: две карточки в кадре, третья выглядывает.
//
////////////////////////////////////////////////////////

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { useInfiniteStrip } from "../../hooks/useInfiniteStrip";
import type { WorkExample } from "../../types";
import { WorkPreview } from "./WorkPreview";

type Props = {
  items: WorkExample[];
  paused: boolean;
  hint?: boolean;
  label: string;
  onOpen: (item: WorkExample) => void;
};

const COPIES = 3;

/** Собирает три копии ряда для бесшовного круга. */
function loopItems(items: WorkExample[]): WorkExample[] {
  return Array.from({ length: COPIES }, () => items).flat();
}

/** Лента без стрелок и точек: свайп и клик по карточке. */
export function WorkCarousel({ items, paused, hint = false, label, onOpen }: Props) {
  const { ref } = useInfiniteStrip(items.length);
  const drag = useRef({ x: 0, moved: false });
  const looped = loopItems(items);

  /** Запоминает старт жеста, чтобы отличить свайп от открытия. */
  function onPointerDown(event: PointerEvent<HTMLUListElement>) {
    drag.current = { x: event.clientX, moved: false };
  }

  /** Если палец уехал — это прокрутка, не клик. */
  function onPointerMove(event: PointerEvent<HTMLUListElement>) {
    if (Math.abs(event.clientX - drag.current.x) > 8) {
      drag.current.moved = true;
    }
  }

  /** Открывает работу только если не было горизонтального жеста. */
  function onCardActivate(item: WorkExample) {
    if (drag.current.moved) {
      return;
    }
    onOpen(item);
  }

  function move(direction: -1 | 1) {
    const scroller = ref.current;
    const slide = scroller?.querySelector<HTMLElement>("[data-strip-slide]");
    if (!scroller || !slide) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap) || 0;
    scroller.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="works__rail">
      <button type="button" className="works__arrow works__arrow--prev" onClick={() => move(-1)} aria-label={`${label}: предыдущие примеры`}>
        <span aria-hidden="true">←</span>
      </button>
      <ul
        ref={ref}
        className={`works__scroller${paused ? " is-paused" : ""}${hint ? " is-hint" : ""}`}
        aria-label={`${label}: свайпните, чтобы увидеть другие примеры`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        {looped.map((item, index) => (
          <li
            key={`${index}-${item.id}`}
            className="works__slide"
            data-strip-slide=""
            style={{ "--works-delay": `${(index % items.length) * 0.35}s` } as CSSProperties}
          >
            <p className="works__name">{item.title}</p>
            <div className="works__card">
              <WorkPreview {...(item.preview ?? item.slides[0])} />
              <button
                type="button"
                className="works__open"
                onClick={() => onCardActivate(item)}
                aria-haspopup="dialog"
              >
                <span className="works__sr">Открыть сравнение: {item.title}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="works__arrow works__arrow--next" onClick={() => move(1)} aria-label={`${label}: следующие примеры`}>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
