////////////////////////////////////////////////////////
//
// Блок «Почему выбирают «Своих ребят»»: список преимуществ.
//
////////////////////////////////////////////////////////

import { advantages, advantagesSection, cta } from "../../config/content";
import { Button } from "../button/Button";
import { iconForAdvantage } from "../icons/categoryMap";
import "./Advantages.css";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Вертикальный список: иконка в squircle, заголовок, пояснение и CTA. */
export function Advantages({ onEvaluate, onCourier }: Props) {
  return (
    <section className="adv band" id="about" aria-labelledby="adv-title">
      <h2 id="adv-title">{advantagesSection.title}</h2>
      <ul className="adv__list">
        {advantages.map((item) => {
          const Icon = iconForAdvantage(item.id);
          return (
            <li className="adv__item" key={item.id}>
              <span className="adv__icon" aria-hidden="true">
                <Icon />
              </span>
              <div className="adv__copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="adv__note">{advantagesSection.note}</p>
      <div className="adv__actions">
        <Button onClick={onEvaluate}>Получить оценку мастера</Button>
        <Button variant="secondary" onClick={onCourier}>
          {cta.courier}
        </Button>
      </div>
    </section>
  );
}
