////////////////////////////////////////////////////////
//
// Кнопки Telegram и MAX: ссылки или выбор в форме.
//
////////////////////////////////////////////////////////

import maxMark from "../../assets/icons/MAX.svg";
import { contacts } from "../../config/content";
import { PhoneIcon, TelegramIcon } from "../contacts/ContactIcons";
import { ArrowIcon } from "../icons/Icons";
import "../button/Button.css";
import "./MessengerButtons.css";

export type MessengerId = "telegram" | "max";

export type ContactChannel = MessengerId | "call";

type MessengerVariant = "dark" | "light";

type Props = {
  /** Заглушка без перехода, пока нет рабочих ссылок. */
  pending?: boolean;
  className?: string;
  /** Внешний вид: тёмные пилюли или белые, как «Вызвать курьера». */
  variant?: MessengerVariant;
  /** Добавляет кнопку «Звонок» в режиме выбора. */
  withCall?: boolean;
  /** Выбранный канал в режиме выбора. */
  selected?: ContactChannel | null;
  /** Включает режим выбора вместо перехода по ссылке. */
  onSelect?: (id: ContactChannel) => void;
  /** Сообщает родителю, что пользователь ушёл в мессенджер. */
  onOpen?: (id: MessengerId) => void;
};

const messengerItems: { id: MessengerId; label: string }[] = [
  { id: "telegram", label: "Telegram" },
  { id: "max", label: "MAX" },
];

/** Иконка мессенджера или звонка. */
function ChannelMark({ id }: { id: ContactChannel }) {
  switch (id) {
    case "telegram":
      return <TelegramIcon />;
    case "max":
      return <img src={maxMark} alt="" width={22} height={22} />;
    case "call":
      return <PhoneIcon />;
    default: {
      const neverId: never = id;
      return neverId;
    }
  }
}

/** Подпись кнопки канала связи. */
function channelLabel(id: ContactChannel): string {
  switch (id) {
    case "telegram":
      return "Telegram";
    case "max":
      return "MAX";
    case "call":
      return "Звонок";
    default: {
      const neverId: never = id;
      return neverId;
    }
  }
}

/** Не даёт якорю прокрутить страницу, пока ссылка не задана. */
function onPendingClick(event: { preventDefault: () => void }) {
  event.preventDefault();
}

/** Возвращает адрес мессенджера или заглушку. */
function messengerHref(id: MessengerId, pending: boolean): string {
  if (pending) {
    return "#";
  }

  switch (id) {
    case "telegram":
      return contacts.telegramUrl;
    case "max":
      return contacts.maxUrl;
    default: {
      const neverId: never = id;
      return neverId;
    }
  }
}

/** Собирает список каналов для режима выбора. */
function choiceItems(withCall: boolean): ContactChannel[] {
  const items: ContactChannel[] = ["telegram", "max"];
  if (withCall) {
    items.push("call");
  }
  return items;
}

/** Содержимое светлой ссылки: иконка, подпись и стрелка. */
function LightLinkContent({ id, label }: { id: MessengerId; label: string }) {
  return (
    <>
      <span className="messenger-buttons__lead">
        <ChannelMark id={id} />
        <span className="btn__label">{label}</span>
      </span>
      <ArrowIcon />
    </>
  );
}

/** Открывает мессенджер и сообщает родителю. */
function onMessengerClick(
  id: MessengerId,
  pending: boolean,
  onOpen: ((id: MessengerId) => void) | undefined,
  event: { preventDefault: () => void },
) {
  if (pending) {
    onPendingClick(event);
    return;
  }
  onOpen?.(id);
}

/** Тёмные или светлые пилюли: переход в мессенджер или выбор канала связи. */
export function MessengerButtons({
  pending = false,
  className = "",
  variant = "dark",
  withCall = false,
  selected = null,
  onSelect,
  onOpen,
}: Props) {
  const choice = Boolean(onSelect);
  const rootClass = `messenger-buttons messenger-buttons--${variant}${choice ? " messenger-buttons--choice" : ""}${
    withCall ? " messenger-buttons--with-call" : ""
  }${className ? ` ${className}` : ""}`;

  if (onSelect) {
    return (
      <div className={rootClass} role="group" aria-label="Способ связи">
        {choiceItems(withCall).map((item) => {
          const isSelected = selected === item;
          return (
            <button
              key={item}
              type="button"
              className={`messenger-buttons__btn${isSelected ? " is-selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(item)}
            >
              <ChannelMark id={item} />
              <span>{channelLabel(item)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={rootClass}>
      {messengerItems.map((item) =>
        variant === "light" ? (
          <a
            key={item.id}
            className="btn btn--light messenger-buttons__link"
            href={messengerHref(item.id, pending)}
            target={pending ? undefined : "_blank"}
            rel={pending ? undefined : "noopener noreferrer"}
            aria-disabled={pending || undefined}
            onClick={(event) => onMessengerClick(item.id, pending, onOpen, event)}
          >
            <span className="btn__idle">
              <LightLinkContent id={item.id} label={item.label} />
            </span>
            <span className="btn__shift" aria-hidden="true">
              <LightLinkContent id={item.id} label={item.label} />
            </span>
          </a>
        ) : (
          <a
            key={item.id}
            className="messenger-buttons__btn"
            href={messengerHref(item.id, pending)}
            target={pending ? undefined : "_blank"}
            rel={pending ? undefined : "noopener noreferrer"}
            aria-disabled={pending || undefined}
            onClick={(event) => onMessengerClick(item.id, pending, onOpen, event)}
          >
            <ChannelMark id={item.id} />
            <span>{item.label}</span>
          </a>
        ),
      )}
    </div>
  );
}
