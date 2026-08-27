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
import workPufferAfter from "../assets/work/puffer_01.png";
import workPufferBefore from "../assets/work/puffer_02.png";
import workSneakersAfter from "../assets/work/sneakers_1.png";
import workSneakersBefore from "../assets/work/sneakers_2.png";
import type { FaqItem, HowStep, ServiceCard, WorkExample } from "../types";

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
  send: "Отправить",
  writeVia: "Написать в:",
} as const;

export const evaluateCopy = {
  lead: "Несколько фото с разных ракурсов — оценка точнее",
  dropEmpty: "ФОТО ВЕЩИ",
  dropMore: "ЕЩЁ ФОТО",
  step1: "Загрузите несколько фото с разных ракурсов — оператор точнее оценит стоимость",
} as const;

export const howSteps: HowStep[] = [
  {
    title: "Загрузите несколько фото вещи",
    text: "С разных ракурсов — оператор точнее оценит стоимость услуги",
  },
  {
    title: "Получите предварительную цену",
    text: "Ответ придёт в течение 2–3 минут",
  },
  {
    title: "Берём заказ после осмотра",
    text: "Точную стоимость подтверждаем при приёме вещи",
  },
];

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

export const works: WorkExample[] = [
  {
    id: "sneakers",
    title: "Кроссовки",
    filter: "shoes",
    before: workSneakersBefore,
    after: workSneakersAfter,
  },
  {
    id: "bag",
    title: "Сумка",
    filter: "bags",
    before: workBagBefore,
    after: workBagAfter,
  },
  {
    id: "puffer",
    title: "Пуховик",
    filter: "clothes",
    before: workPufferBefore,
    after: workPufferAfter,
  },
  {
    id: "backpack",
    title: "Рюкзак",
    filter: "bags",
    before: workBackpackBefore,
    after: workBackpackAfter,
  },
];

export const workFilters = [
  { id: "all", label: "Все" },
  { id: "shoes", label: "Обувь" },
  { id: "bags", label: "Сумки" },
  { id: "clothes", label: "Одежда" },
] as const;

export const advantages = [
  {
    id: "chem",
    title: "Профессиональная химия",
    text: "Безопасная для ваших вещей и окружающей среды",
  },
  {
    id: "hand",
    title: "Ручная работа",
    text: "Каждая деталь под вниманием мастера",
  },
  {
    id: "care",
    title: "Бережное отношение",
    text: "Сохраняем форму, цвет и текстуру материалов",
  },
  {
    id: "agree",
    title: "Согласованные работы",
    text: "Стоимость и результат известны заранее",
  },
  {
    id: "delivery",
    title: "Заберём и привезём",
    text: "Удобно в черте МКАД и пригородах",
  },
  {
    id: "guarantee",
    title: "Гарантия качества",
    text: "Если результат вас не устроит — исправим бесплатно",
  },
] as const;

export const faqItems: FaqItem[] = [
  {
    id: "price",
    question: "Сколько стоит чистка?",
    answer: "Прозрачная стоимость. Итоговая цена — после осмотра.",
  },
  {
    id: "exact",
    question: "Как узнать точную цену?",
    answer: "Оцените по фото: предварительная цена, заказ берём после осмотра.",
  },
  {
    id: "time",
    question: "Какие сроки выполнения?",
    answer: "Ответ на оценку — в течение 2–3 минут.",
  },
  {
    id: "stain",
    question: "Можно ли убрать любые пятна?",
    answer: "Покажите вещь — скажем, что можно сделать.",
  },
  {
    id: "guarantee",
    question: "Есть ли гарантия результата?",
    answer: "Если результат не устроит — исправим бесплатно.",
  },
  {
    id: "handover",
    question: "Как передать вещи?",
    answer: "Заберём и доставим. Пункт: г. Красноярск, ул. Мичурина, 2ж — ежедневно 10:00–20:00.",
  },
  {
    id: "repair",
    question: "Что делать со сложным ремонтом?",
    answer: "Напишите — ответим в мессенджере.",
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
