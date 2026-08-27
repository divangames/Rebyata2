////////////////////////////////////////////////////////
//
// Портал оверлея: поверх viewport, без overflow/transform у .app.
//
////////////////////////////////////////////////////////

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import "./OverlayHost.css";

type Props = {
  open: boolean;
  children: ReactNode;
};

/** Рисует шторку в body и прижимает её к visualViewport (iOS, адресная строка). */
export function OverlayHost({ open, children }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

  useLayoutEffect(() => {
    const viewport = window.visualViewport;

    /** Совпадает с видимой областью окна, а не с layout viewport. */
    function pin() {
      const node = hostRef.current;
      if (!node) {
        return;
      }

      if (!viewport) {
        node.style.top = "0px";
        node.style.left = "0px";
        node.style.width = "100%";
        node.style.height = "100dvh";
        return;
      }

      node.style.top = `${viewport.offsetTop}px`;
      node.style.left = `${viewport.offsetLeft}px`;
      node.style.width = `${viewport.width}px`;
      node.style.height = `${viewport.height}px`;
    }

    pin();
    viewport?.addEventListener("resize", pin);
    viewport?.addEventListener("scroll", pin);
    window.addEventListener("resize", pin);

    return () => {
      viewport?.removeEventListener("resize", pin);
      viewport?.removeEventListener("scroll", pin);
      window.removeEventListener("resize", pin);
    };
  }, [open]);

  return createPortal(
    <div ref={hostRef} className="overlay-host" data-open={open ? "true" : "false"}>
      <div className="overlay-host__fill">{children}</div>
    </div>,
    document.body,
  );
}
