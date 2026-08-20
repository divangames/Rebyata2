////////////////////////////////////////////////////////
//
// Собирает папку deploy из Vite-сборки dist для обычного хостинга.
//
////////////////////////////////////////////////////////

import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const deployDir = join(rootDir, "deploy");
const zipPath = join(rootDir, "deploy.zip");
const htaccessSource = join(rootDir, "scripts", "hosting", "apache.htaccess");

/** Проверяет, что production-сборка Vite уже лежит в dist */
function assertBuildReady() {
  if (!existsSync(join(distDir, "index.html"))) {
    console.error("Не найден dist/index.html. Сначала выполните npm run build.");
    process.exit(1);
  }
}

/** Копирует dist в чистую папку deploy и добавляет .htaccess */
function copyBuildToDeploy() {
  rmSync(deployDir, { recursive: true, force: true });
  mkdirSync(deployDir, { recursive: true });
  cpSync(distDir, deployDir, { recursive: true });
  writeFileSync(join(deployDir, ".htaccess"), readFileSync(htaccessSource));
}

/** Упаковывает содержимое deploy, включая скрытый .htaccess */
function createZipArchive() {
  if (existsSync(zipPath)) {
    rmSync(zipPath);
  }

  execFileSync("tar.exe", ["-a", "-c", "-f", "deploy.zip", "-C", "deploy", "."], {
    cwd: rootDir,
    stdio: "inherit",
  });
}

assertBuildReady();
copyBuildToDeploy();

try {
  createZipArchive();
} catch {
  console.warn("Не удалось создать deploy.zip — папка deploy готова, архив можно собрать вручную.");
}

console.log("");
console.log("Готово. Папка для хостинга:");
console.log(deployDir);
if (existsSync(zipPath)) {
  console.log("Архив:");
  console.log(zipPath);
}
console.log("");
console.log("Залейте содержимое папки deploy в корень сайта (public_html, www, htdocs).");
console.log("Node.js на хостинге не нужен.");
