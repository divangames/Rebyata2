////////////////////////////////////////////////////////
//
// Безопасная отправка целей в Яндекс.Метрику.
//
////////////////////////////////////////////////////////

const METRIKA_COUNTER_ID = 112778171;

type MetrikaWindow = Window & {
  ym?: (counterId: number, method: "reachGoal", target: string) => void;
};

/** Отправляет цель, если счётчик успел загрузиться. */
export function reachGoal(target: "lead-price" | "lead-courier"): void {
  (window as MetrikaWindow).ym?.(METRIKA_COUNTER_ID, "reachGoal", target);
}
