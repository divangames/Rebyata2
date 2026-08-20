////////////////////////////////////////////////////////
//
// Иконки строк контактов и соцсетей.
//
////////////////////////////////////////////////////////

type IconProps = {
  className?: string;
};

/** Телефонная трубка. */
export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.2 3.8h3.1l1.2 3.1-1.6 1.6a12.4 12.4 0 0 0 5.6 5.6l1.6-1.6 3.1 1.2v3.1c0 .9-.7 1.7-1.6 1.8-7.3.8-13.5-5.4-12.7-12.7.1-.9.9-1.6 1.8-1.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Часы работы. */
export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.8V12l3.2 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Бумажный самолётик Telegram. */
export function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.15 3.47 3.37 10.7c-1.21.48-1.2 1.1.21 1.37l4.55 1.42 10.54-6.65c.5-.3.95-.14.58.22L9.9 14.4l-.33 3.62c.47 0 .68-.21.94-.46l2.28-2.21 4.75 3.5c.86.48 1.48.23 1.7-.8l3.07-14.48c.32-1.26-.47-1.82-1.16-1.1Z"
      />
    </svg>
  );
}

/** Стрелка «открыть вовне». */
export function ExternalArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9.5 7H17v7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
