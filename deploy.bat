@echo off
REM Сборка статического сайта в папку deploy для обычного хостинга
chcp 65001 >nul
setlocal enableextensions
cd /d "%~dp0"

echo.
echo ============================================
echo  Свои ребята — сборка для хостинга
echo ============================================
echo.

where npm >nul 2>&1
if errorlevel 1 (
  echo Node.js / npm не найдены в PATH.
  echo Установите Node.js или откройте «Node.js command prompt» и запустите deploy.bat снова.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Установка зависимостей ...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install не удался.
    pause
    exit /b 1
  )
)

if exist "deploy" rmdir /s /q "deploy"
if exist "deploy.zip" del /q "deploy.zip"

echo [1/2] Production-сборка Vite ...
call npm run build
if errorlevel 1 (
  echo.
  echo Сборка не удалась. Исправьте ошибки выше и запустите deploy.bat снова.
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  echo.
  echo Не найден dist\index.html после сборки.
  pause
  exit /b 1
)

echo.
echo [2/2] Папка deploy и архив ...
call npm run prepare:deploy
if errorlevel 1 (
  echo.
  echo Не удалось собрать папку deploy.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  Готово
echo ============================================
echo  Папка:  %~dp0deploy\
if exist "deploy.zip" echo  Архив:  %~dp0deploy.zip
echo.
echo  Залейте содержимое deploy\ в корень сайта на хостинге.
echo ============================================
echo.

start "" explorer "%~dp0deploy"
pause
endlocal
