////////////////////////////////////////////////////////
//
// Определение телефона, ОС и режима установленного PWA.
//
////////////////////////////////////////////////////////

import type { MobileOs } from "../types";

type NavigatorStandalone = Navigator & { standalone?: boolean };

/** Уже открыто как приложение с рабочего стола. */
export function isStandalonePwa(): boolean {
  const standalone = window.matchMedia("(display-mode: standalone)").matches;
  const fullscreen = window.matchMedia("(display-mode: fullscreen)").matches;
  const iosHome = Boolean((navigator as NavigatorStandalone).standalone);
  return standalone || fullscreen || iosHome;
}

/** Узкий телефонный кадр: инструкция только здесь, не на десктопе. */
export function isPhoneViewport(): boolean {
  return window.matchMedia("(max-width: 63.99rem)").matches;
}

/** iPhone / iPod / iPadOS или Android по user agent и тачу. */
export function detectMobileOs(): MobileOs | null {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const touchPoints = navigator.maxTouchPoints ?? 0;
  const iphone = /iPhone|iPod/i.test(ua);
  const ipad = /iPad/i.test(ua) || (platform === "MacIntel" && touchPoints > 1);

  if (iphone || ipad) {
    return "ios";
  }

  if (/Android/i.test(ua)) {
    return "android";
  }

  return null;
}

/** Chrome / Firefox / Edge на iOS — без полноценной установки PWA. */
export function isIosInAppBrowser(): boolean {
  return /CriOS|FxiOS|EdgiOS|OPiOS/i.test(navigator.userAgent);
}
