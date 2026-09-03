////////////////////////////////////////////////////////
//
// Десктопное меню «+»: те же действия, что у нижней выпадашки.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import { EvaluateIcon } from "../icons/Icons";
import { QuickActionsPanel } from "../nav/QuickActionsPanel";
import "./HeaderQuickMenu.css";

type Props = {
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Выпадашка справа в шапке на экранах от 1024px. */
export function HeaderQuickMenu({ onEvaluate, onCourier }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    /** Escape и клик вне панели закрывают меню. */
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function onPointer(event: PointerEvent) {
      const node = rootRef.current;
      if (!node || node.contains(event.target as Node)) {
        return;
      }
      setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  /** Закрывает меню и открывает выбранную шторку. */
  function pick(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div ref={rootRef} className={`header-quick${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="header-quick__trigger"
        aria-label={open ? "Закрыть меню" : "Открыть действия"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <EvaluateIcon />
      </button>
      {open ? (
        <div className="header-quick__panel" role="dialog" aria-label="Быстрые действия">
          <QuickActionsPanel onEvaluate={() => pick(onEvaluate)} onCourier={() => pick(onCourier)} />
        </div>
      ) : null}
    </div>
  );
}
