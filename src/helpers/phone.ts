////////////////////////////////////////////////////////
//
// Форматирование российского телефона для поля заявки.
//
////////////////////////////////////////////////////////

/** Оставляет только цифры номера. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Приводит ввод к маске +7 (xxx) xxx-xx-xx. */
export function formatRuPhone(value: string): string {
  let digits = digitsOnly(value);
  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }
  if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }
  digits = digits.slice(0, 11);
  const rest = digits.slice(1);
  if (rest.length === 0) {
    return "+7";
  }
  if (rest.length < 4) {
    return `+7 (${rest}`;
  }
  if (rest.length < 7) {
    return `+7 (${rest.slice(0, 3)}) ${rest.slice(3)}`;
  }
  if (rest.length < 9) {
    return `+7 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6)}`;
  }
  return `+7 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6, 8)}-${rest.slice(8, 10)}`;
}

/** Номер считается полным при 11 цифрах. */
export function isFullRuPhone(value: string): boolean {
  return digitsOnly(value).length === 11;
}
