@echo off
title NovelCraft — One-Click Launcher & Installer
color 0A

echo =======================================================================
echo    📖 NovelCraft — Tactile Outline Studio (Qwen2.5 + LoRA)
echo =======================================================================
echo.

set ROOT_DIR=%~dp0
cd /d "%ROOT_DIR%"

:: Step 1: Check & Setup Python Virtual Environment
if not exist "venv\Scripts\python.exe" (
    echo [1/3] Python virtual environment not found. Setting up venv...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Failed to create Python virtual environment. Please check Python installation.
        pause
        exit /b 1
    )
    echo [1/3] Upgrading pip and installing Python dependencies...
    venv\Scripts\python.exe -m pip install --upgrade pip
    venv\Scripts\pip install -r requirements.txt
    if errorlevel 1 (
        echo [WARNING] Dependencies installation had warnings/errors. Continuing...
    )
) else (
    echo [1/3] Python virtual environment verified!
)

:: Step 2: Check & Setup Frontend Node Modules
if not exist "frontend\node_modules" (
    echo [2/3] Frontend node_modules not found. Installing npm packages...
    cmd /c "cd /d "%ROOT_DIR%frontend" && npm install"
    if errorlevel 1 (
        echo [WARNING] npm install finished with warnings.
    )
) else (
    echo [2/3] Frontend dependencies verified!
)

:: Step 3: Launch Backend & Frontend Services
echo.
echo [3/3] Launching Backend & Frontend services...
echo.

:: Launch FastAPI Backend Server
start "NovelCraft Backend (FastAPI)" cmd /k "cd /d "%ROOT_DIR%backend" && "%ROOT_DIR%venv\Scripts\python.exe" -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

:: Launch Vite React Frontend Server
start "NovelCraft Frontend (Vite)" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

:: Wait 3 seconds then open browser
echo Waiting for servers to initialize...
timeout /t 4 /nobreak >nul

echo Opening NovelCraft Studio UI in default browser...
start http://localhost:5173

echo.
echo =======================================================================
echo   ✨ NovelCraft is running!
echo   • Frontend UI : http://localhost:5173
echo   • Backend API : http://localhost:8000
echo.
echo   Keep the terminal windows open while using the app.
echo =======================================================================
echo.
pause
