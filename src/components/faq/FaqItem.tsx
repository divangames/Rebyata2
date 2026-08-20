////////////////////////////////////////////////////////
//
// Карточка вопроса: рамка, плюс справа, раскрываемый ответ.
//
////////////////////////////////////////////////////////

import type { FaqItem as FaqItemData } from "../../types";
import { PlusIcon } from "../icons/Icons";

type Props = {
  item: FaqItemData;
  open: boolean;
  onToggle: (id: string) => void;
};

/** Одна строка аккордеона в отдельной карточке. */
export function FaqItem({ item, open, onToggle }: Props) {
  const panelId = `faq-panel-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <li className={open ? "faq__item is-open" : "faq__item"}>
      <button
        type="button"
        id={triggerId}
        className="faq__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onToggle(item.id)}
      >
        <span className="faq__question">{item.question}</span>
        <PlusIcon className="faq__plus" />
      </button>
      <div
        id={panelId}
        className="faq__panel"
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
      >
        <div className="faq__panel-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </li>
  );
}
