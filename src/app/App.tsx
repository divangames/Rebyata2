////////////////////////////////////////////////////////
//
// Корневое PWA-приложение: 6 экранов лендинга и вкладки.
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { Advantages } from "../components/advantages/Advantages";
import { Contacts } from "../components/contacts/Contacts";
import { CourierSheet } from "../components/courier/CourierSheet";
import { EvaluateSheet } from "../components/evaluate/EvaluateSheet";
import { Faq } from "../components/faq/Faq";
import { Header } from "../components/header/Header";
import { Hero } from "../components/hero/Hero";
import { How } from "../components/how/How";
import { MenuDrawer } from "../components/menu/MenuDrawer";
import { BottomNav } from "../components/nav/BottomNav";
import { PwaInstallSheet } from "../components/pwa/PwaInstallSheet";
import { RequestModal } from "../components/request/RequestModal";
import { AccountScreen, OrdersScreen } from "../components/screens/PwaScreens";
import { Services } from "../components/services/Services";
import { ThanksModal } from "../components/thanks/ThanksModal";
import { Works } from "../components/works/Works";
import { useDemoAuth } from "../hooks/useDemoAuth";
import { useDeviceTier } from "../hooks/useDeviceTier";
import { usePwaInstallPrompt } from "../hooks/usePwaInstallPrompt";
import type { ScreenId, ThanksKind } from "../types";
import "./App.css";

/** Собирает посадочник и оболочки PWA. */
export function App() {
  const tier = useDeviceTier();
  const pwaInstall = usePwaInstallPrompt();
  const auth = useDemoAuth();
  const [screen, setScreen] = useState<ScreenId>("home");
  const [accountMode, setAccountMode] = useState<"login" | "register">("login");
  const [menu, setMenu] = useState(false);
  const [evaluate, setEvaluate] = useState(false);
  const [courier, setCourier] = useState(false);
  const [requestTitle, setRequestTitle] = useState<string | null>(null);
  const [thanks, setThanks] = useState<ThanksKind | null>(null);

  const openEvaluate = useCallback(() => setEvaluate(true), []);
  const openCourier = useCallback(() => setCourier(true), []);
  const openRequest = useCallback((title: string) => setRequestTitle(title), []);

  /** Закрывает формы и показывает благодарность за обычную заявку. */
  const finishRequest = useCallback(() => {
    setRequestTitle(null);
    setCourier(false);
    setThanks("request");
  }, []);

  /** Закрывает оценку и показывает благодарность со сроком 15 минут. */
  const finishEvaluate = useCallback(() => {
    setEvaluate(false);
    setThanks("evaluate");
  }, []);

  /** Переход к секции лендинга. */
  const jump = useCallback((id: string) => {
    setScreen("home");
    setMenu(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  /** Возврат на главную. */
  const goHome = useCallback(() => {
    setScreen("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /** Переход в профиль с выбранным режимом авторизации. */
  const openAccount = useCallback((mode: "login" | "register") => {
    setAccountMode(mode);
    setScreen("account");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={`app app--${tier}`}>
      <Header
        active={screen}
        user={auth.user}
        onMenu={() => setMenu(true)}
        onHome={goHome}
        onJump={jump}
        onEvaluate={openEvaluate}
        onCourier={openCourier}
        onNavigate={(next) => {
          setScreen(next);
          window.scrollTo({ top: 0 });
        }}
        onAccountLogin={() => openAccount("login")}
        onAccountRegister={() => openAccount("register")}
        onLogout={auth.logout}
      />
      <main>
        {screen === "home" ? (
          <>
            <Hero onEvaluate={openEvaluate} onCourier={openCourier} />
            <How />
            <Services onEvaluate={openEvaluate} onCourier={openCourier} onRequest={openRequest} />
            <Works onEvaluate={openEvaluate} onCourier={openCourier} />
            <Advantages onEvaluate={openEvaluate} onCourier={openCourier} />
            <Faq onEvaluate={openEvaluate} onCourier={openCourier} />
            <Contacts onEvaluate={openEvaluate} onCourier={openCourier} onJump={jump} />
          </>
        ) : null}
        {screen === "orders" ? <OrdersScreen onEvaluate={openEvaluate} /> : null}
        {screen === "account" ? (
          <AccountScreen auth={auth} initialMode={accountMode} />
        ) : null}
      </main>
      <BottomNav
        active={screen}
        user={auth.user}
        onNavigate={(next) => {
          setScreen(next);
          window.scrollTo({ top: 0 });
        }}
        onAccountLogin={() => openAccount("login")}
        onAccountRegister={() => openAccount("register")}
        onLogout={auth.logout}
        onEvaluate={openEvaluate}
        onCourier={openCourier}
      />
      <MenuDrawer
        open={menu}
        onClose={() => setMenu(false)}
        onJump={jump}
        onEvaluate={openEvaluate}
        onCourier={openCourier}
      />
      <EvaluateSheet
        open={evaluate}
        onClose={() => setEvaluate(false)}
        onSuccess={finishEvaluate}
      />
      <CourierSheet open={courier} onClose={() => setCourier(false)} onSuccess={finishRequest} />
      <RequestModal
        open={requestTitle !== null}
        serviceTitle={requestTitle ?? ""}
        onClose={() => setRequestTitle(null)}
        onSuccess={finishRequest}
      />
      <ThanksModal open={thanks !== null} kind={thanks ?? "request"} onClose={() => setThanks(null)} />
      <PwaInstallSheet
        open={pwaInstall.open}
        os={pwaInstall.os}
        iosAltBrowser={pwaInstall.iosAltBrowser}
        canNativeInstall={pwaInstall.canNativeInstall}
        onDismiss={pwaInstall.dismiss}
        onInstallNative={() => {
          void pwaInstall.installNative();
        }}
      />
    </div>
  );
}
