@echo off
set "GDRIVE_ID=1L0yFiBC2SWbadtaC5ql3ztciqhrg3EYr"
set "TARGET_PATH=models\loras\sana\sana_zimage.safetensors"

echo [DOWNLOAD] Starting download for Sana Z-Image Lora...
echo [INFO] ID: %GDRIVE_ID%
echo [INFO] Target: %TARGET_PATH%

:: Use the managed python environment
if exist "backend\venv\Scripts\python.exe" (
    "backend\venv\Scripts\python.exe" scripts\fetch_model.py %GDRIVE_ID% "%TARGET_PATH%"
) else (
    echo [ERROR] Python environment not found. Please run install.bat first.
)

pause
