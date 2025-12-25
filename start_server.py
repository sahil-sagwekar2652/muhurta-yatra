#!/usr/bin/env python3
"""
Simple HTTP Server for Muhurta Yatra Website
Starts a local development server to view the website
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8080
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files from the correct directory"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom log format with colors
        print(f"\033[94m[Server]\033[0m {format % args}")


def find_available_port(start_port=8080, max_attempts=10):
    """Find an available port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as test_server:
                return port
        except OSError:
            continue
    return None


def main():
    # Change to the website directory
    os.chdir(DIRECTORY)

    # Find available port
    port = find_available_port(PORT)

    if port is None:
        print(f"\033[91m❌ Error: Could not find an available port\033[0m")
        sys.exit(1)

    # Create server
    try:
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            url = f"http://localhost:{port}"

            print("\n" + "="*60)
            print("\033[92m✨ Muhurta Yatra - Development Server\033[0m")
            print("="*60)
            print(f"\033[96m🌐 Server running at: {url}\033[0m")
            print(f"\033[93m📁 Serving files from: {DIRECTORY}\033[0m")
            print("\n\033[95mPress Ctrl+C to stop the server\033[0m")
            print("="*60 + "\n")

            # Open browser automatically
            print("\033[94m🚀 Opening browser...\033[0m\n")
            webbrowser.open(url)

            # Start server
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n\n" + "="*60)
        print("\033[92m✅ Server stopped successfully\033[0m")
        print("="*60 + "\n")
        sys.exit(0)
    except Exception as e:
        print(f"\n\033[91m❌ Error: {e}\033[0m\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
