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
  PufferIcon,
  ShieldIcon,
  ShirtIcon,
  ShoeIcon,
  SparklesIcon,
  SuitcaseIcon,
  TruckIcon,
} from "./Icons";

type IconCmp = ComponentType<{ className?: string }>;

const categoryIcons: Record<string, IconCmp> = {
  shoes: ShoeIcon,
  bags: BagIcon,
  backpacks: BackpackIcon,
  suitcases: SuitcaseIcon,
  puffer: PufferIcon,
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

/** Иконка пункта «Больше, чем просто чистка». */
export function iconForAdvantage(id: string): IconCmp {
  return advantageIcons[id] ?? CheckIcon;
}
