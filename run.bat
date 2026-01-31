@echo off
setlocal

:: Define paths
set "BASE_DIR=%~dp0"
set "BACKEND_DIR=%BASE_DIR%backend"
set "COMFYUI_DIR=%BACKEND_DIR%\ComfyUI"
set "VENV_DIR=%BACKEND_DIR%\venv"

echo [RUN] Starting ComfyFrontend...

:: 1. Start ComfyUI Backend
if exist "%VENV_DIR%\Scripts\python.exe" (
    echo [RUN] Launching ComfyUI Backend...
    start "ComfyUI Backend" "%VENV_DIR%\Scripts\python.exe" "%COMFYUI_DIR%\main.py" --listen
) else (
    echo [ERROR] ComfyUI Backend not found. Please run install.bat first.
    pause
    exit /b
)

:: 2. Start Frontend UI
echo [RUN] Launching Frontend...
call npm run dev

pause
