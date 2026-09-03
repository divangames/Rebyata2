////////////////////////////////////////////////////////
//
// Нижняя навигация PWA: вкладки и «+» с выпадашкой.
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import type { ScreenId } from "../../types";
import { EvaluateIcon, HomeIcon, OrdersIcon, UserIcon } from "../icons/Icons";
import { DockFab } from "./DockFab";
import "./BottomNav.css";

type Props = {
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Нижний бар: вкладки и меню быстрых действий. */
export function BottomNav({ active, onNavigate, onEvaluate, onCourier }: Props) {
  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    setFabOpen(false);
  }, [active]);

  /** Переключает выпадашку у плюса. */
  function toggleFab() {
    setFabOpen((open) => !open);
  }

  /** Уходит на вкладку и закрывает выпадашку. */
  function go(screen: ScreenId) {
    setFabOpen(false);
    onNavigate(screen);
  }

  return (
    <>
      <nav className={`dock${fabOpen ? " is-fab-open" : ""}`} aria-label="Основная навигация">
        <button
          type="button"
          className={`dock__item${active === "home" ? " is-active" : ""}`}
          onClick={() => go("home")}
        >
          <HomeIcon />
          Главная
        </button>
        <button
          type="button"
          className={`dock__item${active === "orders" ? " is-active" : ""}`}
          onClick={() => go("orders")}
        >
          <OrdersIcon />
          Заказы
        </button>
        <button
          type="button"
          className={`dock__item dock__item--cta${fabOpen ? " is-open" : ""}`}
          onClick={toggleFab}
          aria-label={fabOpen ? "Закрыть меню" : "Открыть действия"}
          aria-expanded={fabOpen}
          aria-haspopup="dialog"
        >
          <EvaluateIcon />
        </button>
        <button
          type="button"
          className={`dock__item${active === "account" ? " is-active" : ""}`}
          onClick={() => go("account")}
        >
          <UserIcon />
          Профиль
        </button>
      </nav>
      <DockFab
        open={fabOpen}
        onClose={() => setFabOpen(false)}
        onEvaluate={onEvaluate}
        onCourier={onCourier}
      />
    </>
  );
}
