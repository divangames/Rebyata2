////////////////////////////////////////////////////////
//
// Поп-ап заявки: имя и телефон по выбранной услуге.
//
////////////////////////////////////////////////////////

import { useEffect, useId, useState, type FormEvent } from "react";
import { formatRuPhone, isFullRuPhone } from "../../helpers/phone";
import { Button } from "../button/Button";
import { CloseIcon } from "../icons/Icons";
import { OverlayHost } from "../overlay/OverlayHost";
import "./RequestModal.css";

type Props = {
  open: boolean;
  serviceTitle: string;
  onClose: () => void;
};

/** Модальное окно заявки с именем и телефоном. */
export function RequestModal({ open, serviceTitle, onClose }: Props) {
  const nameId = useId();
  const phoneId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setName("");
    setPhone("+7");
    setError("");
    setSent(false);
  }, [open, serviceTitle]);

  /** Проверяет поля и показывает статус отправки. */
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Укажите имя");
      return;
    }
    if (!isFullRuPhone(phone)) {
      setError("Укажите номер телефона");
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
        <p className="request__eyebrow">Заявка</p>
        <h2 id="request-title">{serviceTitle}</h2>
        <p className="request__hint">Оставьте имя и телефон — перезвоним.</p>
        {sent ? (
          <p className="request__ok">Заявка принята. Ответ в течение 2–3 минут.</p>
        ) : (
          <>
            <label htmlFor={nameId}>
              Имя
              <input
                id={nameId}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label htmlFor={phoneId}>
              Телефон
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
            <Button type="submit">Отправить</Button>
          </>
        )}
      </form>
    </div>
    </OverlayHost>
  );
}
