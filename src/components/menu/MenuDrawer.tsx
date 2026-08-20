////////////////////////////////////////////////////////
//
// Боковое меню: якоря лендинга, контакты и оценка по фото.
//
////////////////////////////////////////////////////////

import { useEffect, type CSSProperties, type TransitionEvent } from "react";
import { footerNav } from "../../config/content";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { usePresence } from "../../hooks/usePresence";
import { CloseIcon } from "../icons/Icons";
import { MenuDrawerMeta } from "./MenuDrawerMeta";
import "./MenuDrawer.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onJump: (id: string) => void;
  onEvaluate: () => void;
};

const anchors = [
  { id: "hero", label: "Главная" },
  { id: "services", label: footerNav[0] },
  { id: "services", label: footerNav[1] },
  { id: "faq", label: footerNav[2] },
  { id: "contacts", label: footerNav[3] },
];

/** Выезжающая шторка навигации. */
export function MenuDrawer({ open, onClose, onJump, onEvaluate }: Props) {
  const tier = useDeviceTier();
  const { mounted, shown, reduced, onExitComplete } = usePresence(open);
  const rich = !reduced && tier !== "low";
  const frost = tier !== "low";

  useEffect(() => {
    if (shown || !mounted || reduced) {
      return;
    }

    const timer = window.setTimeout(onExitComplete, 420);
    return () => window.clearTimeout(timer);
  }, [shown, mounted, reduced, onExitComplete]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    /** Escape закрывает шторку с той же анимацией. */
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /** Закрывает меню и открывает форму оценки. */
  function handleEvaluate() {
    onClose();
    onEvaluate();
  }

  /** Снимает шторку, когда панель доехала вправо. */
  function handlePanelTransitionEnd(event: TransitionEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.propertyName !== "transform") {
      return;
    }
    onExitComplete();
  }

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`drawer${shown ? " is-shown" : ""}${rich ? " drawer--rich" : ""}${frost ? " drawer--frost" : ""}`}
      aria-hidden={!shown}
      inert={!shown ? true : undefined}
    >
      <button type="button" className="drawer__scrim" aria-label="Закрыть меню" onClick={onClose} />
      <aside
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        onTransitionEnd={handlePanelTransitionEnd}
      >
        <button type="button" className="drawer__close" onClick={onClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <p className="drawer__kicker">Меню</p>
        <nav className="drawer__nav">
          {anchors.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              type="button"
              className="drawer__item"
              style={{ "--drawer-i": String(index) } as CSSProperties}
              onClick={() => onJump(item.id)}
            >
              <span className="drawer__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="drawer__label">{item.label}</span>
            </button>
          ))}
        </nav>
        <MenuDrawerMeta onEvaluate={handleEvaluate} />
      </aside>
    </div>
  );
}
