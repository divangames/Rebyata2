////////////////////////////////////////////////////////
//
// Шторка оценки по фото: два шага — фото и способ связи.
//
////////////////////////////////////////////////////////

import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { cta, evaluateCopy, evaluateTiming } from "../../config/content";
import { formatRuPhone, isFullRuPhone } from "../../helpers/phone";
import { Button } from "../button/Button";
import { CameraIcon, CloseIcon } from "../icons/Icons";
import { MessengerButtons, type ContactChannel } from "../messengers/MessengerButtons";
import { OverlayHost } from "../overlay/OverlayHost";
import { EvaluateThumbs } from "./EvaluateThumbs";
import "./EvaluateSheet.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MAX_PHOTOS = 4;

/** Нижний лист «Узнать стоимость»: фото → контакт. */
export function EvaluateSheet({ open, onClose }: Props) {
  const inputId = useId();
  const phoneId = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [files, setFiles] = useState<File[]>([]);
  const [channel, setChannel] = useState<ContactChannel | null>(null);
  const [phone, setPhone] = useState("+7");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setFiles([]);
      setChannel(null);
      setPhone("+7");
      setError("");
      setSent(false);
    }
  }, [open]);

  /** Добавляет выбранные фото, не больше четырёх. */
  function onPick(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    if (!list) {
      return;
    }
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, MAX_PHOTOS));
    setSent(false);
    event.target.value = "";
  }

  /** Убирает одно фото из списка. */
  function onRemove(index: number) {
    setFiles((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setSent(false);
  }

  /** Переходит ко второму шагу после загрузки фото. */
  function onContinue() {
    if (files.length === 0) {
      return;
    }
    setError("");
    setStep(2);
  }

  /** Переключает канал связи: повторный клик снимает выбор. */
  function onSelectChannel(id: ContactChannel) {
    setChannel((current) => (current === id ? null : id));
  }

  /** Проверяет канал и телефон, затем показывает статус отправки. */
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!channel) {
      setError(evaluateCopy.channelError);
      return;
    }
    if (!isFullRuPhone(phone)) {
      setError(evaluateCopy.phoneError);
      return;
    }
    setError("");
    setSent(true);
  }

  const canAddMore = files.length < MAX_PHOTOS;
  const title = step === 1 ? cta.estimate : evaluateCopy.step2Title;

  return (
    <OverlayHost open={open}>
      <div className={`sheet${open ? " is-open" : ""}`} hidden={!open}>
        <button type="button" className="sheet__scrim" aria-label="Закрыть" onClick={onClose} />
        <section
          className={`sheet__panel sheet__panel--evaluate${step === 2 ? " sheet__panel--contact" : ""}`}
          role="dialog"
          aria-labelledby="eval-title"
        >
          <button type="button" className="sheet__close" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>

          {step === 2 ? (
            <button type="button" className="sheet__back" onClick={() => setStep(1)}>
              ← Назад
            </button>
          ) : null}

          <h2 id="eval-title">{title}</h2>

          {sent ? (
            <p className="sheet__ok">{evaluateTiming.sent}</p>
          ) : step === 1 ? (
            <>
              <p className="sheet__lead">{evaluateCopy.lead}</p>

              {canAddMore ? (
                <label className="sheet__drop" htmlFor={inputId}>
                  <CameraIcon />
                  <span className="sheet__drop-title">{evaluateCopy.dropTitle}</span>
                  <span className="sheet__drop-sub">{evaluateCopy.dropSub}</span>
                  <span className="sheet__drop-hint">{evaluateCopy.dropHint}</span>
                  <input
                    id={inputId}
                    className="sheet__file"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onPick}
                  />
                </label>
              ) : null}

              <EvaluateThumbs files={files} onRemove={onRemove} />

              {!canAddMore ? <p className="sheet__limit">{evaluateCopy.maxPhotos}</p> : null}

              <p className="sheet__disclaimer">{evaluateCopy.disclaimer}</p>

              <Button onClick={onContinue} disabled={files.length === 0}>
                {evaluateCopy.continue}
              </Button>

              {files.length === 0 ? (
                <p className="sheet__continue-hint">{evaluateCopy.continueHint}</p>
              ) : null}
            </>
          ) : (
            <form className="sheet__contact" onSubmit={onSubmit}>
              <MessengerButtons withCall selected={channel} onSelect={onSelectChannel} />

              <label className="sheet__field" htmlFor={phoneId}>
                {evaluateCopy.phoneLabel}
                <input
                  id={phoneId}
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(formatRuPhone(event.target.value))}
                />
              </label>

              {error ? <p className="sheet__error">{error}</p> : null}

              <Button type="submit">{evaluateCopy.submit}</Button>
            </form>
          )}
        </section>
      </div>
    </OverlayHost>
  );
}
