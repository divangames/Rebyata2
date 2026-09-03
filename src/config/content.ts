////////////////////////////////////////////////////////
//
// Тексты и данные строго по макетам, без добавлений.
//
////////////////////////////////////////////////////////

import serviceBackpack from "../assets/services/backpack.png";
import serviceBags from "../assets/services/bags.png";
import serviceOther from "../assets/USLUGI/Other.png";
import serviceShoes from "../assets/services/shoes.png";
////////////////////////////////////////////////////////
//
// Пары работ: *_1 / *_01 — после (превью карточки), *_2 / *_02 — до.
//
////////////////////////////////////////////////////////
import workBackpackAfter from "../assets/work/backpack_01.png";
import workBackpackBefore from "../assets/work/backpack_02.png";
import workBagAfter from "../assets/work/bag_01.png";
import workBagBefore from "../assets/work/bag_02.png";
import workSneakersAfter from "../assets/work/sneakers_1.png";
import workSneakersBefore from "../assets/work/sneakers_2.png";
import type { FaqItem, HowStep, ServiceCard, WorkExample, WorkRow, WorkService, WorkSlide } from "../types";

export const brand = {
  name: "Свои ребята",
  nameCaps: "СВОИ РЕБЯТА",
  kicker: "ХИМЧИСТКА • РЕСТАВРАЦИЯ • РЕМОНТ",
  sloganLines: ["Чистые", "вещи —", "лучшие", "истории"],
  sloganFull: "Чистые вещи — лучшие истории",
  heroLead: "Позаботимся о ваших любимых вещах",
  copyright: "© 2026 Свои ребята",
} as const;

export const categories = [
  { id: "shoes", label: "Обувь" },
  { id: "bags", label: "Сумки" },
  { id: "backpacks", label: "Рюкзаки" },
  { id: "other", label: "И другое" },
] as const;

export const cta = {
  estimate: "Узнать стоимость",
  courier: "Вызвать курьера",
  writeVia: "Написать в:",
} as const;

/** Тексты шторки «Вызвать курьера»: телефон и выбор мессенджера. */
export const courierCopy = {
  lead: "Оставьте телефон — уточним адрес и удобное время.",
  submit: "Вызвать курьера",
  note: "Без обязательств • всё согласуем заранее",
  sent: "Заявка принята. Свяжемся с вами в выбранном мессенджере.",
} as const;

export const requestCopy = {
  eyebrow: "Заявка на чистку",
  lead: "Выберите удобный способ связи",
  phoneLabel: "Телефон",
  callback: "Перезвоните мне",
  messengersLead: "или написать в:",
  consent: "Нажимая кнопку, вы соглашаетесь с обработкой данных",
  sent: "Заявка принята. Перезвоним в течение 5 минут.",
  phoneError: "Укажите номер телефона",
} as const;

/** Общее окно после заявки, курьера или оценки. */
export const thanksCopy = {
  title: "Спасибо за обращение!",
  close: "Хорошо",
  request:
    "Мы уже получили вашу заявку. Менеджер свяжется с вами в течение 5 минут, чтобы всё уточнить и согласовать.",
  evaluate:
    "Фото у нас! Мы проведём оценку в течение 15 минут и сразу свяжемся с вами, чтобы обсудить результат.",
} as const;

export const evaluateCopy = {
  lead: "Добавьте 1–4 фото вещи с разных ракурсов.",
  dropTitle: "Добавить фото",
  dropSub: "Сделать снимок или выбрать из галереи",
  dropHint: "Можно начать с одного фото",
  disclaimer: "Предварительная стоимость. Итоговую согласуем после осмотра.",
  continue: "Продолжить",
  continueHint: "Добавьте хотя бы одно фото",
  maxPhotos: "Можно добавить до 4 фото",
  step2Title: "Куда прислать стоимость?",
  phoneLabel: "Телефон",
  submit: "Получить стоимость",
  phoneError: "Укажите номер телефона",
} as const;

/** Срок ответа на оценку по фото. */
export const evaluateTiming = {
  short: "до 15 мин",
  sent: "Стоимость отправим в выбранный канал до 15 мин.",
  faq: "Ответ на оценку — до 15 мин.",
} as const;

export const howSteps: HowStep[] = [
  {
    title: "Добавьте фото вещи",
    text: "Можно начать с одного — несколько ракурсов помогут оценить точнее.",
  },
  {
    title: "Получите предварительную стоимость",
    text: "Оценка занимает до 15 мин.",
  },
  {
    title: "Согласуйте работы",
    text: "После осмотра подтвердим итоговую стоимость. Начнём только с вашего согласия.",
  },
];

