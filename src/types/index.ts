////////////////////////////////////////////////////////
//
// Общие типы приложения.
//
////////////////////////////////////////////////////////

export type ScreenId = "home" | "orders" | "account";

export type WorkService = "Химчистка" | "Реставрация" | "Ремонт";

export type ServiceCard = {
  id: string;
  title: string;
  text: string;
  price: string;
  image: string;
};

export type WorkSlide = {
  id: string;
  before: string;
  after: string;
};

export type WorkExample = {
  id: string;
  title: string;
  service: WorkService;
  description: string;
  preview?: {
    image?: string;
    before?: string;
    after?: string;
  };
  slides: WorkSlide[];
};

export type WorkRow = {
  id: string;
  title: string;
  items: WorkExample[];
};

export type HowStep = {
  title: string;
  text: string;
};

export type FaqAction = {
  kind: "evaluate" | "courier";
  label: string;
};

export type FaqLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  id: string;
  question: string;
  paragraphs: string[];
  action?: FaqAction;
  links?: FaqLink[];
};

export type DeviceTier = "low" | "high";

/** Мобильная ОС для инструкции установки PWA. */
export type MobileOs = "ios" | "android";

/** Вариант общего окна благодарности после заявки. */
export type ThanksKind = "request" | "evaluate";
