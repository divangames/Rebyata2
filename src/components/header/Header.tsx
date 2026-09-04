////////////////////////////////////////////////////////
//
// Шапка: на телефоне логотип и бургер, на десктопе — якоря и профиль.
//
////////////////////////////////////////////////////////

import { brand } from "../../config/content";
import { logos } from "../../config/logos";
import type { DemoUser } from "../../hooks/useDemoAuth";
import type { ScreenId } from "../../types";
import { MenuIcon } from "../icons/Icons";
import { HeaderProfileMenu } from "./HeaderProfileMenu";
import "./Header.css";
import "./HeaderProfileMenu.css";

type Props = {
  active: ScreenId;
  user: DemoUser | null;
  onMenu: () => void;
  onHome: () => void;
  onJump: (id: string) => void;
  onEvaluate: () => void;
  onCourier: () => void;
  onNavigate: (screen: ScreenId) => void;
  onAccountLogin: () => void;
  onAccountRegister: () => void;
  onLogout: () => void;
};

const desktopAnchors = [
  { id: "services", label: "Услуги" },
  { id: "works", label: "Работы" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
] as const;

/** Фиксированная чёрная шапка: мобильный и десктопный режимы. */
export function Header({
  active,
  user,
  onMenu,
  onHome,
  onJump,
  onEvaluate,
  onCourier,
  onNavigate,
  onAccountLogin,
  onAccountRegister,
  onLogout,
}: Props) {
  return (
    <header className="header">
      <div className="header__inner">
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
            className={`header__link header__link--profile${active === "account" ? " is-active" : ""}`}
            onClick={() => onNavigate("account")}
          >
            Профиль
          </button>
        </nav>
        <div className="header__actions">
          <HeaderProfileMenu
            user={user}
            onLogin={onAccountLogin}
            onRegister={onAccountRegister}
            onEvaluate={onEvaluate}
            onCourier={onCourier}
            onLogout={onLogout}
          />
        </div>
        <button type="button" className="header__menu" onClick={onMenu} aria-label="Меню">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
