////////////////////////////////////////////////////////
//
// Поп-ап заявки: категория выбрана, телефон или мессенджеры.
//
////////////////////////////////////////////////////////

import { useEffect, useId, useState, type FormEvent } from "react";
import { requestCopy } from "../../config/content";
import { formatRuPhone, isFullRuPhone } from "../../helpers/phone";
import { Button } from "../button/Button";
import { CloseIcon } from "../icons/Icons";
import { MessengerButtons } from "../messengers/MessengerButtons";
import { OverlayHost } from "../overlay/OverlayHost";
import "./RequestModal.css";

type Props = {
  open: boolean;
  serviceTitle: string;
  onClose: () => void;
};

/** Модальное окно заявки: перезвон или переход в мессенджер. */
export function RequestModal({ open, serviceTitle, onClose }: Props) {
  const phoneId = useId();
  const [phone, setPhone] = useState("+7");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setPhone("+7");
    setError("");
    setSent(false);
  }, [open, serviceTitle]);

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
      <div className={`request${open ? " is-open" : ""}`} hidden={!open}>
        <button type="button" className="request__scrim" aria-label="Закрыть" onClick={onClose} />
        <form
          className="request__panel"
          role="dialog"
          aria-labelledby="request-title"
          onSubmit={onSubmit}
        >
          <button type="button" className="request__close" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>

          <p className="request__eyebrow">{requestCopy.eyebrow}</p>
          <h2 id="request-title">{serviceTitle}</h2>
          <p className="request__hint">{requestCopy.lead}</p>

          {sent ? (
            <p className="request__ok">{requestCopy.sent}</p>
          ) : (
            <>
              <label htmlFor={phoneId}>
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

              {error ? <p className="request__error">{error}</p> : null}

              <Button type="submit">{requestCopy.callback}</Button>

              <p className="request__messengers-lead">{requestCopy.messengersLead}</p>
              <MessengerButtons pending className="request__messengers" />

              <p className="request__consent">{requestCopy.consent}</p>
            </>
          )}
        </form>
      </div>
    </OverlayHost>
  );
}