export const servicesCopy = {
  title: "Услуги и цены",
  lead: "Профессиональная забота о ваших вещах",
} as const;

export const services: ServiceCard[] = [
  {
    id: "shoes",
    title: "Обувь",
    text: "Чистка, реставрация, ремонт",
    price: "от 1 900 ₽",
    image: serviceShoes,
  },
  {
    id: "bags",
    title: "Сумки",
    text: "Чистка, восстановление формы, фурнитуры",
    price: "от 2 000 ₽",
    image: serviceBags,
  },
  {
    id: "backpacks",
    title: "Рюкзаки",
    text: "Чистка, восстановление материалов",
    price: "от 2 000 ₽",
    image: serviceBackpack,
  },
  {
    id: "other",
    title: "Другие вещи",
    text: "Уход, большая одежда, текстиль",
    price: "от 1 500 ₽",
    image: serviceOther,
  },
];

/** Три вида работ в каждом ряду: заголовок карточки и текст в модалке. */
export const workKinds: { service: WorkService; description: string }[] = [
  {
    service: "Химчистка",
    description:
      "Убрали загрязнения, восстановили цвет и обработали материал защитным составом. Состав работ и сроки согласуем после осмотра.",
  },
  {
    service: "Реставрация",
    description:
      "Восстановили цвет, форму и потёртые участки, вернули вещи аккуратный вид. Состав работ и сроки согласуем после осмотра.",
  },
  {
    service: "Ремонт",
    description:
      "Починили фурнитуру, швы и конструкцию, чтобы вещью снова было удобно пользоваться. Состав работ и сроки согласуем после осмотра.",
  },
];

/** Три кадра сравнения из одной пары — заглушка миниатюр. */
function workSlides(prefix: string, before: string, after: string): WorkSlide[] {
  return [1, 2, 3].map((index) => ({
    id: `${prefix}-slide-${index}`,
    before,
    after,
  }));
}

/** В ряду всегда химчистка, реставрация и ремонт — фото пока одно на три карточки. */
function workTrio(id: string, before: string, after: string): WorkExample[] {
  return workKinds.map((kind, index) => ({
    id: `${id}-${index + 1}`,
    title: kind.service,
    service: kind.service,
    description: kind.description,
    slides: workSlides(`${id}-${index + 1}`, before, after),
  }));
}

export const workRows: WorkRow[] = [
  {
    id: "shoes",
    title: "Обувь",
    items: workTrio("sneakers", workSneakersBefore, workSneakersAfter),
  },
  {
    id: "bags",
    title: "Сумки и рюкзаки",
    items: [
      ...workTrio("bag", workBagBefore, workBagAfter),
      ...workTrio("backpack", workBackpackBefore, workBackpackAfter),
    ],
  },
];

/** Заголовок секции «Примеры работ». */
export const worksSection = {
  title: "Примеры работ",
  lead: "Реальные результаты чистки и реставрации",
  sliderHint: "Потяните ползунок, чтобы сравнить",
} as const;

/** Плоский список для модалки и поиска по id. */
export const works: WorkExample[] = workRows.flatMap((row) => row.items);

export const advantagesSection = {
  title: "Почему выбирают «Своих ребят»",
  note: "Фотофиксация состояния вещи до и после работ",
} as const;

export const advantages = [
  {
    id: "chem",
    title: "Профессиональная химия",
    text: "Подбираем средства под материал и тип загрязнения",
  },
  {
    id: "hand",
    title: "Ручная работа",
    text: "Сложные участки очищаем и восстанавливаем вручную",
  },
  {
    id: "care",
    title: "Бережное отношение",
    text: "Сохраняем форму, цвет и текстуру материалов",
  },
  {
    id: "agree",
    title: "Согласование до начала",
    text: "Заранее утверждаем стоимость и сложные работы",
  },
  {
    id: "delivery",
    title: "Заберём и привезём",
    text: "По Красноярску и ближайшему пригороду",
  },
  {
    id: "guarantee",
    title: "Гарантия на работу",
    text: "Если обнаружится недочёт — исправим бесплатно",
  },
] as const;

