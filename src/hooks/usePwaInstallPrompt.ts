////////////////////////////////////////////////////////
//
// Показ инструкции PWA на телефоне, пока сайт не установлен.
//
////////////////////////////////////////////////////////

import { useCallback, useEffect, useState } from "react";
import {
  detectMobileOs,
  isIosInAppBrowser,
  isPhoneViewport,
  isStandalonePwa,
} from "../helpers/pwaPlatform";
import type { MobileOs } from "../types";

const STORAGE_KEY = "svoi-rebyata-pwa-prompt";
const SHOW_DELAY_MS = 650;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/** Читает отложенный показ из localStorage. */
function isSnoozed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return false;
    }
    const parsed = JSON.parse(raw) as { until?: number };
    return typeof parsed.until === "number" && Date.now() < parsed.until;
  } catch {
    return false;
  }
}

/** Прячет шторку на заданный срок. */
function snooze(ms: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ until: Date.now() + ms }));
  } catch {
    /* private mode */
  }
}

/** Состояние шторки установки: ОС, нативный prompt Chrome, закрытие. */
export function usePwaInstallPrompt() {
  const [os, setOs] = useState<MobileOs | null>(null);
  const [open, setOpen] = useState(false);
  const [iosAltBrowser, setIosAltBrowser] = useState(false);
  const [nativePrompt, setNativePrompt] = useState<PromptEvent | null>(null);

  useEffect(() => {
    if (isStandalonePwa() || !isPhoneViewport()) {
      return;
    }

    const detected = detectMobileOs();
    if (!detected || isSnoozed()) {
      return;
    }

    setOs(detected);
    setIosAltBrowser(detected === "ios" && isIosInAppBrowser());

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setNativePrompt(event as PromptEvent);
    };

    const onInstalled = () => {
      setOpen(false);
      snooze(365 * 24 * 60 * 60 * 1000);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /** Закрывает шторку и не показывает её неделю. */
  const dismiss = useCallback(() => {
    setOpen(false);
    snooze(SNOOZE_MS);
  }, []);

  /** Системный диалог Chrome на Android, если браузер его отдал. */
  const installNative = useCallback(async () => {
    if (!nativePrompt) {
      return;
    }
    await nativePrompt.prompt();
    const choice = await nativePrompt.userChoice;
    setNativePrompt(null);
    if (choice.outcome === "accepted") {
      setOpen(false);
      snooze(365 * 24 * 60 * 60 * 1000);
    }
  }, [nativePrompt]);

  return {
    open,
    os,
    iosAltBrowser,
    canNativeInstall: Boolean(nativePrompt),
    dismiss,
    installNative,
  };
}
