////////////////////////////////////////////////////////
//
// Шторка оценки по фото: загрузка снимков вещи.
//
////////////////////////////////////////////////////////

import { useId, useState, type ChangeEvent } from "react";
import { howSteps } from "../../config/content";
import { Button } from "../button/Button";
import { CameraIcon, CloseIcon } from "../icons/Icons";
import "./EvaluateSheet.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Нижний лист «Оценить по фото». */
export function EvaluateSheet({ open, onClose }: Props) {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);

  /** Сохраняет выбранные пользователем фото. */
  function onPick(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    if (!list) {
      return;
    }
    setFiles(Array.from(list));
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
      <section className="sheet__panel" role="dialog" aria-labelledby="eval-title">
        <button type="button" className="sheet__close" onClick={onClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <h2 id="eval-title">Оценить по фото</h2>
        <p className="sheet__lead">Загрузите фото вещи</p>
        <label className="sheet__drop" htmlFor={inputId}>
          <CameraIcon />
          <span>ФОТО ВЕЩИ</span>
          <input id={inputId} type="file" accept="image/*" multiple onChange={onPick} />
        </label>
        {files.length > 0 ? <p className="sheet__count">Файлов: {files.length}</p> : null}
        <ol className="sheet__steps">
          {howSteps.map((step) => (
            <li key={step.title}>{step.title}</li>
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
