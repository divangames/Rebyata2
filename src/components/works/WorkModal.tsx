////////////////////////////////////////////////////////
//
// Модалка работы: слайдер «до / после» и переход к оценке.
//
////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";
import type { WorkExample } from "../../types";
import { Button } from "../button/Button";
import { CloseIcon } from "../icons/Icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import "./WorkModal.css";

type Props = {
  item: WorkExample | null;
  onClose: () => void;
  onEvaluate: () => void;
};

/** Диалог с сравнением кадров выбранной работы. */
export function WorkModal({ item, onClose, onEvaluate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = item !== null;

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

  return (
    <div className={`work-modal${open ? " is-open" : ""}`} hidden={!open}>
      <button type="button" className="work-modal__scrim" aria-label="Закрыть" onClick={onClose} />
      {item ? (
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
          <p className="work-modal__eyebrow">До и после</p>
          <h2 id="work-modal-title">{item.title}</h2>
          <BeforeAfterSlider key={item.id} before={item.before} after={item.after} title={item.title} />
          <Button onClick={onAskEstimate}>Оценить по фото</Button>
        </div>
      ) : null}
    </div>
  );
}
