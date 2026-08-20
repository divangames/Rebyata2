////////////////////////////////////////////////////////
//
// URL файлов из public с учётом базового пути (GitHub Pages).
//
////////////////////////////////////////////////////////

/** Собирает путь к статическому файлу относительно import.meta.env.BASE_URL */
export function publicUrl(path: string): string {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
