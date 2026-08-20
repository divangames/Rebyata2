////////////////////////////////////////////////////////
//
// Ссылки на Яндекс.Карты для пункта приёма.
//
////////////////////////////////////////////////////////

type Point = {
  lat: number;
  lon: number;
  zoom: number;
  address: string;
};

/** Виджет карты для iframe (долгота, широта). */
export function yandexWidgetUrl({ lat, lon, zoom }: Point): string {
  const ll = `${lon},${lat}`;
  const params = new URLSearchParams({
    ll,
    z: String(zoom),
    pt: `${ll},pm2dn1`,
    l: "map",
  });
  return `https://yandex.ru/map-widget/v1/?${params.toString()}`;
}

/** Открывает ту же точку в приложении или на сайте карт. */
export function yandexMapsUrl({ lat, lon, zoom, address }: Point): string {
  const ll = `${lon},${lat}`;
  const params = new URLSearchParams({
    ll,
    z: String(zoom),
    pt: ll,
    text: address,
  });
  return `https://yandex.ru/maps/?${params.toString()}`;
}
