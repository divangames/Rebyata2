////////////////////////////////////////////////////////
//
// Блок «Как проходит оценка»: вертикальный список карточек.
//
////////////////////////////////////////////////////////

import { howSteps } from "../../config/content";
import "./How.css";

/** Три шага оценки: номер, заголовок и пояснение. */
export function How() {
  return (
    <section className="how band" id="how" aria-labelledby="how-title">
      <h2 id="how-title">Как проходит оценка</h2>
      <ol className="how__list">
        {howSteps.map((step, index) => (
          <li className="how__card" key={step.title}>
            <span className="how__num" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="how__name">{step.title}</h3>
            <p className="how__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
