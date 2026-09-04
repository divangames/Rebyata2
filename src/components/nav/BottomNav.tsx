////////////////////////////////////////////////////////
//
// Нижняя навигация PWA: вкладки и «+» с выпадашкой.
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import type { DemoUser } from "../../hooks/useDemoAuth";
import type { ScreenId } from "../../types";
import { EvaluateIcon, HomeIcon, OrdersIcon, UserIcon } from "../icons/Icons";
import { DockFab } from "./DockFab";
import { DockProfile } from "./DockProfile";
import "./BottomNav.css";

type Props = {
  active: ScreenId;
  user: DemoUser | null;
  onNavigate: (screen: ScreenId) => void;
  onAccountLogin: () => void;
  onAccountRegister: () => void;
  onLogout: () => void;
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Нижний бар: вкладки и меню быстрых действий. */
export function BottomNav({
  active,
  user,
  onNavigate,
  onAccountLogin,
  onAccountRegister,
  onLogout,
  onEvaluate,
  onCourier,
}: Props) {
  const [fabOpen, setFabOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setFabOpen(false);
    setProfileOpen(false);
  }, [active]);

  /** Переключает выпадашку у плюса. */
  function toggleFab() {
    setProfileOpen(false);
    setFabOpen((open) => !open);
  }

  /** Переключает меню профиля. */
  function toggleProfile() {
    setFabOpen(false);
    setProfileOpen((open) => !open);
  }

  /** Уходит на вкладку и закрывает выпадашки. */
  function go(screen: ScreenId) {
    setFabOpen(false);
    setProfileOpen(false);
    onNavigate(screen);
  }

  const profileActive = profileOpen || active === "account";

  return (
    <>
      <nav
        className={`dock${fabOpen ? " is-fab-open" : ""}${profileOpen ? " is-profile-open" : ""}`}
        aria-label="Основная навигация"
      >
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
          className={`dock__item dock__item--profile${profileActive ? " is-active" : ""}${user ? " is-auth" : ""}`}
          onClick={toggleProfile}
          aria-label={profileOpen ? "Закрыть профиль" : "Открыть профиль"}
          aria-expanded={profileOpen}
          aria-haspopup="dialog"
        >
          {user ? (
            <span className="dock__profile-avatar" aria-hidden="true">
              {user.name.charAt(0).toUpperCase()}
            </span>
          ) : (
            <UserIcon />
          )}
          Профиль
        </button>
      </nav>
      <DockFab
        open={fabOpen}
        onClose={() => setFabOpen(false)}
        onEvaluate={onEvaluate}
        onCourier={onCourier}
      />
      <DockProfile
        open={profileOpen}
        user={user}
        onClose={() => setProfileOpen(false)}
        onLogin={onAccountLogin}
        onRegister={onAccountRegister}
        onLogout={onLogout}
      />
    </>
  );
}
