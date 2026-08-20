////////////////////////////////////////////////////////
//
// Общие типы приложения.
//
////////////////////////////////////////////////////////

export type ScreenId = "home" | "orders" | "account";

export type WorkFilter = "all" | "shoes" | "bags" | "clothes";

export type ServiceCard = {
  id: string;
  title: string;
  text: string;
  price: string;
  image: string;
};

export type WorkExample = {
  id: string;
  title: string;
  filter: Exclude<WorkFilter, "all">;
  before: string;
  after: string;
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
