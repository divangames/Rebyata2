////////////////////////////////////////////////////////
//
// Шторка оценки по фото: загрузка снимков вещи.
//
////////////////////////////////////////////////////////

import { useId, useState, type ChangeEvent } from "react";
import { cta, evaluateCopy, howSteps } from "../../config/content";
import { Button } from "../button/Button";
import { CameraIcon, CloseIcon } from "../icons/Icons";
import { EvaluateThumbs } from "./EvaluateThumbs";
import "./EvaluateSheet.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Шаги в шторке: первый пункт объясняет, зачем несколько ракурсов. */
function sheetSteps() {
  return howSteps.map((step, index) => (index === 0 ? evaluateCopy.step1 : step.title));
}

/** Нижний лист «Узнать стоимость». */
export function EvaluateSheet({ open, onClose }: Props) {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);

  /** Добавляет выбранные фото к уже загруженным. */
  function onPick(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    if (!list) {
      return;
    }
    setFiles((prev) => [...prev, ...Array.from(list)]);
    setSent(false);
    event.target.value = "";
  }

  /** Убирает одно фото из списка. */
  function onRemove(index: number) {
    setFiles((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setSent(false);
  }

  /** Имитирует отправку на оценку мастера. */
  function onSubmit() {
    if (files.length === 0) {
      return;
    }
    setSent(true);
  }

  return (
    <div className={`sheet${open ? " is-open" : ""}`} hidden={!open}>
      <button type="button" className="sheet__scrim" aria-label="Закрыть" onClick={onClose} />
      <section className="sheet__panel sheet__panel--evaluate" role="dialog" aria-labelledby="eval-title">
        <button type="button" className="sheet__close" onClick={onClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <h2 id="eval-title">{cta.estimate}</h2>
        <p className="sheet__lead">{evaluateCopy.lead}</p>
        <label className="sheet__drop" htmlFor={inputId}>
          <CameraIcon />
          <span>{files.length > 0 ? evaluateCopy.dropMore : evaluateCopy.dropEmpty}</span>
          <input id={inputId} type="file" accept="image/*" multiple onChange={onPick} />
        </label>
        <EvaluateThumbs files={files} onRemove={onRemove} />
        <ol className="sheet__steps">
          {sheetSteps().map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ol>
        <Button onClick={onSubmit} disabled={files.length === 0}>
          Получить оценку мастера
        </Button>
        {sent ? <p className="sheet__ok">Ответ в течение 2–3 минут.</p> : null}
      </section>
    </div>
  );
}
