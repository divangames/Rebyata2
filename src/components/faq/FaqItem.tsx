////////////////////////////////////////////////////////
//
// Карточка вопроса: рамка, плюс справа, раскрываемый ответ.
//
////////////////////////////////////////////////////////

import type { FaqAction, FaqItem as FaqItemData } from "../../types";
import { ArrowIcon, PlusIcon } from "../icons/Icons";
import "./FaqItem.css";

type Props = {
  item: FaqItemData;
  open: boolean;
  onToggle: (id: string) => void;
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Запускает действие внутри ответа FAQ. */
function runAction(action: FaqAction, onEvaluate: () => void, onCourier: () => void) {
  switch (action.kind) {
    case "evaluate":
      onEvaluate();
      return;
    case "courier":
      onCourier();
      return;
    default: {
      const unknown: never = action.kind;
      throw new Error(`Неизвестное действие FAQ: ${unknown}`);
    }
  }
}

/** Одна строка аккордеона в отдельной карточке. */
export function FaqItem({ item, open, onToggle, onEvaluate, onCourier }: Props) {
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
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {item.links && item.links.length > 0 ? (
            <p className="faq__links">
              {item.links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? ", " : null}
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
          {item.action ? (
            <button
              type="button"
              className="faq__action"
              onClick={() => runAction(item.action!, onEvaluate, onCourier)}
            >
              <span>{item.action.label}</span>
              <ArrowIcon />
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}
