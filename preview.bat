@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist dist (
  echo Сначала соберите проект: build.bat
  pause
  exit /b 1
)
echo Предпросмотр: http://127.0.0.1:4173/
call npm run preview
