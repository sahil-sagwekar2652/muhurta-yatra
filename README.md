# Travel Site

A modern, responsive travel website showcasing amazing destinations and travel packages.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Product Loading**: Products are loaded from JSON data
- **Product Details Page**: Individual product pages with detailed information
- **Modern UI**: Clean, attractive design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content

## Project Structure

```
travel-site/
├── index.html              # Homepage with featured destinations
├── product.html            # Individual product details page
├── data/
│   └── products.json       # Sample travel products data
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet with responsive design
│   └── js/
│       └── main.js         # JavaScript functionality
└── README.md               # Project documentation
```

## Getting Started

1. **Clone or download** this project to your local machine
2. **Open** `index.html` in a web browser
3. **Navigate** to different sections using the navigation menu
4. **Click** on any destination card to view detailed information
5. **Use** the back button on product pages to return to the homepage

## How It Works

### Homepage (`index.html`)
- Displays a hero section with call-to-action
- Shows featured destinations loaded from `products.json`
- Includes about and contact sections
- Responsive navigation menu

### Product Page (`product.html`)
- Loads product details based on URL parameter (`?id=product-id`)
- Displays comprehensive product information
- Shows package highlights and pricing
- Includes booking functionality (demo)

### Data Structure (`data/products.json`)
Each product includes:
- `id`: Unique identifier for URL routing
- `title`: Product name
- `description`: Detailed description
- `price`: Cost in USD
- `duration`: Trip length
- `image`: High-quality image URL
- `highlights`: Array of key features

### Styling (`assets/css/styles.css`)
- Mobile-first responsive design
- Modern CSS Grid and Flexbox layouts
- Smooth transitions and hover effects
- Professional color scheme
- Optimized for all screen sizes

### JavaScript (`assets/js/main.js`)
- Fetches and displays product data
- Handles product page routing
- Implements smooth scrolling
- Includes error handling
- Provides interactive features

## Customization

### Adding New Products
1. Open `data/products.json`
2. Add a new product object to the `products` array
3. Include all required fields: `id`, `title`, `description`, `price`, `duration`, `image`, `highlights`

### Modifying Styles
1. Edit `assets/css/styles.css`
2. Update colors, fonts, or layouts as needed
3. Test responsiveness across different devices

### Adding Features
1. Extend `assets/js/main.js` with new functionality
2. Update HTML files as needed
3. Test thoroughly across browsers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: No frameworks required
- **JSON**: Data storage and retrieval
- **Responsive Design**: Mobile-first approach

## Future Enhancements

- Backend integration for dynamic data
- User authentication and accounts
- Shopping cart functionality
- Payment processing
- Customer reviews and ratings
- Search and filtering capabilities
- Multi-language support

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@travelsite.com
- Phone: +1 (555) 123-4567
