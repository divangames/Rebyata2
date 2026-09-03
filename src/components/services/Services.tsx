////////////////////////////////////////////////////////
//
// Экран 02: белые карточки услуг на сером фоне секции.
//
////////////////////////////////////////////////////////

import { cta, services, servicesCopy } from "../../config/content";
import { Button } from "../button/Button";
import { ArrowIcon } from "../icons/Icons";
import { MessengerButtons } from "../messengers/MessengerButtons";
import "./Services.css";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
  onRequest: (title: string) => void;
};

/** Сетка услуг 2 колонки: фото, название, описание, цена. */
export function Services({ onEvaluate, onCourier, onRequest }: Props) {
  return (
    <section className="services band" id="services" aria-labelledby="services-title">
      <header className="services__head">
        <h2 id="services-title">{servicesCopy.title}</h2>
        <p>{servicesCopy.lead}</p>
      </header>

      <div className="services__grid">
        {services.map((item) => (
          <button
            key={item.id}
            type="button"
            className="services__card"
            aria-label={`${item.title}: ${item.price}`}
            onClick={() => onRequest(item.title)}
          >
            <span className="services__photo">
              <img src={item.image} alt="" loading="lazy" decoding="async" />
            </span>

            <span className="services__body">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="services__price">
                {item.price}
                <ArrowIcon className="services__arrow" />
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="services__actions">
        <Button onClick={onEvaluate}>{cta.estimate}</Button>
        <Button variant="secondary" onClick={onCourier}>
          {cta.courier}
        </Button>
        <p className="services__write">{cta.writeVia}</p>
        <MessengerButtons className="services__messengers" />
      </div>
    </section>
  );
}
