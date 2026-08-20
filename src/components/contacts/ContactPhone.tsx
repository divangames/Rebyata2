////////////////////////////////////////////////////////
//
// Телефон: ссылка tel:, если номер полный.
//
////////////////////////////////////////////////////////

import { contacts } from "../../config/content";
import { digitsOnly, isFullRuPhone } from "../../helpers/phone";

/** Показывает номер или открывает набор, когда маска заполнена. */
export function ContactPhone() {
  if (!isFullRuPhone(contacts.phone)) {
    return <strong>{contacts.phone}</strong>;
  }

  return (
    <a href={`tel:+${digitsOnly(contacts.phone)}`}>
      <strong>{contacts.phone}</strong>
    </a>
  );
}
