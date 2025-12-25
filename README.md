# Muhurta Yatra - Travel Agency Website

A modern, culturally-rich travel agency website showcasing handcrafted journeys across India.

## 🌟 Features

- **Modern Design**: Clean, boutique aesthetic with Indian cultural elements
- **Responsive**: Mobile-first design that works on all devices
- **Interactive**: Hero carousel, dropdown menus, smooth animations
- **Bilingual**: English and Devanagari (Hindi/Marathi) support
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized loading and smooth interactions

## 📁 Project Structure

```
new-website/
├── index.html          # Main HTML file
├── styles.css          # Complete stylesheet
├── script.js           # JavaScript functionality
├── start_server.py     # Python server launcher
├── start_server.sh     # Bash server launcher
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Python Server (Recommended)

```bash
# Make the script executable (first time only)
chmod +x start_server.py

# Run the server
./start_server.py
```

Or simply:
```bash
python3 start_server.py
```

### Option 2: Bash Script

```bash
# Make the script executable (first time only)
chmod +x start_server.sh

# Run the server
./start_server.sh
```

### Option 3: Manual Python Server

```bash
# Navigate to the project directory
cd /home/sahil/Sahil/projects/new-website

# Start Python HTTP server
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Option 4: Direct File Open

Simply double-click `index.html` to open it in your default browser.
(Note: Some features may not work properly without a local server)

## 🎨 Color Palette

- **Primary**: `#D97757` (Terracotta Orange)
- **Secondary**: `#1B7A8E` (Deep Teal)
- **Accent Gold**: `#C9A961`
- **Accent Emerald**: `#2D6A4F`
- **Text**: `#4A4542` (Charcoal)

## 📋 Sections

1. **Header** - Sticky navigation with dropdown tour categories
2. **Hero** - Auto-playing carousel with bilingual taglines
3. **Tour Packages** - 6 featured package categories
4. **About** - Founder profile and certifications
5. **Services** - 5 key service offerings
6. **Trust Indicators** - Statistics and credibility markers
7. **Contact** - Beautiful contact form and information
8. **Footer** - Links, social media, and newsletter

## 🗺️ Tour Categories

### Spiritual Tours
- Indore, Ujjain, Mandu
- Vrindavan
- Dwaraka
- Kedarnath
- Haridwar, Rishikesh
- Odisha, Puri, Jagannath
- Rajasthan, Khatu Shyam
- Varanasi, Ayodhya

### Maharashtra Tours
- 3 Jyotirlinga
- Ashtavinayak
- Akkalkot - Pandharpur - Tuljapur
- Shirdi
- Saptashrungi
- Mahalakshmi

### Weekend Trips
- Alibag
- Konkan
- Mahabaleshwar
- Aurangabad - Ajanta Ellora
- Agra - Mathura

### 3 Nights 4 Days
- Kerala - Munnar
- Hampi - Badami
- Gokarna, Karwar, Murudeshwar
- Rishikesh

### Honeymoon Packages
- Kashmir
- Kerala
- Shimla - Manali
- Coorg Ooty
- Nainital

### Seasonal Tours
- Kashmir (Mar-Jun, Sep-Nov)
- Kerala (Jan-Mar, Aug-Dec)
- Himachal (Jan-Apr, Sep-Dec)
- Uttarakhand (Jan-Mar, Aug-Dec)
- Andaman (Jan-Mar, Sep-Dec)
- Rajasthan (Jan-Mar, Sep-Dec)
- Gujarat (All Year)
- Odisha (All Year)

## 📞 Contact Information

- **Email**: muhurtayatra@gmail.com
- **Phone**: +91 93266 10388
- **Instagram**: @muhurtayatra
- **Blog**: https://yatrawithprajakta.blogspot.com/

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript**: Vanilla JS (no frameworks)
- **Fonts**: Google Fonts (Poppins, Lato, Noto Sans Devanagari)
- **Icons**: Font Awesome 6.4.0
- **Animations**: AOS (Animate On Scroll)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ⚡ Performance

- Lazy loading support
- Optimized animations
- Debounced scroll events
- Efficient DOM manipulation
- Minimal external dependencies

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Skip to content link
- High contrast support
- Reduced motion support

## 🔧 Customization

### Changing Colors

Edit the CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #D97757;
    --secondary-color: #1B7A8E;
    /* ... more variables */
}
```

### Updating Content

All content is in `index.html`. Key sections to update:

- Hero carousel images and text
- Package cards and descriptions
- About section (add founder photo)
- Contact information
- Social media links

### Adding Real Images

Replace the Unsplash placeholder URLs with your own images:

```html
<!-- Find and replace URLs like this: -->
<img src="https://images.unsplash.com/..." alt="...">
<!-- With your own images: -->
<img src="images/your-photo.jpg" alt="...">
```

## 📝 Next Steps (Optional Enhancements)

- [ ] Add real tour photos
- [ ] Connect contact form to backend/email service
- [ ] Create individual tour detail pages
- [ ] Add booking system
- [ ] Implement testimonials section
- [ ] Add photo gallery
- [ ] Integrate social media feeds
- [ ] Add blog integration
- [ ] Implement SEO meta tags
- [ ] Add analytics (Google Analytics)
- [ ] Create sitemap.xml
- [ ] Add robots.txt

## 🐛 Troubleshooting

### Server won't start
- Check if port 8000 is already in use
- Try running with `sudo` (may be required on some systems)
- Use a different port: `python3 -m http.server 8080`

### Styles not loading
- Ensure `styles.css` is in the same directory as `index.html`
- Check browser console for errors (F12)
- Clear browser cache

### JavaScript not working
- Ensure `script.js` is in the same directory as `index.html`
- Check if AOS library loaded correctly
- Open browser console (F12) to see errors

### Images not loading
- Check internet connection (images use Unsplash CDN)
- Replace with local images for offline use

## 📄 License

Copyright © 2024 Muhurta Yatra. All rights reserved.

## 👨‍💻 Developer

Built with care for authentic travel experiences.

---

**Made with ❤️ for travelers seeking authentic Indian experiences**
