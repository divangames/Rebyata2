////////////////////////////////////////////////////////
//
// Шапка: на телефоне логотип и бургер, на десктопе — якоря и CTA.
//
////////////////////////////////////////////////////////

import { brand } from "../../config/content";
import { logos } from "../../config/logos";
import type { ScreenId } from "../../types";
import { Button } from "../button/Button";
import { MenuIcon } from "../icons/Icons";
import "./Header.css";

type Props = {
  active: ScreenId;
  onMenu: () => void;
  onHome: () => void;
  onJump: (id: string) => void;
  onEvaluate: () => void;
  onNavigate: (screen: ScreenId) => void;
};

const desktopAnchors = [
  { id: "services", label: "Услуги" },
  { id: "works", label: "Работы" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
] as const;

/** Фиксированная чёрная шапка: мобильный и десктопный режимы. */
export function Header({ active, onMenu, onHome, onJump, onEvaluate, onNavigate }: Props) {
  return (
    <header className="header">
      <button type="button" className="header__logo" onClick={onHome} aria-label={brand.name}>
        <img src={logos.horizon} alt="" width="240" height="24" />
      </button>
      <nav className="header__nav" aria-label="Разделы сайта">
        {desktopAnchors.map((item) => (
          <button key={item.id} type="button" className="header__link" onClick={() => onJump(item.id)}>
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className={`header__link${active === "orders" ? " is-active" : ""}`}
          onClick={() => onNavigate("orders")}
        >
          Заказы
        </button>
        <button
          type="button"
          className={`header__link${active === "account" ? " is-active" : ""}`}
          onClick={() => onNavigate("account")}
        >
          Профиль
        </button>
      </nav>
      <Button className="header__cta" onClick={onEvaluate}>
        Оценить по фото
      </Button>
      <button type="button" className="header__menu" onClick={onMenu} aria-label="Меню">
        <MenuIcon />
      </button>
    </header>
  );
}
