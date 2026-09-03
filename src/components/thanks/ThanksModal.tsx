////////////////////////////////////////////////////////
//
// Общее окно благодарности после заявки или оценки.
//
////////////////////////////////////////////////////////

import { thanksCopy } from "../../config/content";
import type { ThanksKind } from "../../types";
import { Button } from "../button/Button";
import { CloseIcon, SparkleIcon } from "../icons/Icons";
import { OverlayHost } from "../overlay/OverlayHost";
import "./ThanksModal.css";

type Props = {
  open: boolean;
  kind: ThanksKind;
  onClose: () => void;
};

/** Текст зависит от сценария: заявка или оценка по фото. */
function thanksText(kind: ThanksKind): string {
  switch (kind) {
    case "evaluate":
      return thanksCopy.evaluate;
    case "request":
      return thanksCopy.request;
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}

/** Компактная карточка: спасибо и срок ответа менеджера. */
export function ThanksModal({ open, kind, onClose }: Props) {
  return (
    <OverlayHost open={open}>
      <div className={`thanks${open ? " is-open" : ""}`} hidden={!open}>
        <button type="button" className="thanks__scrim" aria-label="Закрыть" onClick={onClose} />
        <section className="thanks__panel" role="dialog" aria-labelledby="thanks-title" aria-modal="true">
          <button type="button" className="thanks__close" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>
          <span className="thanks__mark" aria-hidden="true">
            <SparkleIcon />
          </span>
          <h2 id="thanks-title">{thanksCopy.title}</h2>
          <p className="thanks__text">{thanksText(kind)}</p>
          <Button onClick={onClose}>{thanksCopy.close}</Button>
        </section>
      </div>
    </OverlayHost>
  );
}
