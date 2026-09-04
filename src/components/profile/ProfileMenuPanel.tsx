////////////////////////////////////////////////////////
//
// Пункты меню профиля: вход, ЛК и выход.
//
////////////////////////////////////////////////////////

import { accountCabinetHref } from "../../config/content";
import type { DemoUser } from "../../hooks/useDemoAuth";
import "./ProfileMenuPanel.css";

type Props = {
  user: DemoUser | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  className?: string;
};

/** Общий список действий профиля для шапки и нижнего дока. */
export function ProfileMenuPanel({ user, onLogin, onRegister, onLogout, className = "" }: Props) {
  const isLoggedIn = user !== null;

  return (
    <div className={`profile-menu${className ? ` ${className}` : ""}`} role="menu" aria-label="Меню профиля">
      {isLoggedIn ? (
        <>
          <p className="profile-menu__name">{user.name}</p>
          <a href={accountCabinetHref} className="profile-menu__item" role="menuitem">
            Войти в ЛК
          </a>
          <button
            type="button"
            className="profile-menu__item profile-menu__item--muted"
            role="menuitem"
            onClick={onLogout}
          >
            Выйти
          </button>
        </>
      ) : (
        <>
          <button type="button" className="profile-menu__item" role="menuitem" onClick={onLogin}>
            Войти
          </button>
          <button type="button" className="profile-menu__item" role="menuitem" onClick={onRegister}>
            Регистрация
          </button>
        </>
      )}
    </div>
  );
}
