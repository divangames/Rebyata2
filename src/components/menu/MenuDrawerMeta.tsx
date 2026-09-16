////////////////////////////////////////////////////////
//
// Низ шторки: контакты, мессенджеры, оценка и вызов курьера.
//
////////////////////////////////////////////////////////

import { contacts, cta } from "../../config/content";
import { yandexMapsUrl } from "../../helpers/maps";
import { Button } from "../button/Button";
import { ClockIcon, MailIcon, PhoneIcon } from "../contacts/ContactIcons";
import { ContactPhone } from "../contacts/ContactPhone";
import { MessengerButtons } from "../messengers/MessengerButtons";
import { PinIcon } from "../icons/Icons";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Адрес, телефон, часы, соцсети и CTA внизу меню. */
export function MenuDrawerMeta({ onEvaluate, onCourier }: Props) {
  const mapsUrl = yandexMapsUrl({
    lat: contacts.map.lat,
    lon: contacts.map.lon,
    zoom: contacts.map.zoom,
    address: `${contacts.address}, ${contacts.venue}`,
  });

  return (
    <div className="drawer__meta">
      <p className="drawer__kicker">Контакты</p>
      <ul className="drawer__contacts">
        <li>
          <PinIcon />
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            <span className="drawer__address">
              <strong>{contacts.address}</strong>
              <span>{contacts.venue}</span>
            </span>
          </a>
        </li>
        <li>
          <PhoneIcon />
          <ContactPhone />
        </li>
        <li>
          <MailIcon />
          <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
        </li>
        <li>
          <ClockIcon />
          <span>{contacts.hours}</span>
        </li>
      </ul>
      <p className="drawer__write">{cta.writeVia}</p>
      <MessengerButtons className="drawer__messengers messenger-buttons--panel" />
      <div className="drawer__cta">
        <Button onClick={onEvaluate}>{cta.estimate}</Button>
        <Button variant="light" onClick={onCourier}>
          {cta.courier}
        </Button>
      </div>
    </div>
  );
}
