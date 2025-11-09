#!/bin/bash
echo "🧙‍♂️ Starting MAGICAL AI Store Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check and install dependencies
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${YELLOW}Installing $1...${NC}"
        pkg install -y $2
    else
        echo -e "${GREEN}✓ $1 installed${NC}"
    fi
}

# Check all dependencies
echo -e "${YELLOW}Checking dependencies...${NC}"
check_dependency node "nodejs"
check_dependency git "git"
check_dependency python "python"
check_dependency make "make"

# Fix Termux-specific path issues
export PATH=$PATH:$HOME/.local/bin

echo -e "${GREEN}🎉 Setup completed! Run 'pnpm dev' to launch your AI store!${NC}"
