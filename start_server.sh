#!/bin/bash

# Simple HTTP Server Launcher for Muhurta Yatra Website
# This script starts a local development server

PORT=8000
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Function to check if port is available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 1
    else
        return 0
    fi
}

# Find available port
while ! check_port $PORT; do
    echo -e "${YELLOW}⚠️  Port $PORT is in use, trying next port...${NC}"
    PORT=$((PORT + 1))
done

echo ""
echo "============================================================"
echo -e "${GREEN}✨ Muhurta Yatra - Development Server${NC}"
echo "============================================================"
echo -e "${CYAN}🌐 Server running at: http://localhost:$PORT${NC}"
echo -e "${YELLOW}📁 Serving files from: $SCRIPT_DIR${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop the server${NC}"
echo "============================================================"
echo ""

# Try to open the browser (works on most systems)
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:$PORT" 2>/dev/null &
elif command -v gnome-open > /dev/null; then
    gnome-open "http://localhost:$PORT" 2>/dev/null &
elif command -v open > /dev/null; then
    open "http://localhost:$PORT" 2>/dev/null &
fi

# Start the server based on what's available
if command -v python3 > /dev/null; then
    python3 -m http.server $PORT
elif command -v python > /dev/null; then
    python -m SimpleHTTPServer $PORT
elif command -v php > /dev/null; then
    php -S localhost:$PORT
else
    echo -e "${RED}❌ Error: No suitable server found (python3, python, or php required)${NC}"
    exit 1
fi

# Cleanup message when server stops
echo ""
echo "============================================================"
echo -e "${GREEN}✅ Server stopped successfully${NC}"
echo "============================================================"
echo ""
