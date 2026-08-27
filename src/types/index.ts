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

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type DeviceTier = "low" | "high";

/** Мобильная ОС для инструкции установки PWA. */
export type MobileOs = "ios" | "android";
