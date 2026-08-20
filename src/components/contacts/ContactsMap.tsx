////////////////////////////////////////////////////////
//
// Интерактивная карта пункта: виджет Яндекса и кнопка «Открыть карту».
//
////////////////////////////////////////////////////////

import { contacts } from "../../config/content";
import { yandexMapsUrl, yandexWidgetUrl } from "../../helpers/maps";
import { useInView } from "../../hooks/useInView";
import { ExternalArrowIcon } from "./ContactIcons";

const point = {
  lat: contacts.map.lat,
  lon: contacts.map.lon,
  zoom: contacts.map.zoom,
  address: contacts.address,
};

/** Карта с ленивой загрузкой iframe; клик по всей области открывает Яндекс.Карты. */
export function ContactsMap() {
  const { ref, visible } = useInView<HTMLDivElement>();
  const widget = yandexWidgetUrl(point);
  const maps = yandexMapsUrl(point);

  return (
    <div ref={ref} className="contacts__map">
      {visible ? (
        <iframe
          className="contacts__map-frame"
          title={`Карта: ${contacts.address}`}
          src={widget}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
        />
      ) : (
        <div className="contacts__map-frame" aria-hidden="true" />
      )}
      <a className="contacts__map-cover" href={maps} target="_blank" rel="noreferrer">
        <span className="contacts__map-open">
          <ExternalArrowIcon />
          {contacts.mapOpenLabel}
        </span>
      </a>
    </div>
  );
}
