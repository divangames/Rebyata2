////////////////////////////////////////////////////////
//
// Линейные иконки категорий и интерфейса по макету.
//
////////////////////////////////////////////////////////

type IconProps = {
  className?: string;
};

/** Четырёхконечная звезда брендбука. */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 0c.7 6.6 3.4 12.3 8.4 16-5 3.7-7.7 9.4-8.4 16-.7-6.6-3.4-12.3-8.4-16C12.6 12.3 15.3 6.6 16 0Z"
      />
    </svg>
  );
}

/** Три искры — профессиональная химия. */
export function SparklesIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8.2 4c.28 2.4 1.22 4.45 3 5.8-1.78 1.35-2.72 3.4-3 5.8-.28-2.4-1.22-4.45-3-5.8 1.78-1.35 2.72-3.4 3-5.8Z"
      />
      <path
        fill="currentColor"
        d="M16.6 3c.2 1.72.88 3.18 2.16 4.16-1.28.98-1.96 2.44-2.16 4.16-.2-1.72-.88-3.18-2.16-4.16C15.72 6.18 16.4 4.72 16.6 3Z"
      />
      <path
        fill="currentColor"
        d="M16.2 13.2c.18 1.55.78 2.86 1.92 3.74-1.14.88-1.74 2.19-1.92 3.74-.18-1.55-.78-2.86-1.92-3.74 1.14-.88 1.74-2.19 1.92-3.74Z"
      />
    </svg>
  );
}

/** Мастер с галочкой — ручная работа. */
export function MasterIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.2" cy="8.2" r="2.7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.4 18.2c.7-2.5 2.5-3.8 4.8-3.8 1.4 0 2.6.5 3.5 1.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m14.4 14.6 1.7 1.7 3.3-3.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Конверт — согласованные работы. */
export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m4.4 7.4 7.6 5.4 7.6-5.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Дом — пункт «Главная». */
export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Список заказов. */
export function OrdersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Профиль. */
export function UserIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.2 19c.9-2.8 3-4.2 5.8-4.2s4.9 1.4 5.8 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Меню-гамбургер. */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** Закрытие панелей. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** Кроссовки. */
export function ShoeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 15.5c2.2-1 4.2-4.2 7.4-4.4 1.6-.1 2.3 1 3.6 1.3 2.3.5 5 .2 5 .2v2.6H4.4c-.8 0-1.4-.7-1.2-1.4l.8-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 11.2 9.2 8.5h2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Сумка. */
export function BagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10h10l.8 9H6.2L7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 10V8.2A3 3 0 0 1 12 5.2 3 3 0 0 1 15 8.2V10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Рюкзак. */
export function BackpackIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7V5.5A2 2 0 0 1 12 3.5 2 2 0 0 1 14 5.5V7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Чемодан. */
export function SuitcaseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8V6.2A1.2 1.2 0 0 1 10.2 5h3.6A1.2 1.2 0 0 1 15 6.2V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Футболка / другое. */
export function ShirtIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6.5 4.5 9l2 2.2V19h11v-7.8L19.5 9 16 6.5s-1 .9-4 .9-4-.9-4-.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Пуховик — упрощённый силуэт куртки. */
export function PufferIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6.2 5 8.5v10.8h14V8.5L16 6.2S14.8 8 12 8 8 6.2 8 6.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.4 12h7.2M8.4 15.2h7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Щит с галочкой. */
export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 19 6.2v6.2c0 4.2-3 7.2-7 8.6-4-1.4-7-4.4-7-8.6V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m9 12.2 2 2 4.2-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Сердце. */
export function HeartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19s-6.5-4.1-8.2-8.2C2.6 8.4 4 6 6.6 6c1.6 0 2.6.8 3.4 1.8C10.8 6.8 11.8 6 13.4 6c2.6 0 4 2.4 2.8 4.8C14.5 14.9 12 19 12 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Грузовик / доставка. */
export function TruckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8h11v9H3V8Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 11h4.2L21 14.2V17h-7v-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="1.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17.5" r="1.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Галочка в круге. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Камера. */
export function CameraIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="7" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7 10.2 5h3.6L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** Плей. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.8 16 12l-6 3.2V8.8Z" fill="currentColor" />
    </svg>
  );
}

/** Пин на карте. */
export function PinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10.6" r="2.1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Стрелка вправо. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Чёрный круг с лаймовым плюсом — главное действие «Оценить». */
export function EvaluateIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M12 7v10M7 12h10" stroke="var(--green)" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

/** Тонкий плюс для закрытой карточки FAQ. */
export function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M8 2.5v11" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}
