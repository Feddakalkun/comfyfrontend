@echo off
echo [UPDATE] Checking for ComfyFrontend updates...

:: Pull latest changes from git
git pull origin main

:: Update Frontend Dependencies
echo [UPDATE] Updating frontend dependencies...
call npm install

:: Update ComfyUI Backend Nodes
echo [UPDATE] Checking for new nodes...
cd scripts
python manage_nodes.py
cd ..

echo.
echo [SUCCESS] Update complete!
pause
