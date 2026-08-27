////////////////////////////////////////////////////////
//
// Шторка: как сохранить PWA на рабочий стол (iPhone / Android).
//
////////////////////////////////////////////////////////

import { pwaInstall } from "../../config/content";
import { usePresence } from "../../hooks/usePresence";
import type { MobileOs } from "../../types";
import { Button } from "../button/Button";
import { CloseIcon, HomeIcon } from "../icons/Icons";
import { OverlayHost } from "../overlay/OverlayHost";
import { BellIcon, DotsMenuIcon, SaleTagIcon, ShareIosIcon } from "./PwaInstallIcons";
import "./PwaInstallSheet.css";

type Props = {
  open: boolean;
  os: MobileOs | null;
  iosAltBrowser: boolean;
  canNativeInstall: boolean;
  onDismiss: () => void;
  onInstallNative: () => void;
};

const benefitIcons = {
  push: BellIcon,
  sale: SaleTagIcon,
  home: HomeIcon,
} as const;

/** Иконка шага: шаринг на iOS, меню на Android. */
function StepGlyph({ os, index }: { os: MobileOs; index: number }) {
  if (index === 0) {
    return os === "ios" ? <ShareIosIcon /> : <DotsMenuIcon />;
  }
  if (index === 2) {
    return <HomeIcon />;
  }
  return <span className="pwa-install__n">{index + 1}</span>;
}

/** Список шагов под выбранную ОС. */
function stepsFor(os: MobileOs) {
  switch (os) {
    case "ios":
      return pwaInstall.ios.steps;
    case "android":
      return pwaInstall.android.steps;
    default: {
      const neverOs: never = os;
      return neverOs;
    }
  }
}

/** Бейдж «iPhone» / «Android». */
function badgeFor(os: MobileOs) {
  switch (os) {
    case "ios":
      return pwaInstall.ios.badge;
    case "android":
      return pwaInstall.android.badge;
    default: {
      const neverOs: never = os;
      return neverOs;
    }
  }
}

/** Нижний лист с инструкцией установки. */
export function PwaInstallSheet({
  open,
  os,
  iosAltBrowser,
  canNativeInstall,
  onDismiss,
  onInstallNative,
}: Props) {
  const { mounted, shown, onExitComplete } = usePresence(open);

  if (!mounted || !os) {
    return null;
  }

  const nativeAndroid = os === "android" && canNativeInstall;
  const steps = nativeAndroid ? [] : stepsFor(os);

  return (
    <OverlayHost open={mounted}>
    <div
      className={`pwa-install${shown ? " is-open" : ""}`}
      onTransitionEnd={onExitComplete}
    >
      <button type="button" className="pwa-install__scrim" aria-label="Закрыть" onClick={onDismiss} />
      <section
        className="pwa-install__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-install-title"
      >
        <button type="button" className="pwa-install__close" onClick={onDismiss} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <p className="pwa-install__badge">{badgeFor(os)}</p>
        <h2 id="pwa-install-title">{pwaInstall.title}</h2>
        <p className="pwa-install__lead">{nativeAndroid ? pwaInstall.nativeLead : pwaInstall.lead}</p>
        {iosAltBrowser ? <p className="pwa-install__note">{pwaInstall.ios.safariNote}</p> : null}
        <ul className="pwa-install__benefits">
          {pwaInstall.benefits.map((item) => {
            const Icon = benefitIcons[item.id];
            return (
              <li key={item.id}>
                <Icon />
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>
        {steps.length > 0 ? (
          <ol className="pwa-install__steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="pwa-install__glyph" aria-hidden="true">
                  <StepGlyph os={os} index={index} />
                </span>
                <span>
                  <strong>{step.title}</strong>
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
        <div className="pwa-install__actions">
          {nativeAndroid ? (
            <Button onClick={onInstallNative}>{pwaInstall.installCta}</Button>
          ) : (
            <Button onClick={onDismiss}>{pwaInstall.gotIt}</Button>
          )}
          <Button variant="ghost" icon={null} onClick={onDismiss}>
            {pwaInstall.later}
          </Button>
        </div>
      </section>
    </div>
    </OverlayHost>
  );
}
