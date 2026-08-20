////////////////////////////////////////////////////////
//
// Нижняя навигация PWA по скрину: 4 пункта.
//
////////////////////////////////////////////////////////

import type { ScreenId } from "../../types";
import { EvaluateIcon, HomeIcon, OrdersIcon, UserIcon } from "../icons/Icons";
import "./BottomNav.css";

type Props = {
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onEvaluate: () => void;
};

/** Нижний бар с главным действием «Оценить». */
export function BottomNav({ active, onNavigate, onEvaluate }: Props) {
  return (
    <nav className="dock" aria-label="Основная навигация">
      <button
        type="button"
        className={`dock__item${active === "home" ? " is-active" : ""}`}
        onClick={() => onNavigate("home")}
      >
        <HomeIcon />
        Главная
      </button>
      <button
        type="button"
        className={`dock__item${active === "orders" ? " is-active" : ""}`}
        onClick={() => onNavigate("orders")}
      >
        <OrdersIcon />
        Заказы
      </button>
      <button
        type="button"
        className="dock__item dock__item--cta"
        onClick={onEvaluate}
        aria-label="Оценить"
      >
        <EvaluateIcon />
      </button>
      <button
        type="button"
        className={`dock__item${active === "account" ? " is-active" : ""}`}
        onClick={() => onNavigate("account")}
      >
        <UserIcon />
        Профиль
      </button>
    </nav>
  );
}
