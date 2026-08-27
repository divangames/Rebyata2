////////////////////////////////////////////////////////
//
// Полный цикл деплоя для Windows: сборка Vite и папка deploy.
//
////////////////////////////////////////////////////////

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

/** Запускает npm-скрипт в корне проекта и пробрасывает код выхода */
function runNpm(scriptName) {
  const result = spawnSync(npmCmd, ["run", scriptName], {
    cwd: rootDir,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });

  if (result.error) {
    console.error("Не удалось запустить npm:", result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("");
console.log("============================================");
console.log(" Свои ребята — сборка для хостинга");
console.log("============================================");
console.log("");
console.log("[1/2] Production-сборка Vite ...");
runNpm("build");
console.log("");
console.log("[2/2] Папка deploy и архив ...");
runNpm("prepare:deploy");
console.log("");
console.log("Готово. Залейте содержимое папки deploy в корень сайта.");
console.log("");
