////////////////////////////////////////////////////////
//
// Пути к фирменным SVG-логотипам.
//
////////////////////////////////////////////////////////

import { publicUrl } from "../helpers/publicUrl";

export const logos = {
  horizon: publicUrl("images/logo-horizon.svg"),
  vertical: publicUrl("images/logo-vertical.svg"),
  verticalDark: publicUrl("images/logo-vertical-dark.svg"),
} as const;
