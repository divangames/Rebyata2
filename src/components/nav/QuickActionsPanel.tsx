////////////////////////////////////////////////////////
//
// Карточка быстрых действий: оценка, курьер и мессенджеры.
//
////////////////////////////////////////////////////////

import { cta } from "../../config/content";
import { Button } from "../button/Button";
import { MessengerButtons } from "../messengers/MessengerButtons";
import "./QuickActionsPanel.css";

type Props = {
  className?: string;
  onEvaluate: () => void;
  onCourier: () => void;
};

/** Общий блок для выпадашки у «+» и десктопного меню. */
export function QuickActionsPanel({ className = "", onEvaluate, onCourier }: Props) {
  return (
    <div className={`quick-actions${className ? ` ${className}` : ""}`}>
      <Button onClick={onEvaluate}>{cta.estimate}</Button>
      <Button variant="light" onClick={onCourier}>
        {cta.courier}
      </Button>
      <p className="quick-actions__write">{cta.writeVia}</p>
      <MessengerButtons className="messenger-buttons--panel" />
    </div>
  );
}
