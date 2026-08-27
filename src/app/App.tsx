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
import { RequestModal } from "../components/request/RequestModal";
import { AccountScreen, OrdersScreen } from "../components/screens/PwaScreens";
import { Services } from "../components/services/Services";
import { Works } from "../components/works/Works";
import { useDeviceTier } from "../hooks/useDeviceTier";
import type { ScreenId } from "../types";
import "./App.css";

/** Собирает посадочник и оболочки PWA. */
export function App() {
  const tier = useDeviceTier();
  const [screen, setScreen] = useState<ScreenId>("home");
  const [menu, setMenu] = useState(false);
  const [evaluate, setEvaluate] = useState(false);
  const [courier, setCourier] = useState(false);
  const [requestTitle, setRequestTitle] = useState<string | null>(null);

  const openEvaluate = useCallback(() => setEvaluate(true), []);
  const openCourier = useCallback(() => setCourier(true), []);
  const openRequest = useCallback((title: string) => setRequestTitle(title), []);

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

  return (
    <div className={`app app--${tier}`}>
      <Header
        active={screen}
        onMenu={() => setMenu(true)}
        onHome={goHome}
        onJump={jump}
        onEvaluate={openEvaluate}
        onNavigate={(next) => {
          setScreen(next);
          window.scrollTo({ top: 0 });
        }}
      />
      <main>
        {screen === "home" ? (
          <>
            <Hero onEvaluate={openEvaluate} onCourier={openCourier} />
            <How />
            <Services onEvaluate={openEvaluate} onCourier={openCourier} onRequest={openRequest} />
            <Works onEvaluate={openEvaluate} />
            <Advantages onEvaluate={openEvaluate} onCourier={openCourier} />
            <Faq />
            <Contacts onEvaluate={openEvaluate} onCourier={openCourier} onJump={jump} />
          </>
        ) : null}
        {screen === "orders" ? <OrdersScreen onEvaluate={openEvaluate} /> : null}
        {screen === "account" ? <AccountScreen onEvaluate={openEvaluate} /> : null}
      </main>
      <BottomNav
        active={screen}
        onNavigate={(next) => {
          setScreen(next);
          window.scrollTo({ top: 0 });
        }}
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
      <EvaluateSheet open={evaluate} onClose={() => setEvaluate(false)} />
      <CourierSheet open={courier} onClose={() => setCourier(false)} />
      <RequestModal
        open={requestTitle !== null}
        serviceTitle={requestTitle ?? ""}
        onClose={() => setRequestTitle(null)}
      />
    </div>
  );
}
