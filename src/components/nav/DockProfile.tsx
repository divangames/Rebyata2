////////////////////////////////////////////////////////
//
// Выпадашка у «Профиль» в нижнем доке.
//
////////////////////////////////////////////////////////

import { useEffect, type TransitionEvent } from "react";
import type { DemoUser } from "../../hooks/useDemoAuth";
import { usePresence } from "../../hooks/usePresence";
import { ProfileMenuPanel } from "../profile/ProfileMenuPanel";
import { OverlayHost } from "../overlay/OverlayHost";
import "./DockProfile.css";

type Props = {
  open: boolean;
  user: DemoUser | null;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
};

/** Карточка профиля над нижней панелью. */
export function DockProfile({ open, user, onClose, onLogin, onRegister, onLogout }: Props) {
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

  /** Закрывает меню и вызывает действие. */
  function pick(action: () => void) {
    onClose();
    action();
  }

  if (!mounted) {
    return null;
  }

  return (
    <OverlayHost open={mounted}>
      <div className={`dock-profile${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
        <button type="button" className="dock-profile__scrim" aria-label="Закрыть меню профиля" onClick={onClose} />
        <div
          className="dock-profile__card"
          role="dialog"
          aria-label="Профиль"
          onTransitionEnd={handleCardTransitionEnd}
        >
          <ProfileMenuPanel
            user={user}
            onLogin={() => pick(onLogin)}
            onRegister={() => pick(onRegister)}
            onLogout={() => pick(onLogout)}
          />
        </div>
      </div>
    </OverlayHost>
  );
}
