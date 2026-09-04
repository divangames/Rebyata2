////////////////////////////////////////////////////////
//
// Тексты и данные строго по макетам, без добавлений.
//
////////////////////////////////////////////////////////

import serviceBackpack from "../assets/services/backpack.png";
import serviceBags from "../assets/services/bags.png";
import serviceOther from "../assets/USLUGI/Other.png";
import serviceShoes from "../assets/services/shoes.png";
import work01After from "../assets/work/shoes/01/intro/1a.webp";
import work01Before from "../assets/work/shoes/01/intro/1b.webp";
import work01OtherAfter from "../assets/work/shoes/01/other/2a.webp";
import work01OtherBefore from "../assets/work/shoes/01/other/2b.webp";
import work01Info from "../assets/work/shoes/01/info.md?raw";
import work02After from "../assets/work/shoes/02/intro/1a.webp";
import work02Before from "../assets/work/shoes/02/intro/1b.webp";
import work02_1After from "../assets/work/shoes/02/other/1a.webp";
import work02_1Before from "../assets/work/shoes/02/other/1b.webp";
import work02_2After from "../assets/work/shoes/02/other/2a.webp";
import work02_2Before from "../assets/work/shoes/02/other/2b.webp";
import work02_3After from "../assets/work/shoes/02/other/3a.webp";
import work02_3Before from "../assets/work/shoes/02/other/3b.webp";
import work02Info from "../assets/work/shoes/02/info.md?raw";
import work03After from "../assets/work/shoes/03/intro/1a.webp";
import work03Before from "../assets/work/shoes/03/intro/2b.webp";
import work03_1After from "../assets/work/shoes/03/other/1a.webp";
import work03_1Before from "../assets/work/shoes/03/other/2b.webp";
import work03Info from "../assets/work/shoes/03/info.md?raw";
import work05After from "../assets/work/shoes/05/intro/1a.webp";
import work05Before from "../assets/work/shoes/05/intro/1b.webp";
import work05_1After from "../assets/work/shoes/05/other/1a.webp";
import work05_1Before from "../assets/work/shoes/05/other/1b.webp";
import work05_2After from "../assets/work/shoes/05/other/2a.webp";
import work05_2Before from "../assets/work/shoes/05/other/2b.webp";
import work05_3After from "../assets/work/shoes/05/other/3a.webp";
import work05_3Before from "../assets/work/shoes/05/other/3b.webp";
import work05_4After from "../assets/work/shoes/05/other/4a.webp";
import work05_4Before from "../assets/work/shoes/05/other/4b.webp";
import work05Info from "../assets/work/shoes/05/info.md?raw";
import work06After from "../assets/work/shoes/06/intro/1a.webp";
import work06Before from "../assets/work/shoes/06/intro/2b.webp";
import work06_1After from "../assets/work/shoes/06/other/1a.webp";
import work06_1Before from "../assets/work/shoes/06/other/1b.webp";
import work06_2After from "../assets/work/shoes/06/other/2a.webp";
import work06_2Before from "../assets/work/shoes/06/other/2b.webp";
import work06_3After from "../assets/work/shoes/06/other/3a.webp";
import work06_3Before from "../assets/work/shoes/06/other/3b.webp";
import work06Info from "../assets/work/shoes/06/info.md?raw";
import type { FaqItem, HowStep, ServiceCard, WorkExample, WorkRow, WorkService, WorkSlide } from "../types";

type WorkInfo = Pick<WorkExample, "title" | "service" | "description">;

function parseWorkInfo(source: string): WorkInfo {
  const lines = source.split(/\r?\n/).map((line) => line.trim());
  const title = lines.find((line) => line.startsWith("## "))?.slice(3).trim() ?? "Пример работы";
  const service = lines.find((line) => line.startsWith("# "))?.slice(2).trim() as WorkService;
  const description = lines
    .filter((line) => line && !line.startsWith("#"))
    .join(" ");

  return { title, service, description };
}

const work01Copy = parseWorkInfo(work01Info);
const work02Copy = parseWorkInfo(work02Info);
const work03Copy = parseWorkInfo(work03Info);
const work05Copy = parseWorkInfo(work05Info);
const work06Copy = parseWorkInfo(work06Info);

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

function compareSlide(id: string, before: string, after: string): WorkSlide {
  return { id, before, after };
}

export const workRows: WorkRow[] = [
  {
    id: "portfolio",
    title: "Обувь",
    items: [
      {
        id: "work-01",
        ...work01Copy,
        preview: { before: work01Before, after: work01After },
        slides: [
          compareSlide("work-01-intro", work01Before, work01After),
          compareSlide("work-01-01", work01OtherBefore, work01OtherAfter),
        ],
      },
      {
        id: "work-02",
        ...work02Copy,
        preview: { before: work02Before, after: work02After },
        slides: [
          compareSlide("work-02-intro", work02Before, work02After),
          compareSlide("work-02-01", work02_1Before, work02_1After),
          compareSlide("work-02-02", work02_2Before, work02_2After),
          compareSlide("work-02-03", work02_3Before, work02_3After),
        ],
      },
      {
        id: "work-03",
        ...work03Copy,
        preview: { before: work03Before, after: work03After },
        slides: [
          compareSlide("work-03-intro", work03Before, work03After),
          compareSlide("work-03-01", work03_1Before, work03_1After),
        ],
      },
      {
        id: "work-05",
        ...work05Copy,
        preview: { before: work05Before, after: work05After },
        slides: [
          compareSlide("work-05-intro", work05Before, work05After),
          compareSlide("work-05-01", work05_1Before, work05_1After),
          compareSlide("work-05-02", work05_2Before, work05_2After),
          compareSlide("work-05-03", work05_3Before, work05_3After),
          compareSlide("work-05-04", work05_4Before, work05_4After),
        ],
      },
      {
        id: "work-06",
        ...work06Copy,
        preview: { before: work06Before, after: work06After },
        slides: [
          compareSlide("work-06-intro", work06Before, work06After),
          compareSlide("work-06-01", work06_1Before, work06_1After),
          compareSlide("work-06-02", work06_2Before, work06_2After),
          compareSlide("work-06-03", work06_3Before, work06_3After),
        ],
      },
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
