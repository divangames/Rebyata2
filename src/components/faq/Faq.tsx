////////////////////////////////////////////////////////
//
// Экран 05: аккордеон вопросов карточками и кнопки мессенджеров.
//
////////////////////////////////////////////////////////

import { useState } from "react";
import { cta, faqItems } from "../../config/content";
import { MessengerButtons } from "../messengers/MessengerButtons";
import { FaqItem } from "./FaqItem";
import "./Faq.css";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Блок «Отвечаем на вопросы»: список карточек и приглашение написать. */
export function Faq({ onEvaluate, onCourier }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  /** Открывает один вопрос, повторный клик закрывает. */
  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section className="faq band" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">
        Отвечаем
        <span className="faq__title-rest"> на вопросы</span>
      </h2>
      <ul className="faq__list">
        {faqItems.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={toggle}
            onEvaluate={onEvaluate}
            onCourier={onCourier}
          />
        ))}
      </ul>
      <div className="faq__help">
        <strong>Не нашли ответ?</strong>
        <p>Напишите нам — ответим в мессенджерах</p>
      </div>
      <p className="faq__write">{cta.writeVia}</p>
      <MessengerButtons pending className="faq__messengers" />
    </section>
  );
}
