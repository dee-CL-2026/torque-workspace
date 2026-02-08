# System Manifest - Chromebook Recovery

This document outlines the essential tools, runtimes, and configurations on this Chromebook, facilitating recovery or migration after a powerwash.

## Runtime

### Node.js
Version: v22.22.0
Install Command:
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc # or ~/.zshrc if using zsh
nvm install v22.22.0
nvm use v22.22.0
```

### Python 3
Version: Python 3.11.2
Install Command:
```bash
# Python 3 is usually pre-installed on Chromebooks (via Crostini)
# If not present, install via apt:
sudo apt update
sudo apt install python3
```

## CLI Tools

### npm Global Packages
```
/home/dieterwerwath/.config/nvm/versions/node/v22.22.0/lib
├── corepack@0.34.0
├── npm@10.9.4
└── openclaw@2026.2.6-3
```
Install Command (for OpenClaw, if not already installed):
```bash
npm install -g openclaw
```

### GitHub CLI (gh)
Version: gh version 2.23.0 (2023-02-27 Debian 2.23.0+dfsg1-1)
Install Command:
```bash
# Debian/Ubuntu
sudo apt update
sudo apt install gh
```

### Git
Version: git version 2.39.5
Install Command:
```bash
sudo apt update
sudo apt install git
```

### Chromium
Version: Chromium 144.0.7559.109 built on Debian GNU/Linux 12 (bookworm)
Install Command:
```bash
# Chromium is usually pre-installed on Chromebooks (via Crostini)
# If not present, install via apt:
sudo apt update
sudo apt install chromium
```

### Wrangler
Status: not installed
Install Command:
```bash
npm install -g wrangler
```

## Python/Venv

### pip3 Packages
```
Package     Version
----------- -------
cupshelpers 1.0
dbus-python 1.3.2
gyp         0.1
pip         23.0.1
pycairo     1.20.1
pycups      2.0.1
PyGObject   3.42.2
pysmbc      1.0.23
setuptools  66.1.1
six         1.16.0
wheel       0.38.4
```
Install Command:
```bash
# Install pip if not present
sudo apt install python3-pip
# Example for a specific package:
pip3 install telethon==1.42.0
```

### Telethon Venv Packages
```
_distutils_hack
distutils-precedence.pth
pip
pip-23.0.1.dist-info
pkg_resources
pyaes
pyaes-1.6.1.egg-info
pyasn1
pyasn1-0.6.2.dist-info
rsa
rsa-4.9.1.dist-info
setuptools
setuptools-66.1.1.dist-info
telethon
telethon-1.42.0.dist-info
```
Recovery Steps:
```bash
# Assuming Python 3 and pip are installed
mkdir ~/tg-export-venv
python3 -m venv ~/tg-export-venv
source ~/tg-export-venv/bin/activate
pip install telethon # and any other specific packages required for your Telethon setup
deactivate
```

## OpenClaw Config

### Environment Variables (`~/.openclaw/.env`)
```
BRAVE_API_KEY=********
```

### OpenClaw Config Files (`~/.openclaw/`)
```
agents
canvas
completions
credentials
cron
devic
identity
media
memory
openclaw.json
openclaw.json.bak
openclaw.json.bak.1
openclaw.json.bak.2
openclaw.json.bak.3
openclaw.json.bak.4
subagents
telegram
telegram-session.session
update-check.json
workspace
```
Recovery Steps:
```bash
# After installing OpenClaw globally via npm (see above)
# These files are typically generated on first run or by specific commands.
# Backup important config files if they contain custom settings.
cp -r ~/.openclaw/ ~/backup_openclaw_config/
```

## Recovery Steps

1.  **Re-enable Crostini (Linux Development Environment):** If powerwashed, enable Linux from your Chromebook's settings.
2.  **Update and Upgrade:**
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```
3.  **Install Node.js & nvm:** Follow the Node.js install command in the Runtime section.
4.  **Install OpenClaw:** Follow the npm global packages install command.
5.  **Install GitHub CLI (gh) & Git:** Follow the respective install commands.
6.  **Install Python `pip` packages:** Re-install any necessary pip packages (e.g., in a new virtual environment for Telethon).
7.  **Restore OpenClaw Configuration:** Copy backed-up OpenClaw config files from your preferred backup location to `~/.openclaw/`. Ensure sensitive environment variables are re-configured securely.

---
End of Document.
