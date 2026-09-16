////////////////////////////////////////////////////////
//
// Миниатюра работы: спокойное сравнение «до / после» с ручным ползунком.
//
////////////////////////////////////////////////////////

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

type Props = {
  image?: string;
  before?: string;
  after?: string;
  title: string;
  animated?: boolean;
  onOpen: () => void;
};

/** Кадр превью: чистый слой снизу, «до» сверху по clip-path. */
export function WorkPreview({ image, before, after, title, animated = false, onOpen }: Props) {
  const shotRef = useRef<HTMLSpanElement>(null);
  const dragRef = useRef({ startX: 0, moved: false, active: false });
  const [position, setPosition] = useState(48);
  const [manual, setManual] = useState(false);

  function positionFromPointer(clientX: number) {
    const shot = shotRef.current;
    if (!shot) return;
    const box = shot.getBoundingClientRect();
    if (box.width <= 0) return;
    setPosition(Math.min(92, Math.max(8, ((clientX - box.left) / box.width) * 100)));
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch") return;
    dragRef.current = { startX: event.clientX, moved: false, active: true };
    event.currentTarget.setPointerCapture(event.pointerId);
    setManual(true);
    positionFromPointer(event.clientX);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragRef.current.active || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    if (Math.abs(event.clientX - dragRef.current.startX) > 3) dragRef.current.moved = true;
    positionFromPointer(event.clientX);
  }

  function onPointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current.active = false;
  }

  function activate() {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    onOpen();
  }

  if (image) {
    return (
      <span className="works__shot works__shot--single">
        <img className="works__img" src={image} alt="" loading="lazy" decoding="async" />
        <button type="button" className="works__open" onClick={onOpen} aria-haspopup="dialog">
          <span className="works__sr">Открыть пример: {title}</span>
        </button>
      </span>
    );
  }

  return (
    <span
      ref={shotRef}
      className={`works__shot${animated ? " is-animated" : ""}${manual ? " is-manual" : ""}`}
      style={{ "--works-compare": `${position}%` } as CSSProperties}
    >
      <img className="works__img works__img--after" src={after ?? before ?? ""} alt="" loading="lazy" decoding="async" />
      <img className="works__img works__img--before" src={before ?? after ?? ""} alt="" loading="lazy" decoding="async" />
      <span className="works__rule" aria-hidden="true">
        <span className="works__line" />
        <span className="works__knob">
          <svg viewBox="0 0 32 32" width="32" height="32" focusable="false">
            <path d="M13 7 6 16l7 9" />
            <path d="M19 7l7 9-7 9" />
          </svg>
        </span>
      </span>
      <span className="works__hint">до / после</span>
      <button
        type="button"
        className="works__open"
        aria-haspopup="dialog"
        aria-label={`Сравнить до и после: ${title}. Перетащите по горизонтали или откройте пример`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={activate}
      />
    </span>
  );
}
