@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Локальный PHP для api/lead.php: http://127.0.0.1:8080/
echo Остановка: Ctrl+C
php -S 127.0.0.1:8080 -t .
