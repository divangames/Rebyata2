////////////////////////////////////////////////////////
//
// Слайдер сравнения двух кадров: «до» слева, «после» справа.
//
////////////////////////////////////////////////////////

import { useCallback, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import "./BeforeAfterSlider.css";

type Props = {
  before: string;
  after: string;
  title: string;
};

/** Пересчитывает долю кадра по горизонтали указателя. */
function ratioFromClientX(track: HTMLElement, clientX: number): number {
  const box = track.getBoundingClientRect();
  if (box.width <= 0) {
    return 50;
  }
  return Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100));
}

/** Интерактивное сравнение «до / после» с перетаскиванием и клавиатурой. */
export function BeforeAfterSlider({ before, after, title }: Props) {
  const rangeId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);

  /** Ставит ползунок по координате указателя. */
  const moveTo = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    setPosition(ratioFromClientX(track, clientX));
  }, []);

  /** Захватывает указатель, чтобы жест не терялся за пределами кадра. */
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  /** Ведёт разделитель за пальцем или мышью. */
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    moveTo(event.clientX);
  }

  return (
    <div className="compare">
      <div
        ref={trackRef}
        className="compare__stage"
        style={{ "--compare": `${position}%` } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <img className="compare__img compare__img--after" src={after} alt={`${title} после`} draggable={false} />
        <img className="compare__img compare__img--before" src={before} alt="" draggable={false} />
        <div className="compare__rule" aria-hidden="true">
          <span className="compare__knob" />
        </div>
        <span className="compare__tag compare__tag--before">до</span>
        <span className="compare__tag compare__tag--after">после</span>
      </div>
      <label className="compare__sr" htmlFor={rangeId}>
        Сравнение до и после
      </label>
      <input
        id={rangeId}
        className="compare__range"
        type="range"
        min={0}
        max={100}
        value={Math.round(position)}
        aria-valuetext={`${Math.round(position)} процентов кадра «до»`}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}
