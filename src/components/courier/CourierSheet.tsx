////////////////////////////////////////////////////////
//
// Шторка вызова курьера: телефон, имя и необязательный адрес.
//
////////////////////////////////////////////////////////

import { useEffect, useId, useState, type FormEvent } from "react";
import { cta } from "../../config/content";
import { formatRuPhone, isFullRuPhone } from "../../helpers/phone";
import { Button } from "../button/Button";
import { ContactsSocial } from "../contacts/ContactsSocial";
import { CloseIcon } from "../icons/Icons";
import "../evaluate/EvaluateSheet.css";
import "./CourierSheet.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

/** Нижний лист заявки на курьера. */
export function CourierSheet({ open, onClose }: Props) {
  const phoneId = useId();
  const nameId = useId();
  const addressId = useId();
  const [phone, setPhone] = useState("+7");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setPhone("+7");
    setName("");
    setAddress("");
    setError("");
    setSent(false);
  }, [open]);

  /** Проверяет обязательные поля и показывает статус отправки. */
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isFullRuPhone(phone)) {
      setError("Укажите номер телефона");
      return;
    }
    if (name.trim().length < 2) {
      setError("Укажите имя");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
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
        <p className="sheet__lead">Оставьте контакты — согласуем удобное время.</p>
        {sent ? (
          <p className="sheet__ok">Заявка принята. Перезвоним в течение 2–3 минут.</p>
        ) : (
          <>
            <label className="courier__field" htmlFor={phoneId}>
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
            <label className="courier__field" htmlFor={nameId}>
              Имя
              <input
                id={nameId}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="courier__field" htmlFor={addressId}>
              <span className="courier__caption">
                Адрес <span className="courier__optional">необязательно</span>
              </span>
              <input
                id={addressId}
                name="address"
                autoComplete="street-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>
            {error ? <p className="courier__error">{error}</p> : null}
            <Button type="submit">{cta.send}</Button>
          </>
        )}
        <p className="courier__write">{cta.writeVia}</p>
        <ContactsSocial onDark pending />
      </form>
    </div>
  );
}
