////////////////////////////////////////////////////////
//
// Выпадашка у «+»: оценка, курьер и мессенджеры.
//
////////////////////////////////////////////////////////

import { useEffect, type TransitionEvent } from "react";
import { cta } from "../../config/content";
import { usePresence } from "../../hooks/usePresence";
import { Button } from "../button/Button";
import { ContactsSocial } from "../contacts/ContactsSocial";
import "./DockFab.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Карточка действий над нижней панелью. */
export function DockFab({ open, onClose, onEvaluate, onCourier }: Props) {
  const { mounted, shown, reduced, onExitComplete } = usePresence(open);

  useEffect(() => {
    if (shown || !mounted || reduced) {
      return;
    }

    const timer = window.setTimeout(onExitComplete, 320);
    return () => window.clearTimeout(timer);
  }, [shown, mounted, reduced, onExitComplete]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /** Снимает карточку после анимации закрытия. */
  function handleCardTransitionEnd(event: TransitionEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.propertyName !== "transform" && event.propertyName !== "opacity") {
      return;
    }
    onExitComplete();
  }

  /** Закрывает меню и открывает выбранную шторку. */
  function pick(action: () => void) {
    onClose();
    action();
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className={`dock-fab${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
      <button type="button" className="dock-fab__scrim" aria-label="Закрыть меню" onClick={onClose} />
      <div
        className="dock-fab__card"
        role="dialog"
        aria-label="Быстрые действия"
        onTransitionEnd={handleCardTransitionEnd}
      >
        <Button onClick={() => pick(onEvaluate)}>
          {cta.estimate}
        </Button>
        <Button variant="light" icon={null} onClick={() => pick(onCourier)}>
          {cta.courier}
        </Button>
        <p className="dock-fab__write">{cta.writeVia}</p>
        <ContactsSocial onDark />
      </div>
    </div>
  );
}
