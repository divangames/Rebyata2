////////////////////////////////////////////////////////
//
// Экраны PWA «Заказы» и «Профиль» без выдуманного контента.
//
////////////////////////////////////////////////////////

import { Button } from "../button/Button";
import "./PwaScreens.css";

type Props = {
  onEvaluate: () => void;
};

/** Список заказов: пустое состояние до первой оценки. */
export function OrdersScreen({ onEvaluate }: Props) {
  return (
    <section className="pwa-screen band">
      <h1>Заказы</h1>
      <p>Покажите вещь — скажем, что можно сделать.</p>
      <Button onClick={onEvaluate}>Оценить по фото</Button>
    </section>
  );
}

/** Личный кабинет без дополнительных обещаний. */
export function AccountScreen({ onEvaluate }: Props) {
  return (
    <section className="pwa-screen band">
      <h1>Профиль</h1>
      <p>Напишите — ответим в мессенджере.</p>
      <Button onClick={onEvaluate}>Задать вопрос</Button>
    </section>
  );
}
