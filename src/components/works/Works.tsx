////////////////////////////////////////////////////////
//
// Экран 03: примеры работ — ряды-слайдеры и модалка «до / после».
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { workRows, worksSection } from "../../config/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useRepeatInView } from "../../hooks/useRepeatInView";
import type { WorkExample } from "../../types";
import { WorkCarousel } from "./WorkCarousel";
import { WorkModal } from "./WorkModal";
import "./Works.css";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Узкий экран: на нём показываем жест «можно свайпнуть». */
function usePhoneViewport(): boolean {
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 47.99rem)");
    const update = () => setPhone(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return phone;
}

/** Галерея по категориям: свайп ряда, полный разбор — в модалке. */
export function Works({ onEvaluate, onCourier }: Props) {
  const [active, setActive] = useState<WorkExample | null>(null);
  const reduced = useReducedMotion();
  const phone = usePhoneViewport();
  const { ref, visible } = useRepeatInView<HTMLElement>();
  const [hintReady, setHintReady] = useState(false);
  const phoneReady = visible && phone && !reduced;

  useEffect(() => {
    if (!phoneReady) {
      setHintReady(false);
      return;
    }
    const wait = window.setTimeout(() => setHintReady(true), 340);
    return () => window.clearTimeout(wait);
  }, [phoneReady]);

  return (
    <section ref={ref} className="works band" id="works">
      <header className="works__intro">
        <h2>{worksSection.title}</h2>
        <p className="works__sub">{worksSection.lead}</p>
        <p className="works__slider-hint">
          <span className="works__slider-hint-icon" aria-hidden="true">
            ↔
          </span>
          {worksSection.sliderHint}
        </p>
      </header>
      <div className="works__rows">
        {workRows.map((row, index) => (
          <section key={row.id} className="works__row" aria-labelledby={`works-${row.id}`}>
            <h3 id={`works-${row.id}`} className="works__kicker">
              {row.title}
            </h3>
            <WorkCarousel
              items={row.items}
              paused={active !== null}
              hint={index === 0 && hintReady}
              label={row.title}
              onOpen={setActive}
            />
          </section>
        ))}
      </div>
      <WorkModal
        item={active}
        onClose={() => setActive(null)}
        onEvaluate={onEvaluate}
        onCourier={onCourier}
      />
    </section>
  );
}
