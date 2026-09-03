////////////////////////////////////////////////////////
//
// Соответствие категорий и преимуществ иконкам макета.
//
////////////////////////////////////////////////////////

import type { ComponentType } from "react";
import {
  BackpackIcon,
  BagIcon,
  CheckIcon,
  HeartIcon,
  MailIcon,
  MasterIcon,
  ShieldIcon,
  ShirtIcon,
  ShoeIcon,
  SparklesIcon,
  TruckIcon,
} from "./Icons";

type IconCmp = ComponentType<{ className?: string }>;

const categoryIcons: Record<string, IconCmp> = {
  shoes: ShoeIcon,
  bags: BagIcon,
  backpacks: BackpackIcon,
  other: ShirtIcon,
};

const advantageIcons: Record<string, IconCmp> = {
  chem: SparklesIcon,
  hand: MasterIcon,
  care: HeartIcon,
  agree: MailIcon,
  delivery: TruckIcon,
  guarantee: ShieldIcon,
};

/** Иконка категории первого экрана и карточек услуг. */
export function iconForCategory(id: string): IconCmp {
  return categoryIcons[id] ?? ShirtIcon;
}

/** Иконка пункта «Почему выбирают «Своих ребят»». */
export function iconForAdvantage(id: string): IconCmp {
  return advantageIcons[id] ?? CheckIcon;
}
