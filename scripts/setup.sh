#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting setup script..."

# --- 1. System Update ---
echo "--- System Update ---"
sudo apt update && sudo apt upgrade -y

# --- 2. Install Node.js and nvm ---
echo "--- Installing Node.js (via nvm) ---"
# Check if nvm is installed
if [ ! -d "$HOME/.nvm" ]; then
    echo "nvm not found, installing..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # Source nvm to make it available in the current shell
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
else
    echo "nvm is already installed."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi

# Install Node.js v22.22.0
if ! nvm list | grep -q "v22.22.0"; then
    echo "Installing Node.js v22.22.0..."
    nvm install v22.22.0
    nvm use v22.22.0
else
    echo "Node.js v22.22.0 is already installed."
    nvm use v22.22.0
fi

# --- 3. Install Python 3 ---
echo "--- Installing Python 3 ---"
if ! command -v python3 &> /dev/null; then
    echo "Python 3 not found, installing..."
    sudo apt install -y python3 python3-pip
else
    echo "Python 3 is already installed."
fi

# --- 4. Install CLI Tools ---
echo "--- Installing CLI Tools ---"

# GitHub CLI (gh)
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) not found, installing..."
    sudo apt install -y gh
else
    echo "GitHub CLI (gh) is already installed."
fi

# Git
if ! command -v git &> /dev/null; then
    echo "Git not found, installing..."
    sudo apt install -y git
else
    echo "Git is already installed."
fi

# Chromium
if ! command -v chromium &> /dev/null; then
    echo "Chromium not found, installing..."
    sudo apt install -y chromium
else
    echo "Chromium is already installed."
fi

# --- 5. Install npm Global Packages ---
echo "--- Installing npm Global Packages ---"

# Ensure nvm is sourced for npm commands
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v22.22.0 # Ensure the correct Node.js version is in use

NPM_PACKAGES="openclaw wrangler"

for package in $NPM_PACKAGES; do
    if ! npm list -g "$package" &> /dev/null; then
        echo "Installing npm global package: $package..."
        npm install -g "$package"
    else
        echo "npm global package '$package' is already installed."
    fi
done

# --- 6. Setup Telethon Python Virtual Environment ---
echo "--- Setting up Telethon Python Virtual Environment ---"
VENV_DIR="$HOME/tg-export-venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "Creating Python virtual environment at $VENV_DIR..."
    python3 -m venv "$VENV_DIR"
else
    echo "Virtual environment already exists at $VENV_DIR."
fi

echo "Activating virtual environment and installing Telethon..."
source "$VENV_DIR/bin/activate"

if ! pip list | grep -q "telethon"; then
    pip install telethon==1.42.0 # Install a specific version for consistency if needed, otherwise just 'telethon'
else
    echo "Telethon is already installed in the virtual environment."
fi
deactivate

# --- 7. Create OpenClaw Config Directories (if not exist) ---
echo "--- Creating OpenClaw config directories ---"
OPENCLAW_CONFIG_DIR="$HOME/.openclaw"
if [ ! -d "$OPENCLAW_CONFIG_DIR" ]; then
    echo "Creating $OPENCLAW_CONFIG_DIR directory..."
    mkdir -p "$OPENCLAW_CONFIG_DIR"
else
    echo "$OPENCLAW_CONFIG_DIR already exists."
fi

echo "Setup script finished.