@echo off
setlocal

:: Define paths
set "BASE_DIR=%~dp0.."
set "BACKEND_DIR=%BASE_DIR%\backend"
set "COMFYUI_DIR=%BACKEND_DIR%\ComfyUI"
set "VENV_DIR=%BACKEND_DIR%\venv"

echo [SETUP] Checking directory structure...

:: Create backend directory if it doesn't exist
if not exist "%BACKEND_DIR%" (
    mkdir "%BACKEND_DIR%"
    echo [SETUP] Created backend directory.
)

:: Check for ComfyUI
if not exist "%COMFYUI_DIR%" (
    echo [SETUP] ComfyUI not found. Cloning from GitHub...
    git clone https://github.com/comfyanonymous/ComfyUI.git "%COMFYUI_DIR%"
) else (
    echo [SETUP] ComfyUI already exists. Skipping clone.
)

:: Check for Python Venv
if not exist "%VENV_DIR%" (
    echo [SETUP] Creating Python Virtual Environment...
    python -m venv "%VENV_DIR%"
)

:: Install Torch with CUDA support (Vital for NVIDIA GPUs)
echo [SETUP] Installing PyTorch (CUDA 12.1)...
call "%VENV_DIR%\Scripts\activate.bat"
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

:: Install Requirements
echo [SETUP] Installing other requirements...
pip install -r "%COMFYUI_DIR%\requirements.txt" --no-warn-script-location

echo.
echo [SETUP] ComfyUI setup complete!
echo [INFO] Environment located at: %VENV_DIR%
echo [INFO] ComfyUI located at: %COMFYUI_DIR%
echo.
pause
