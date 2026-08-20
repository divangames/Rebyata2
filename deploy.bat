@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules call npm install
call npm run build
echo Папка dist готова к загрузке на любой статический хостинг.
pause
