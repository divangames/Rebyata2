////////////////////////////////////////////////////////
//
// Кружки мессенджеров: Telegram и MAX.
//
////////////////////////////////////////////////////////

import maxMark from "../../assets/icons/MAX.svg";
import { contacts } from "../../config/content";
import { TelegramIcon } from "./ContactIcons";
import "./Contacts.css";

type Props = {
  /** Кружки на чёрном фоне подвала. */
  onDark?: boolean;
};

/** Пара ссылок на мессенджеры. */
export function ContactsSocial({ onDark = false }: Props) {
  return (
    <ul className={`contacts__social${onDark ? " contacts__social--on-dark" : ""}`}>
      <li>
        <a
          className="contacts__social-link"
          href={contacts.telegramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
        >
          <TelegramIcon />
        </a>
      </li>
      <li>
        <a
          className="contacts__social-link"
          href={contacts.maxUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="MAX"
        >
          <img src={maxMark} alt="" width={22} height={22} />
        </a>
      </li>
    </ul>
  );
}
