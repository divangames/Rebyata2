////////////////////////////////////////////////////////
//
// Тексты и данные строго по макетам, без добавлений.
//
////////////////////////////////////////////////////////

import serviceBackpack from "../assets/services/backpack.png";
import serviceBags from "../assets/services/bags.png";
import serviceOther from "../assets/USLUGI/Other.png";
import serviceShoes from "../assets/services/shoes.png";
import type { FaqItem, HowStep, ServiceCard, WorkExample, WorkRow, WorkService, WorkSlide } from "../types";

const workInfoFiles = import.meta.glob("../assets/work/*/*/info.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;
const workImageFiles = import.meta.glob("../assets/work/*/*/{intro,other}/*", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

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

/** Заглушка ссылки на личный кабинет — заменить, когда будет готов URL. */
export const accountCabinetHref = "#";

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

function numericOrder(path: string): number {
  return Number(path.match(/(?:^|\/)(\d+)/)?.[1] ?? Number.MAX_SAFE_INTEGER);
}

function createSlides(paths: string[], prefix: string): WorkSlide[] {
  const sorted = [...paths].sort((a, b) => numericOrder(a) - numericOrder(b) || a.localeCompare(b));
  const groups = new Map<string, { a?: string; b?: string; image?: string }>();

  for (const path of sorted) {
    const file = path.split("/").pop() ?? path;
    const image = workImageFiles[path];
    const match = file.match(/^(.+?)([ab])\.[^.]+$/i);
    const key = match?.[1] ?? file;
    const group = groups.get(key) ?? {};
    if (match?.[2].toLowerCase() === "a") group.a = image;
    else if (match?.[2].toLowerCase() === "b") group.b = image;
    else group.image = image;
    groups.set(key, group);
  }

  const slides: WorkSlide[] = [];
  const unmatchedA: string[] = [];
  const unmatchedB: string[] = [];
  for (const [key, group] of groups) {
    if (group.a && group.b) slides.push({ id: `${prefix}-${key}`, before: group.b, after: group.a });
    else if (group.image) slides.push({ id: `${prefix}-${key}`, before: group.image, after: group.image });
    else if (group.a) unmatchedA.push(group.a);
    else if (group.b) unmatchedB.push(group.b);
  }
  const pairCount = Math.min(unmatchedA.length, unmatchedB.length);
  for (let index = 0; index < pairCount; index += 1) {
    slides.push({ id: `${prefix}-pair-${index + 1}`, before: unmatchedB[index], after: unmatchedA[index] });
  }
  for (const image of unmatchedA.slice(pairCount).concat(unmatchedB.slice(pairCount))) {
    slides.push({ id: `${prefix}-single-${slides.length + 1}`, before: image, after: image });
  }
  return slides;
}

function buildWorkRows(): WorkRow[] {
  const categoryTitles: Record<string, string> = {
    shoes: "Обувь",
    bags: "Сумки и рюкзаки",
  };
  const worksByCategory = new Map<string, WorkExample[]>();

  for (const [infoPath, info] of Object.entries(workInfoFiles)) {
    const match = infoPath.match(/assets\/work\/([^/]+)\/([^/]+)\/info\.md$/);
    if (!match) continue;
    const [, category, workId] = match;
    const introPaths = Object.keys(workImageFiles).filter((path) => path.includes(`/work/${category}/${workId}/intro/`));
    const otherPaths = Object.keys(workImageFiles).filter((path) => path.includes(`/work/${category}/${workId}/other/`));
    if (!introPaths.length || !otherPaths.length) continue;

    const introSlides = createSlides(introPaths, `${category}-${workId}-intro`);
    const slides = [...introSlides, ...createSlides(otherPaths, `${category}-${workId}-other`)];
    if (!slides.length) continue;
    const items = worksByCategory.get(category) ?? [];
    items.push({ id: `${category}-${workId}`, ...parseWorkInfo(info), preview: introSlides[0], slides });
    worksByCategory.set(category, items);
  }

  const categoryOrder = ["shoes", "bags"];
  return [...worksByCategory.entries()]
    .sort(([a], [b]) => (categoryOrder.indexOf(a) + 1 || 99) - (categoryOrder.indexOf(b) + 1 || 99))
    .map(([id, items]) => ({
      id,
      title: categoryTitles[id] ?? id,
      items: items.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })),
    }));
}

export const workRows: WorkRow[] = buildWorkRows();

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
