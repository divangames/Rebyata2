////////////////////////////////////////////////////////
//
// Демо-авторизация: локальное хранение профиля и сессии.
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";

export type DemoUser = {
  name: string;
  phone: string;
  password: string;
};

const userKey = "svoi-rebyata-demo-user";
const sessionKey = "svoi-rebyata-demo-session";

/** Читает сохранённый профиль из localStorage. */
function readStoredUser(): DemoUser | null {
  try {
    const saved = localStorage.getItem(userKey);
    return saved ? (JSON.parse(saved) as DemoUser) : null;
  } catch {
    return null;
  }
}

/** Проверяет, активна ли сессия входа в этом браузере. */
function hasActiveSession(): boolean {
  return sessionStorage.getItem(sessionKey) === "1";
}

/** Открывает сессию после успешного входа или регистрации. */
function startSession(): void {
  sessionStorage.setItem(sessionKey, "1");
}

/** Закрывает сессию, профиль в localStorage остаётся. */
function endSession(): void {
  sessionStorage.removeItem(sessionKey);
}

/** Демо-авторизация для шапки и экрана профиля. */
export function useDemoAuth() {
  const [user, setUser] = useState<DemoUser | null>(() => {
    const stored = readStoredUser();
    return stored && hasActiveSession() ? stored : null;
  });

  /** Проверяет телефон и пароль, возвращает текст ошибки или null. */
  const login = useCallback((phone: string, password: string): string | null => {
    const saved = readStoredUser();
    if (!saved) {
      return "Сначала зарегистрируйте демо-профиль.";
    }
    if (saved.phone !== phone || saved.password !== password) {
      return "Телефон или пароль не подошли.";
    }
    startSession();
    setUser(saved);
    return null;
  }, []);

  /** Создаёт профиль и сразу авторизует, возвращает текст ошибки или null. */
  const register = useCallback((data: DemoUser): string | null => {
    if (!data.name.trim()) {
      return "Введите имя.";
    }
    localStorage.setItem(userKey, JSON.stringify(data));
    startSession();
    setUser(data);
    return null;
  }, []);

  /** Завершает сессию без удаления сохранённого профиля. */
  const logout = useCallback(() => {
    endSession();
    setUser(null);
  }, []);

  return {
    user,
    isLoggedIn: user !== null,
    login,
    register,
    logout,
  };
}
