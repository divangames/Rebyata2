////////////////////////////////////////////////////////
//
// Экраны PWA «Заказы» и «Профиль» без выдуманного контента.
//
////////////////////////////////////////////////////////

import { useEffect, useState, type FormEvent } from "react";
import { cta } from "../../config/content";
import type { DemoUser } from "../../hooks/useDemoAuth";
import { Button } from "../button/Button";
import "./PwaScreens.css";

type AuthApi = {
  user: DemoUser | null;
  login: (phone: string, password: string) => string | null;
  register: (user: DemoUser) => string | null;
  logout: () => void;
};

type OrdersProps = {
  onEvaluate: () => void;
};

type AccountProps = {
  auth: AuthApi;
  initialMode: "login" | "register";
  onEvaluate: () => void;
};

/** Список заказов: пустое состояние до первой оценки. */
export function OrdersScreen({ onEvaluate }: OrdersProps) {
  return (
    <section className="pwa-screen band">
      <h1>Заказы</h1>
      <p>Покажите вещь — скажем, что можно сделать.</p>
      <Button onClick={onEvaluate}>{cta.estimate}</Button>
    </section>
  );
}

/** Демо-личный кабинет: авторизация работает локально, без сервера. */
export function AccountScreen({ auth, initialMode, onEvaluate }: AccountProps) {
  const { user, login, register, logout } = auth;
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const changeMode = (next: "login" | "register") => {
    setMode(next);
    setError("");
    setNotice("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const phone = form.phone.trim();
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Введите корректный номер телефона.");
      return;
    }
    if (form.password.length < 6) {
      setError("Пароль должен быть не короче 6 символов.");
      return;
    }

    if (mode === "register") {
      const registerError = register({
        name: form.name.trim(),
        phone,
        password: form.password,
      });
      if (registerError) {
        setError(registerError);
        return;
      }
      setNotice("Профиль создан. Данные сохранены только в этом браузере.");
      return;
    }

    const loginError = login(phone, form.password);
    if (loginError) {
      setError(loginError);
      return;
    }
    setNotice("Вы вошли в профиль.");
  };

  const handleLogout = () => {
    logout();
    setForm({ name: "", phone: "", password: "" });
    setNotice("Вы вышли из профиля.");
  };

  if (user) {
    return (
      <section className="pwa-screen pwa-screen--account band">
        <div className="account-card account-card--welcome">
          <span className="account-avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span>
          <div>
            <p className="account-eyebrow">Ваш профиль</p>
            <h1>Привет, {user.name}!</h1>
            <p className="account-muted">{user.phone}</p>
          </div>
        </div>
        {notice ? <p className="account-notice" role="status">{notice}</p> : null}
        <div className="account-actions">
          <Button onClick={onEvaluate}>Оценить вещь</Button>
          <Button variant="light" onClick={handleLogout}>Выйти</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="pwa-screen pwa-screen--account band">
      <p className="account-eyebrow">Личный кабинет</p>
      <h1>{mode === "login" ? "С возвращением" : "Создайте профиль"}</h1>
      <p className="account-muted">{mode === "login" ? "Войдите, чтобы следить за заказами." : "Это займёт меньше минуты."}</p>

      <div className="account-tabs" role="tablist" aria-label="Авторизация">
        <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "is-active" : ""} onClick={() => changeMode("login")}>Войти</button>
        <button type="button" role="tab" aria-selected={mode === "register"} className={mode === "register" ? "is-active" : ""} onClick={() => changeMode("register")}>Регистрация</button>
      </div>

      <form className="account-form" onSubmit={submit} noValidate>
        {mode === "register" ? (
          <>
            <label>Имя<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Как к вам обращаться" autoComplete="name" /></label>
            <label>Телефон<input type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+7 900 000-00-00" autoComplete="tel" /></label>
          </>
        ) : null}
        {mode === "login" ? <label>Телефон<input type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+7 900 000-00-00" autoComplete="tel" /></label> : null}
        <label>Пароль<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Минимум 6 символов" autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
        {error ? <p className="account-error" role="alert">{error}</p> : null}
        {notice ? <p className="account-notice" role="status">{notice}</p> : null}
        <Button type="submit">{mode === "login" ? "Войти в профиль" : "Зарегистрироваться"}</Button>
      </form>
      <p className="account-footnote">Демо-режим: данные хранятся локально и не отправляются на сервер.</p>
    </section>
  );
}
