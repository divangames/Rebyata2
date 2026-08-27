////////////////////////////////////////////////////////
//
// Экран 05: аккордеон вопросов карточками и иконки мессенджеров.
//
////////////////////////////////////////////////////////

import { useState } from "react";
import { faqItems } from "../../config/content";
import { ContactsSocial } from "../contacts/ContactsSocial";
import { FaqItem } from "./FaqItem";
import "./Faq.css";

/** Блок «Отвечаем на вопросы»: список карточек и приглашение написать. */
export function Faq() {
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
          <FaqItem key={item.id} item={item} open={openId === item.id} onToggle={toggle} />
        ))}
      </ul>
      <div className="faq__help">
        <strong>Не нашли ответ?</strong>
        <p>Напишите нам — ответим в мессенджерах</p>
      </div>
      <div className="faq__social">
        <ContactsSocial pending />
      </div>
    </section>
  );
}
