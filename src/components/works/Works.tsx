////////////////////////////////////////////////////////
//
// Экран 03: примеры работ — превью и модалка «до / после».
//
////////////////////////////////////////////////////////

import { useEffect, useMemo, useRef, useState } from "react";
import { workFilters, works } from "../../config/content";
import type { WorkExample, WorkFilter } from "../../types";
import { WorkModal } from "./WorkModal";
import { WorkPreview } from "./WorkPreview";
import "./Works.css";

type Props = {
  onEvaluate: () => void;
};

/** Галерея работ: живое превью сравнения, полный слайдер — в модалке. */
export function Works({ onEvaluate }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [filter, setFilter] = useState<WorkFilter>("all");
  const [active, setActive] = useState<WorkExample | null>(null);
  const [live, setLive] = useState(false);

  const items = useMemo(() => {
    if (filter === "all") {
      return works;
    }
    return works.filter((item) => item.filter === filter);
  }, [filter]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }

    /** Линия движется, только пока сетка работ в кадре. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLive(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [items.length]);

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
      <ul
        ref={listRef}
        className={`works__list${live && active === null ? " is-live" : ""}`}
      >
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <button
              type="button"
              className="works__card"
              onClick={() => setActive(item)}
              aria-haspopup="dialog"
            >
              <WorkPreview before={item.before} after={item.after} />
              <span className="works__sr">Открыть сравнение: {item.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <WorkModal item={active} onClose={() => setActive(null)} onEvaluate={onEvaluate} />
    </section>
  );
}
