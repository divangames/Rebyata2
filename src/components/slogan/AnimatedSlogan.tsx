////////////////////////////////////////////////////////
//
// Рукописный слоган: прорисовка букв и подчёркивания.
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import { brand } from "../../config/content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./AnimatedSlogan.css";

type Props = {
  compact?: boolean;
  /** Строки фразы; по умолчанию слоган hero. */
  lines?: readonly string[];
  label?: string;
  /** Кистевое подчёркивание последней строки. */
  underline?: boolean;
  /** Внешний запуск, если анимацию синхронизирует родитель. */
  play?: boolean;
};

export const SLOGAN_LETTER_START_MS = 180;
export const SLOGAN_LETTER_STEP_MS = 42;

type SloganChar = {
  letter: string;
  index: number;
};

type SloganLine = {
  text: string;
  chars: SloganChar[];
  isLast: boolean;
};

/** Раскладывает строки слогана в буквы с общей задержкой анимации. */
function getSloganLines(source: readonly string[]): SloganLine[] {
  let charIndex = 0;

  return source.map((text, lineIndex, all) => {
    const chars = Array.from(text).map((letter) => {
      const index = charIndex;
      charIndex += 1;
      return { letter, index };
    });

    return {
      text,
      chars,
      isLast: lineIndex === all.length - 1,
    };
  });
}

/** Момент, когда заканчивается прорисовка букв и стартует черта. */
export function getSloganStrokeDelayMs(source: readonly string[]): number {
  const lastCharIndex = source.join("").length - 1;
  return SLOGAN_LETTER_START_MS + Math.max(lastCharIndex, 0) * SLOGAN_LETTER_STEP_MS + 120;
}

/** Анимирует рукописную фразу побуквенно. */
export function AnimatedSlogan({
  compact = false,
  lines: linesProp,
  label,
  underline = true,
  play: playProp,
}: Props) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLParagraphElement>(null);
  const [internalPlay, setInternalPlay] = useState(reduced);
  const controlled = playProp !== undefined;
  const play = reduced || (controlled ? playProp : internalPlay);
  const source = linesProp ?? brand.sloganLines;
  const lines = getSloganLines(source);
  const strokeDelayMs = getSloganStrokeDelayMs(source);

  useEffect(() => {
    if (controlled || reduced) {
      return;
    }
    const node = rootRef.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInternalPlay(false);
          requestAnimationFrame(() => setInternalPlay(true));
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controlled, reduced]);

  return (
    <p
      ref={rootRef}
      className={`slogan${compact ? " slogan--compact" : ""}${play ? " is-play" : ""}`}
      aria-label={label ?? brand.sloganFull}
    >
      {lines.map((line) => (
        <span key={line.text} className="slogan__line">
          {line.chars.map((item) => (
            <span
              key={`${line.text}-${item.index}`}
              className="slogan__char"
              style={{
                animationDelay: `${SLOGAN_LETTER_START_MS + item.index * SLOGAN_LETTER_STEP_MS}ms`,
              }}
            >
              {item.letter === " " ? "\u00a0" : item.letter}
            </span>
          ))}
          {underline && line.isLast ? (
            <span
              className="slogan__stroke"
              aria-hidden="true"
              style={{ animationDelay: `${strokeDelayMs}ms` }}
            >
              <svg viewBox="0 0 220 22" preserveAspectRatio="none">
                <path d="M3 8 C 42 18, 108 16, 217 6 L 217 8.8 C 108 20, 40 22, 3 14.5 Z" />
              </svg>
            </span>
          ) : null}
        </span>
      ))}
    </p>
  );
}
