@echo off
echo [INSTALL] Starting ComfyUI Frontend installation...

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v18 or newer and try again.
    pause
    exit /b
)

:: Install Frontend Dependencies
echo [INSTALL] Installing frontend dependencies...
call npm install

:: Setup ComfyUI Backend
echo [INSTALL] Setting up ComfyUI Backend...
cd scripts
call setup_comfy.bat
cd ..

echo.
echo [SUCCESS] Installation complete!
echo To start the app, run: npm run dev
echo.
pause
