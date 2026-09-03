////////////////////////////////////////////////////////
//
// Соответствие категорий и преимуществ иконкам макета.
//
////////////////////////////////////////////////////////

import type { ComponentType } from "react";
import {
  Flask,
  Hand,
  Handshake,
  Heart,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react";
import {
  BackpackIcon,
  BagIcon,
  CheckIcon,
  ShirtIcon,
  ShoeIcon,
} from "./Icons";

type IconCmp = ComponentType<{ className?: string }>;

const categoryIcons: Record<string, IconCmp> = {
  shoes: ShoeIcon,
  bags: BagIcon,
  backpacks: BackpackIcon,
  other: ShirtIcon,
};

const advantageIcons: Record<string, IconCmp> = {
  chem: Flask,
  hand: Hand,
  care: Heart,
  agree: Handshake,
  delivery: Truck,
  guarantee: ShieldCheck,
};

/** Иконка категории первого экрана и карточек услуг. */
export function iconForCategory(id: string): IconCmp {
  return categoryIcons[id] ?? ShirtIcon;
}

/** Иконка пункта «Почему выбирают «Своих ребят»». */
export function iconForAdvantage(id: string): IconCmp {
  return advantageIcons[id] ?? CheckIcon;
}
