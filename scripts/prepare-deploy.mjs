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
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(rootDir, "dist");
const deployDir = join(rootDir, "deploy");
const apiDir = join(rootDir, "api");
const zipPath = join(rootDir, "deploy.zip");
const htaccessSource = join(rootDir, "scripts", "hosting", "apache.htaccess");

/** Проверяет, что production-сборка Vite уже лежит в dist */
function assertBuildReady() {
  if (!existsSync(join(distDir, "index.html"))) {
    console.error("Не найден dist/index.html. Сначала выполните npm run build.");
    process.exit(1);
  }
}

/** Удаляет папку, если Проводник ещё держит файлы — несколько попыток */
async function removeDirWithRetry(targetDir) {
  for (let attempt = 1; attempt <= 10; attempt += 1) {
    try {
      rmSync(targetDir, { recursive: true, force: true });
      return;
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error ? error.code : "";
      const retryable = code === "EBUSY" || code === "EPERM" || code === "ENOTEMPTY";
      if (!retryable || attempt === 10) {
        throw error;
      }

      await delay(300);
    }
  }
}

/** Копирует PHP API заявок (config.php — если есть локально). */
function copyApiToDeploy() {
  if (!existsSync(apiDir)) {
    return;
  }

  const targetApi = join(deployDir, "api");
  mkdirSync(targetApi, { recursive: true });
  cpSync(apiDir, targetApi, { recursive: true });
}

/** Копирует dist в чистую папку deploy, PHP API и .htaccess */
async function copyBuildToDeploy() {
  await removeDirWithRetry(deployDir);
  mkdirSync(deployDir, { recursive: true });
  cpSync(distDir, deployDir, { recursive: true });
  copyApiToDeploy();
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
await copyBuildToDeploy();

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
console.log("Для заявок в Telegram нужен PHP: папка api/ с config.php (образец — api/config.example.php).");
console.log("Node.js на хостинге не нужен.");
