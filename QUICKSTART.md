# 🚀 Quick Start Guide - Muhurta Yatra Website

## Instant Launch (Choose One Method)

### Method 1: Python Script (Recommended) ⭐

```bash
./start_server.py
```

**Benefits:**
- Automatically opens your browser
- Finds available port if 8000 is busy
- Colorful terminal output
- Proper error handling

---

### Method 2: Bash Script

```bash
./start_server.sh
```

**Benefits:**
- Works on Linux/Mac
- Auto-detects Python/PHP
- Opens browser automatically

---

### Method 3: One-Line Python

```bash
python3 -m http.server 8000
```

Then manually open: **http://localhost:8000**

---

### Method 4: Using npm

```bash
npm start
```

(Runs the Python server via package.json script)

---

## First Time Setup

If you get "Permission denied", make scripts executable:

```bash
chmod +x start_server.py start_server.sh
```

## Stopping the Server

Press **Ctrl + C** in the terminal

## Common Issues

**Port 8000 already in use?**
- The Python script will auto-find another port
- Or manually use: `python3 -m http.server 8080`

**Python not found?**
- Install Python 3: `sudo apt install python3` (Linux)
- Or use the bash script which also tries PHP

**Browser doesn't open automatically?**
- Manually navigate to: http://localhost:8000

## What You'll See

✨ A beautiful travel website with:
- Auto-playing hero carousel
- Interactive navigation menus
- Responsive design (try resizing!)
- Smooth animations
- Contact form
- All tour packages organized

## Next Steps

1. **Add Your Content**
   - Replace placeholder images
   - Update contact information
   - Add founder profile photo

2. **Customize Colors**
   - Edit CSS variables in `styles.css`
   - Change the color palette to match your brand

3. **Deploy Online**
   - Upload to web hosting
   - Use Netlify/Vercel for free hosting
   - Configure domain name

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

---

**Happy Coding! 🎉**
