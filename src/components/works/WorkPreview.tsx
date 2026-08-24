////////////////////////////////////////////////////////
//
// Миниатюра работы: автосравнение «до / после» с движущейся линией.
//
////////////////////////////////////////////////////////

type Props = {
  before: string;
  after: string;
};

/** Кадр превью: чистый слой снизу, «до» сверху по clip-path. */
export function WorkPreview({ before, after }: Props) {
  return (
    <span className="works__shot">
      <img className="works__img works__img--after" src={after} alt="" loading="lazy" decoding="async" />
      <img className="works__img works__img--before" src={before} alt="" loading="lazy" decoding="async" />
      <span className="works__rule" aria-hidden="true">
        <span className="works__knob" />
      </span>
      <span className="works__hint">до / после</span>
    </span>
  );
}
