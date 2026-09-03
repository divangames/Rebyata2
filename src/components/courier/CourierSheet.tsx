////////////////////////////////////////////////////////
//
// Шторка вызова курьера: телефон и ссылки на мессенджеры.
//
////////////////////////////////////////////////////////

import { useEffect, useId, useState, type FormEvent } from "react";
import { courierCopy, cta, requestCopy } from "../../config/content";
import { formatRuPhone, isFullRuPhone } from "../../helpers/phone";
import { Button } from "../button/Button";
import { CloseIcon } from "../icons/Icons";
import { MessengerButtons } from "../messengers/MessengerButtons";
import { OverlayHost } from "../overlay/OverlayHost";
import "../evaluate/EvaluateSheet.css";
import "./CourierSheet.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

/** Нижний лист заявки на курьера. */
export function CourierSheet({ open, onClose, onSuccess }: Props) {
  const phoneId = useId();
  const [phone, setPhone] = useState("+7");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }
    setPhone("+7");
    setError("");
  }, [open]);

  /** Проверяет телефон и открывает общее окно благодарности. */
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isFullRuPhone(phone)) {
      setError(requestCopy.phoneError);
      return;
    }
    setError("");
    onSuccess();
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
          <Button type="submit">{courierCopy.submit}</Button>
          <p className="courier__write">{requestCopy.messengersLead}</p>
          <MessengerButtons onOpen={onSuccess} />
          <p className="courier__note">{courierCopy.note}</p>
          <p className="courier__consent">{requestCopy.consent}</p>
        </form>
      </div>
    </OverlayHost>
  );
}
