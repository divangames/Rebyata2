////////////////////////////////////////////////////////
//
// Шапка: чёрная, с горизонтальным SVG-логотипом.
//
////////////////////////////////////////////////////////

import { brand } from "../../config/content";
import { logos } from "../../config/logos";
import { MenuIcon } from "../icons/Icons";
import "./Header.css";

type Props = {
  onMenu: () => void;
  onHome: () => void;
};

/** Фиксированная чёрная шапка как на макете. */
export function Header({ onMenu, onHome }: Props) {
  return (
    <header className="header">
      <button type="button" className="header__logo" onClick={onHome} aria-label={brand.name}>
        <img src={logos.horizon} alt="" width="240" height="24" />
      </button>
      <button type="button" className="header__menu" onClick={onMenu} aria-label="Меню">
        <MenuIcon />
      </button>
    </header>
  );
}
