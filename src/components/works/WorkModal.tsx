////////////////////////////////////////////////////////
//
// Модалка работы: сравнение, миниатюры, описание и действия.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import { cta } from "../../config/content";
import type { WorkExample } from "../../types";
import { Button } from "../button/Button";
import { CloseIcon } from "../icons/Icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import "./WorkModal.css";

type Props = {
  item: WorkExample | null;
  onClose: () => void;
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Диалог с кадрами выбранной работы и шаблоном описания. */
export function WorkModal({ item, onClose, onEvaluate, onCourier }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const open = item !== null;
  const slide = item?.slides[slideIndex] ?? item?.slides[0];

  useEffect(() => {
    setSlideIndex(0);
  }, [item?.id]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, item?.id]);

  useEffect(() => {
    if (!open) {
      return;
    }

    /** Закрывает окно по Escape, не перехватывая остальные клавиши. */
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /** Закрывает сравнение и открывает шторку оценки по фото. */
  function onAskEstimate() {
    onClose();
    onEvaluate();
  }

  /** Закрывает сравнение и открывает заявку на курьера. */
  function onAskCourier() {
    onClose();
    onCourier();
  }

  return (
    <div className={`work-modal${open ? " is-open" : ""}`} hidden={!open}>
      <button type="button" className="work-modal__scrim" aria-label="Закрыть" onClick={onClose} />
      {item && slide ? (
        <div className="work-modal__panel" role="dialog" aria-modal="true" aria-labelledby="work-modal-title">
          <button
            ref={closeRef}
            type="button"
            className="work-modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <CloseIcon />
          </button>
          <h2 id="work-modal-title">{item.title}</h2>
          <BeforeAfterSlider key={slide.id} before={slide.before} after={slide.after} title={item.title} />
          <ul className="work-modal__thumbs" aria-label="Другие кадры">
            {item.slides.map((entry, index) => (
              <li key={entry.id}>
                <button
                  type="button"
                  className={index === slideIndex ? "is-on" : ""}
                  aria-current={index === slideIndex ? "true" : undefined}
                  aria-label={`Кадр ${index + 1}`}
                  onClick={() => setSlideIndex(index)}
                >
                  <img src={entry.after} alt="" />
                </button>
              </li>
            ))}
          </ul>
          <div className="work-modal__story">
            <h3>{item.service}</h3>
            <p>{item.description}</p>
          </div>
          <div className="work-modal__actions">
            <Button onClick={onAskEstimate}>{cta.estimate}</Button>
            <Button variant="secondary" onClick={onAskCourier}>
              {cta.courier}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
