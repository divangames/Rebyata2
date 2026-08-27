////////////////////////////////////////////////////////
//
// Иконки шагов установки PWA: шаринг Safari, меню, колокол.
//
////////////////////////////////////////////////////////

type IconProps = {
  className?: string;
};

/** Кнопка «Поделиться» Safari. */
export function ShareIosIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5v11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m8.2 6.8 3.8-3.5 3.8 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5v8.2A1.8 1.8 0 0 0 7.8 20.5h8.4a1.8 1.8 0 0 0 1.8-1.8v-8.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Три точки меню Chrome. */
export function DotsMenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="6" r="1.55" fill="currentColor" />
      <circle cx="12" cy="12" r="1.55" fill="currentColor" />
      <circle cx="12" cy="18" r="1.55" fill="currentColor" />
    </svg>
  );
}

/** Уведомление о заказе. */
export function BellIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.2 16.4V11a5.8 5.8 0 0 1 11.6 0v5.4l1.2 1.8H5l1.2-1.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 19.2a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Скидка. */
export function SaleTagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 12.2 12 4.7h6.8V11.5L11.3 19.1a1.6 1.6 0 0 1-2.3 0L4.5 14.5a1.6 1.6 0 0 1 0-2.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="16.2" cy="8.3" r="1.15" fill="currentColor" />
    </svg>
  );
}
