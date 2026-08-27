////////////////////////////////////////////////////////
//
// Миниатюры загруженных фото в шторке оценки.
//
////////////////////////////////////////////////////////

import { useEffect, useMemo } from "react";

type Props = {
  files: File[];
  onRemove: (index: number) => void;
};

/** Строит и освобождает превью для списка файлов. */
function useObjectUrls(files: File[]) {
  const urls = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );

  useEffect(() => {
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [urls]);

  return urls;
}

/** Сетка миниатюр: одно превью на каждый загруженный файл. */
export function EvaluateThumbs({ files, onRemove }: Props) {
  const urls = useObjectUrls(files);

  if (files.length === 0) {
    return null;
  }

  return (
    <ul className="sheet__thumbs" aria-label="Загруженные фото">
      {files.map((file, index) => (
        <li className="sheet__thumb" key={`${file.name}-${file.size}-${file.lastModified}-${index}`}>
          <img src={urls[index]} alt={file.name} />
          <button
            type="button"
            className="sheet__thumb-remove"
            onClick={() => onRemove(index)}
            aria-label={`Удалить фото ${index + 1}`}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