export const faqItems: FaqItem[] = [
  {
    id: "price",
    question: "Сколько стоит чистка?",
    paragraphs: [
      "Чистка обуви — от 1 900 ₽. Стоимость зависит от материала, состояния вещи и перечня работ.",
    ],
  },
  {
    id: "exact",
    question: "Как узнать точную стоимость?",
    paragraphs: [
      "Отправьте фотографии — предварительно оценим стоимость и сроки. Итоговую стоимость подтвердим после осмотра вещи.",
    ],
    action: { kind: "evaluate", label: "Узнать стоимость" },
  },
  {
    id: "time",
    question: "Какие сроки выполнения?",
    paragraphs: [
      "Обычно 3–5 рабочих дней. Точный срок сообщим после осмотра. Отсчёт начинается после согласования работ и оплаты заказа.",
    ],
  },
  {
    id: "guarantee",
    question: "Есть ли гарантия качества?",
    paragraphs: [
      "Мы отвечаем за качество согласованных работ, но не можем заранее гарантировать полное удаление любого пятна. Если обнаружится недостаток выполненной работы — бесплатно устраним его в согласованный срок. О возможных ограничениях предупредим до начала.",
      "Правила «14 дней» для услуг химчистки нет. При недостатках услуги действуют статьи 29–30 Закона о защите прав потребителей: клиент может потребовать устранить недостатки, уменьшить цену, повторно выполнить работу или возместить расходы.",
    ],
    links: [
      { label: "Роспотребнадзор", href: "https://www.rospotrebnadzor.ru/" },
      {
        label: "статья 29 закона",
        href: "https://www.consultant.ru/document/cons_doc_LAW_305/cf0d94a5cd4e7025c25383ee33dcc13d36cb0b0b/",
      },
    ],
  },
  {
    id: "stain",
    question: "Можно ли удалить любые пятна?",
    paragraphs: [
      "Не всегда. Результат зависит от материала, давности пятна и предыдущего ухода. До начала работ расскажем о возможном результате и рисках.",
    ],
  },
  {
    id: "handover",
    question: "Как передать вещи?",
    paragraphs: ["Закажите бесплатного курьера — согласуем удобные дату и время."],
    action: { kind: "courier", label: "Вызвать курьера" },
  },
  {
    id: "express",
    question: "Есть ли экспресс-тариф?",
    paragraphs: [
      "Да, если материал и технология работы позволяют:",
      "12 часов — доплата 100% от стоимости заказа;",
      "24 часа — доплата 50%.",
      "Возможность экспресс-чистки подтвердим после осмотра. Срок отсчитывается после согласования, оплаты и передачи вещи в работу.",
    ],
  },
  {
    id: "courier-price",
    question: "Сколько стоит курьер?",
    paragraphs: ["По Красноярску курьер бесплатный. Время забора и доставки согласуем заранее."],
  },
];

export const contacts = {
  ctaTitle: "Всегда на связи",
  ctaText: "Оцените вещь по фотографии прямо сейчас и получите скидку 10% на первый заказ.",
  ctaButton: "Узнать стоимость",
  phone: "+7 (___) ___-__-__",
  hours: "Ежедневно: с 10:00 до 20:00",
  address: "г. Красноярск. ул. Мичурина, 2ж",
  mapOpenLabel: "Открыть карту",
  telegramUrl: "https://t.me/",
  maxUrl: "https://max.ru/",
  map: {
    lat: 56.014302,
    lon: 92.959669,
    zoom: 16,
  },
} as const;

export const footerCue = {
  handLines: ["Свои ребята", "всегда рядом"],
  handFull: "Свои ребята всегда рядом",
} as const;

export const footerNav = ["Услуги", "Цены", "FAQ", "Контакты"] as const;

export const pwaInstall = {
  title: "На рабочий стол",
  lead: "Сохраните «Свои ребята» как приложение — придут пуши о статусе заказа и персональные скидки.",
  benefits: [
    { id: "push", text: "Пуш о статусе заказа" },
    { id: "sale", text: "Индивидуальные скидки" },
    { id: "home", text: "Ярлык рядом с приложениями" },
  ],
  ios: {
    badge: "iPhone",
    safariNote: "Откройте сайт в Safari. В Chrome на iPhone ярлык не ставится.",
    steps: [
      {
        title: "Нажмите «Поделиться»",
        text: "Кнопка внизу Safari — квадрат со стрелкой вверх.",
      },
      {
        title: "«На экран „Домой“»",
        text: "Пролистайте меню и выберите этот пункт.",
      },
      {
        title: "Нажмите «Добавить»",
        text: "Иконка появится на рабочем столе.",
      },
    ],
  },
  android: {
    badge: "Android",
    steps: [
      {
        title: "Откройте меню браузера",
        text: "Три точки в правом верхнем углу Chrome.",
      },
      {
        title: "«Установить приложение»",
        text: "Или пункт «Добавить на главный экран».",
      },
      {
        title: "Подтвердите установку",
        text: "После этого можно включить пуш-уведомления.",
      },
    ],
  },
  nativeLead: "Одно нажатие — ярлык на рабочем столе и уведомления о заказах.",
  installCta: "Установить",
  later: "Позже",
  gotIt: "Понятно",
} as const;
