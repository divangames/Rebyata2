////////////////////////////////////////////////////////
//
// Экран 06: призыв, контакты со списком, карта, подвал.
//
////////////////////////////////////////////////////////

import { brand, contacts, cta, footerNav } from "../../config/content";
import { yandexMapsUrl } from "../../helpers/maps";
import { Button } from "../button/Button";
import { FooterCue } from "../footer/FooterCue";
import { PinIcon } from "../icons/Icons";
import { ClockIcon, PhoneIcon } from "./ContactIcons";
import { ContactPhone } from "./ContactPhone";
import { ContactsMap } from "./ContactsMap";
import "./Contacts.css";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
  onJump: (id: string) => void;
};

/** Сопоставляет подпись футера с якорем секции. */
function footerTarget(label: (typeof footerNav)[number]): string {
  switch (label) {
    case "Услуги":
    case "Цены":
      return "services";
    case "FAQ":
      return "faq";
    case "Контакты":
      return "contacts";
    default: {
      const unexpected: never = label;
      return unexpected;
    }
  }
}

/** Контакты по структуре макета: CTA, список, карта, мессенджеры. */
export function Contacts({ onEvaluate, onCourier, onJump }: Props) {
  const mapsUrl = yandexMapsUrl({
    lat: contacts.map.lat,
    lon: contacts.map.lon,
    zoom: contacts.map.zoom,
    address: contacts.address,
  });

  return (
    <section className="contacts" id="contacts">
      <div className="contacts__body band">
        <article className="contacts__cta">
          <h2>{contacts.ctaTitle}</h2>
          <p>{contacts.ctaText}</p>
          <div className="contacts__cta-actions">
            <Button onClick={onEvaluate}>{contacts.ctaButton}</Button>
            <Button variant="secondary" onClick={onCourier}>
              {cta.courier}
            </Button>
          </div>
        </article>

        <h3 className="contacts__title">Контакты</h3>

        <ul className="contacts__list">
          <li>
            <PinIcon />
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              {contacts.address}
            </a>
          </li>
          <li>
            <PhoneIcon />
            <ContactPhone />
          </li>
          <li>
            <ClockIcon />
            <span>{contacts.hours}</span>
          </li>
        </ul>

        <ContactsMap />
      </div>
      <footer className="band">
        <FooterCue />
        <p>{brand.copyright}</p>
        <p>{brand.kicker}</p>
        <nav>
          {footerNav.map((label) => (
            <button key={label} type="button" onClick={() => onJump(footerTarget(label))}>
              {label}
            </button>
          ))}
        </nav>
      </footer>
    </section>
  );
}
