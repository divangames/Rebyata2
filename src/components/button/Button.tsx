////////////////////////////////////////////////////////
//
// Основная кнопка: зелёная CTA со слайдом текста и стрелки.
//
////////////////////////////////////////////////////////

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowIcon } from "../icons/Icons";
import "./Button.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
};

/** Фирменная кнопка с крупной зоной нажатия и переходом как у CTA. */
export function Button({
  variant = "primary",
  icon = <ArrowIcon />,
  children,
  className = "",
  type = "button",
  ...rest
}: Props) {
  return (
    <button type={type} className={`btn btn--${variant} ${className}`.trim()} {...rest}>
      <span className="btn__idle">
        <span className="btn__label">{children}</span>
        {icon}
      </span>
      <span className="btn__shift" aria-hidden="true">
        <span className="btn__label">{children}</span>
        {icon}
      </span>
    </button>
  );
}
