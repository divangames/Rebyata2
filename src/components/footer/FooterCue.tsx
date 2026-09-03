////////////////////////////////////////////////////////
//
// Рукописный акцент подвала: фраза, стрелка и мессенджеры.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { footerCue } from "../../config/content";
import { useDeviceTier } from "../../hooks/useDeviceTier";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { MessengerButtons } from "../messengers/MessengerButtons";
import { AnimatedSlogan, getSloganStrokeDelayMs } from "../slogan/AnimatedSlogan";
import "./FooterCue.css";

////////////////////////////////////////////////////////
//
// Стрелка
//
////////////////////////////////////////////////////////

/** Рукописная стрелка: сначала прорисовка, затем лёгкий жест вперёд. */
function CueArrow({ alive }: { alive: boolean }) {
  return (
    <span className={`footer-cue__arrow${alive ? " is-alive" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 92 34" fill="none">
        <path
          className="footer-cue__shaft"
          pathLength="1"
          d="M3 20 C 22 30, 48 8, 72 16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className="footer-cue__head"
          pathLength="1"
          d="M58 7 L 82 16 L 60 27"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

////////////////////////////////////////////////////////
//
// Блок
//
////////////////////////////////////////////////////////

/** Баннер в чёрном подвале: слоган ведёт к мессенджерам. */
export function FooterCue() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const rootRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(reduced);
  const [visible, setVisible] = useState(false);
  const alive = !reduced && tier !== "low";
  const arrowDelayMs = getSloganStrokeDelayMs(footerCue.handLines) + 180;

  useEffect(() => {
    if (reduced) {
      setPlay(true);
      setVisible(true);
      return;
    }

    const node = rootRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((entry) => entry.isIntersecting);
        setVisible(onScreen);
        if (onScreen) {
          setPlay(false);
          requestAnimationFrame(() => setPlay(true));
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={`footer-cue${play ? " is-drawn" : ""}${visible ? " is-visible" : ""}`}
      style={{ "--footer-arrow-delay": `${arrowDelayMs}ms` } as CSSProperties}
    >
      <AnimatedSlogan
        compact
        play={play}
        underline={false}
        lines={footerCue.handLines}
        label={footerCue.handFull}
      />
      <CueArrow alive={alive} />
      <MessengerButtons className="footer-cue__messengers messenger-buttons--panel" />
    </div>
  );
}
