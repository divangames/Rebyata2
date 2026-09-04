////////////////////////////////////////////////////////
//
// Миниатюра работы: автосравнение «до / после» с движущейся линией.
//
////////////////////////////////////////////////////////

type Props = {
  image?: string;
  before?: string;
  after?: string;
};

/** Кадр превью: чистый слой снизу, «до» сверху по clip-path. */
export function WorkPreview({ image, before, after }: Props) {
  if (image) {
    return (
      <span className="works__shot">
        <img className="works__img" src={image} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  return (
    <span className="works__shot">
      <img className="works__img works__img--after" src={after ?? before ?? ""} alt="" loading="lazy" decoding="async" />
      <img className="works__img works__img--before" src={before ?? after ?? ""} alt="" loading="lazy" decoding="async" />
      <span className="works__rule" aria-hidden="true">
        <span className="works__line" />
        <span className="works__knob">
          <svg viewBox="0 0 32 32" width="32" height="32" focusable="false">
            <path d="M13 7 6 16l7 9" />
            <path d="M19 7l7 9-7 9" />
          </svg>
        </span>
      </span>
      <span className="works__hint">до / после</span>
    </span>
  );
}
