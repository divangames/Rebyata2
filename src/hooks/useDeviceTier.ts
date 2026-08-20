////////////////////////////////////////////////////////
//
// Грубая оценка мощности устройства для облегчения эффектов.
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import type { DeviceTier } from "../types";

/** Определяет слабое устройство по ядрам, памяти и Save-Data. */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    const saveData = nav.connection?.saveData ?? false;
    const weak = cores <= 4 || memory <= 4 || saveData;
    setTier(weak ? "low" : "high");
  }, []);

  return tier;
}
