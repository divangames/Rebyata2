////////////////////////////////////////////////////////
//
// Десктопный профиль: круглая иконка и выпадающее меню.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import { cta } from "../../config/content";
import type { DemoUser } from "../../hooks/useDemoAuth";
import { UserIcon } from "../icons/Icons";
import "./HeaderProfileMenu.css";

type Props = {
  user: DemoUser | null;
  onLogin: () => void;
  onRegister: () => void;
  onEvaluate: () => void;
  onCourier: () => void;
  onLogout: () => void;
};

/** Круглая кнопка профиля с меню входа или быстрых действий. */
export function HeaderProfileMenu({
  user,
  onLogin,
  onRegister,
  onEvaluate,
  onCourier,
  onLogout,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const isLoggedIn = user !== null;

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

  /** Закрывает меню и вызывает действие. */
  function pick(action: () => void) {
    setOpen(false);
    action();
  }

  const label = isLoggedIn ? `Профиль: ${user.name}` : "Профиль: войти или зарегистрироваться";

  return (
    <div ref={rootRef} className={`header-profile${open ? " is-open" : ""}`}>
      <button
        type="button"
        className={`header-profile__trigger${isLoggedIn ? " is-auth" : ""}`}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {isLoggedIn ? (
          <span className="header-profile__initial" aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <UserIcon className="header-profile__icon" />
        )}
      </button>

      {open ? (
        <div className="header-profile__panel" role="menu" aria-label="Меню профиля">
          {isLoggedIn ? (
            <>
              <p className="header-profile__name">{user.name}</p>
              <button type="button" className="header-profile__item" role="menuitem" onClick={() => pick(onEvaluate)}>
                {cta.estimate}
              </button>
              <button type="button" className="header-profile__item" role="menuitem" onClick={() => pick(onCourier)}>
                {cta.courier}
              </button>
              <button
                type="button"
                className="header-profile__item header-profile__item--muted"
                role="menuitem"
                onClick={() => pick(onLogout)}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button type="button" className="header-profile__item" role="menuitem" onClick={() => pick(onLogin)}>
                Войти
              </button>
              <button type="button" className="header-profile__item" role="menuitem" onClick={() => pick(onRegister)}>
                Регистрация
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
