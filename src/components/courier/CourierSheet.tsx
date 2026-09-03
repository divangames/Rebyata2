////////////////////////////////////////////////////////
//
// Шторка вызова курьера: телефон и выбор мессенджера.
//
////////////////////////////////////////////////////////

import { useEffect, useId, useState, type FormEvent } from "react";
import { courierCopy, cta, requestCopy } from "../../config/content";
import { formatRuPhone, isFullRuPhone } from "../../helpers/phone";
import { Button } from "../button/Button";
import { CloseIcon } from "../icons/Icons";
import { MessengerButtons, type ContactChannel, type MessengerId } from "../messengers/MessengerButtons";
import { OverlayHost } from "../overlay/OverlayHost";
import "../evaluate/EvaluateSheet.css";
import "./CourierSheet.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Подпись зелёной кнопки зависит от выбранного мессенджера. */
function submitLabel(messenger: MessengerId | null): string {
  return messenger ? courierCopy.submitMessenger : courierCopy.submit;
}

/** Нижний лист заявки на курьера. */
export function CourierSheet({ open, onClose }: Props) {
  const phoneId = useId();
  const [phone, setPhone] = useState("+7");
  const [messenger, setMessenger] = useState<MessengerId | null>(null);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setPhone("+7");
    setMessenger(null);
    setError("");
    setSent(false);
  }, [open]);

  /** Переключает мессенджер: повторный клик снимает выбор. */
  function onSelectMessenger(id: ContactChannel) {
    if (id === "call") {
      return;
    }
    setMessenger((current) => (current === id ? null : id));
  }

  /** Проверяет телефон и показывает статус отправки. */
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isFullRuPhone(phone)) {
      setError(requestCopy.phoneError);
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <OverlayHost open={open}>
      <div className={`sheet${open ? " is-open" : ""}`} hidden={!open}>
        <button type="button" className="sheet__scrim" aria-label="Закрыть" onClick={onClose} />
        <form
          className="sheet__panel courier"
          role="dialog"
          aria-labelledby="courier-title"
          onSubmit={onSubmit}
        >
          <button type="button" className="sheet__close" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>
          <h2 id="courier-title">{cta.courier}</h2>
          {sent ? (
            <p className="sheet__ok" role="status">
              {courierCopy.sent}
            </p>
          ) : (
            <>
              <p className="sheet__lead">{courierCopy.lead}</p>
              <label className="courier__field" htmlFor={phoneId}>
                {requestCopy.phoneLabel}
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
              {error ? <p className="courier__error">{error}</p> : null}
              <Button type="submit">{submitLabel(messenger)}</Button>
              <p className="courier__write">{requestCopy.messengersLead}</p>
              <MessengerButtons selected={messenger} onSelect={onSelectMessenger} />
              <p className="courier__note">{courierCopy.note}</p>
              <p className="courier__consent">{requestCopy.consent}</p>
            </>
          )}
        </form>
      </div>
    </OverlayHost>
  );
}
