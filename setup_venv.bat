@echo off
echo ========================================================
echo   Setting up Virtual Environment for Novel Outline Generator
echo ========================================================

python -m venv venv
if %errorlevel% neq 0 (
    echo Error creating virtual environment. Ensure Python is installed.
    exit /b %errorlevel%
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing requirements...
pip install -r requirements.txt

echo ========================================================
echo   Setup Complete! Activate using: venv\Scripts\activate
echo ========================================================
