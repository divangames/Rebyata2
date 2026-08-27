@echo off
REM Wrapper: UTF-8 Russian text inside IF (...) breaks cmd.exe parsing.
setlocal
cd /d "%~dp0"
set "PATH=%ProgramFiles%\nodejs;%LOCALAPPDATA%\Programs\nodejs;%PATH%"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found in PATH.
  echo Install Node.js from https://nodejs.org and run deploy.bat again.
  pause
  exit /b 1
)

node scripts\deploy.mjs
if errorlevel 1 (
  echo.
  echo Deploy failed. See messages above.
  pause
  exit /b 1
)

echo Folder: %~dp0deploy
if exist "%~dp0deploy.zip" echo Zip: %~dp0deploy.zip
echo.
pause
endlocal
