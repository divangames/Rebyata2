////////////////////////////////////////////////////////
//
// Блок «Как проходит оценка»: карточки шагов и очередь блеска номеров.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import { howSteps } from "../../config/content";
import "./How.css";

/** Три шага оценки: номер слева, заголовок и пояснение справа. */
export function How() {
  const listRef = useRef<HTMLOListElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }

    /** Блеск крутится только пока блок в кадре. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLive(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how band" id="how" aria-labelledby="how-title">
      <h2 id="how-title">Как проходит оценка</h2>
      <ol className={`how__list${live ? " is-live" : ""}`} ref={listRef}>
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
