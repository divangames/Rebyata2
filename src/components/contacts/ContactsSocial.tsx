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
  /** Заглушка без перехода, пока нет рабочих ссылок. */
  pending?: boolean;
};

/** Не даёт якорю прокрутить страницу, пока ссылка не задана. */
function onPendingClick(event: { preventDefault: () => void }) {
  event.preventDefault();
}

/** Пара ссылок на мессенджеры. */
export function ContactsSocial({ onDark = false, pending = false }: Props) {
  const telegramHref = pending ? "#" : contacts.telegramUrl;
  const maxHref = pending ? "#" : contacts.maxUrl;

  return (
    <ul className={`contacts__social${onDark ? " contacts__social--on-dark" : ""}`}>
      <li>
        <a
          className="contacts__social-link"
          href={telegramHref}
          target={pending ? undefined : "_blank"}
          rel={pending ? undefined : "noreferrer"}
          aria-label="Telegram"
          aria-disabled={pending || undefined}
          onClick={pending ? onPendingClick : undefined}
        >
          <TelegramIcon />
        </a>
      </li>
      <li>
        <a
          className="contacts__social-link"
          href={maxHref}
          target={pending ? undefined : "_blank"}
          rel={pending ? undefined : "noreferrer"}
          aria-label="MAX"
          aria-disabled={pending || undefined}
          onClick={pending ? onPendingClick : undefined}
        >
          <img src={maxMark} alt="" width={22} height={22} />
        </a>
      </li>
    </ul>
  );
}
