@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules call npm install
echo.
echo Откроется http://127.0.0.1:5173/
echo Не используйте Network-адрес из консоли: VPN подменяет IP.
echo.
call npm run dev
if errorlevel 1 pause
