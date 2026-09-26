#!/bin/bash
echo "========================================================"
echo "  Setting up Virtual Environment for Novel Outline Generator"
echo "========================================================"

python3 -m venv venv
if [ $? -ne 0 ]; then
    echo "Error creating virtual environment. Please install python3-venv."
    exit 1
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Upgrading pip..."
pip install --upgrade pip

echo "Installing requirements..."
pip install -r requirements.txt

echo "========================================================"
echo "  Setup Complete! Activate using: source venv/bin/activate"
echo "========================================================"
