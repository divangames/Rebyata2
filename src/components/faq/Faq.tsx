////////////////////////////////////////////////////////
//
// Экран 05: аккордеон вопросов карточками и CTA внизу.
//
////////////////////////////////////////////////////////

import { useState } from "react";
import { faqItems } from "../../config/content";
import { Button } from "../button/Button";
import { FaqItem } from "./FaqItem";
import "./Faq.css";

type Props = {
  onAsk: () => void;
};

/** Блок «Отвечаем на вопросы»: список карточек и приглашение написать. */
export function Faq({ onAsk }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  /** Открывает один вопрос, повторный клик закрывает. */
  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section className="faq band" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Отвечаем на вопросы</h2>
      <ul className="faq__list">
        {faqItems.map((item) => (
          <FaqItem key={item.id} item={item} open={openId === item.id} onToggle={toggle} />
        ))}
      </ul>
      <div className="faq__help">
        <strong>Не нашли ответ?</strong>
        <p>Напишите нам — ответим в мессенджерах</p>
      </div>
      <Button className="faq__cta" variant="secondary" onClick={onAsk}>
        Задать вопрос
      </Button>
    </section>
  );
}
