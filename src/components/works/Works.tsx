////////////////////////////////////////////////////////
//
// Экран 03: примеры работ — превью и модалка «до / после».
//
////////////////////////////////////////////////////////

import { useMemo, useState } from "react";
import { workFilters, works } from "../../config/content";
import type { WorkExample, WorkFilter } from "../../types";
import { WorkModal } from "./WorkModal";
import "./Works.css";

type Props = {
  onEvaluate: () => void;
};

/** Галерея работ: одна карточка на пример, сравнение — в модалке. */
export function Works({ onEvaluate }: Props) {
  const [filter, setFilter] = useState<WorkFilter>("all");
  const [active, setActive] = useState<WorkExample | null>(null);

  const items = useMemo(() => {
    if (filter === "all") {
      return works;
    }
    return works.filter((item) => item.filter === filter);
  }, [filter]);

  return (
    <section className="works band" id="works">
      <h2>Примеры работ</h2>
      <p className="works__sub">до и после наших забот</p>
      <div className="works__chips" role="tablist" aria-label="Фильтр примеров">
        {workFilters.map((chip) => (
          <button
            key={chip.id}
            type="button"
            role="tab"
            aria-selected={filter === chip.id}
            className={filter === chip.id ? "is-on" : ""}
            onClick={() => setFilter(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <ul className="works__list">
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <button
              type="button"
              className="works__card"
              onClick={() => setActive(item)}
              aria-haspopup="dialog"
            >
              <span className="works__shot">
                <img src={item.after} alt="" loading="lazy" decoding="async" />
                <span className="works__hint">до / после</span>
              </span>
              <span className="works__sr">Открыть сравнение: {item.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <WorkModal item={active} onClose={() => setActive(null)} onEvaluate={onEvaluate} />
    </section>
  );
}
