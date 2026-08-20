////////////////////////////////////////////////////////
//
// Первый экран: оффер, баннер и категории в одном блоке.
//
////////////////////////////////////////////////////////

import heroMain from "../../assets/HERO/main.png";
import { brand, categories } from "../../config/content";
import { logos } from "../../config/logos";
import { Button } from "../button/Button";
import { iconForCategory } from "../icons/categoryMap";
import { ArrowIcon } from "../icons/Icons";
import { AnimatedSlogan } from "../slogan/AnimatedSlogan";
import "./Hero.css";

type Props = {
  onEvaluate: () => void;
};

/** Экран 01: оффер и оценка по фото. */
export function Hero({ onEvaluate }: Props) {
  return (
    <section className="hero band" id="hero">
      <p className="hero__kicker">{brand.kicker}</p>
      <div className="hero__title-row">
        <h1 className="hero__logo">
          <img src={logos.vertical} alt={brand.name} width="320" height="110" />
        </h1>
        <AnimatedSlogan />
      </div>
      <p className="hero__lead">{brand.heroLead}</p>
      <figure className="hero__banner">
        <img
          src={heroMain}
          alt="Обувь, сумка и пуховик до и после ухода"
          width="1619"
          height="971"
        />
      </figure>
      <ul className="hero__cats" aria-label="С чем работаем">
        {categories.map((item) => {
          const Icon = iconForCategory(item.id);
          return (
            <li key={item.id}>
              <Icon />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
      <Button onClick={onEvaluate} icon={<ArrowIcon />}>
        Оценить по фото
      </Button>
    </section>
  );
}
