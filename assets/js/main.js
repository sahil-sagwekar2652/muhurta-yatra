// Main JavaScript file for Travel Site

// Global variables
let products = [];
let currentSlide = 0;
let cardsPerView = 3; // Default for desktop
let totalSlides = 0;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
	// Check if we're on the product page
	if (window.location.pathname.includes('product.html')) {
		loadProductDetails();
	} else {
		// Load products on the main page
		loadProducts();
		// Initialize carousel after products are loaded
		setTimeout(initializeCarousel, 100);
	}

	// Add keyboard event listeners
	document.addEventListener('keydown', handleKeyboardNavigation);

	// Add resize event listener for responsive carousel
	window.addEventListener('resize', handleResize);

	// Start hero carousel autoplay
	startHeroCarousel();

	// Initialize footer functionality
	initializeFooter();
});

// Load products from JSON file
async function loadProducts() {
	try {
		const response = await fetch('data/products.json');
		const data = await response.json();
		products = data.products;
		displayProducts(products);
	} catch (error) {
		console.error('Error loading products:', error);
		displayError('Failed to load destinations. Please try again later.');
	}
}

// Display products on the main page
function displayProducts(productsList) {
	const container = document.getElementById('products-container');
	if (!container) return;

	if (productsList.length === 0) {
		container.innerHTML = '<p>No destinations available at the moment.</p>';
		return;
	}

	container.innerHTML = productsList.map(product => `
		<div class="product-card" onclick="goToProduct('${product.id}')" role="listitem" tabindex="0" aria-label="View details for ${product.title}">
			<img src="${product.image}" alt="${product.title} - ${product.description.substring(0, 100)}..." class="product-image" loading="lazy">
			<div class="product-content">
				<h3 class="product-title">${product.title}</h3>
				<p class="product-description">${product.description.substring(0, 120)}...</p>
				<div class="product-price" aria-label="Price: $${product.price.toLocaleString()}">$${product.price.toLocaleString()}</div>
				<div class="product-duration" aria-label="Duration: ${product.duration}">${product.duration}</div>
			</div>
		</div>
	`).join('');

	// Update total slides for carousel
	totalSlides = Math.ceil(productsList.length / cardsPerView);
}

// Navigate to product details page
function goToProduct(productId) {
	window.location.href = `product.html?id=${productId}`;
}

// Load product details based on URL parameter
async function loadProductDetails() {
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get('id');

	if (!productId) {
		displayError('No product ID provided.');
		return;
	}

	try {
		const response = await fetch('data/products.json');
		const data = await response.json();
		const product = data.products.find(p => p.id === productId);

		if (!product) {
			displayError('Product not found.');
			return;
		}

		displayProductDetails(product);
	} catch (error) {
		console.error('Error loading product details:', error);
		displayError('Failed to load product details. Please try again later.');
	}
}

// Display product details on the product page
function displayProductDetails(product) {
	const container = document.getElementById('product-details');
	if (!container) return;

	container.innerHTML = `
		<h1>${product.title}</h1>
		<img src="${product.image}" alt="${product.title} - ${product.description.substring(0, 150)}..." loading="lazy">
		<div class="description">${product.description}</div>
		<div class="price" aria-label="Price: $${product.price.toLocaleString()}">$${product.price.toLocaleString()}</div>
		<div class="duration" aria-label="Duration: ${product.duration}">Duration: ${product.duration}</div>
		${product.highlights ? `
			<div class="highlights">
				<h3>Package Highlights:</h3>
				<ul role="list" aria-label="Package highlights">
					${product.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
				</ul>
			</div>
		` : ''}
		<div class="booking-section">
			<button class="book-now-btn" onclick="bookNow('${product.id}')" aria-label="Book ${product.title} for $${product.price.toLocaleString()}">Book Now</button>
		</div>
	`;

	// Update page title
	document.title = `${product.title} - Muhurta Yatra`;
}

// Display error message
function displayError(message) {
	const container = document.getElementById('products-container') || document.getElementById('product-details');
	if (!container) return;

	container.innerHTML = `
        <div class="error-message">
            <h3>Oops! Something went wrong</h3>
            <p>${message}</p>
            <button onclick="location.reload()">Try Again</button>
        </div>
    `;
}

// Book now functionality
function bookNow(productId) {
	const product = products.find(p => p.id === productId);
	if (!product) {
		alert('Product not found!');
		return;
	}

	// In a real application, this would redirect to a booking form or external booking system
	alert(`Booking ${product.title} for $${product.price.toLocaleString()}\n\nThis would normally redirect to our booking system.`);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function (e) {
	if (e.target.matches('a[href^="#"]')) {
		e.preventDefault();
		const targetId = e.target.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
});

// Add loading states and error handling
function showLoading(elementId) {
	const element = document.getElementById(elementId);
	if (element) {
		element.innerHTML = '<div class="loading">Loading...</div>';
	}
}

// Add some basic form validation if needed
function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

// Add scroll-to-top functionality
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

// Add scroll-to-top button (optional enhancement)
function addScrollToTopButton() {
	const button = document.createElement('button');
	button.innerHTML = '↑';
	button.className = 'scroll-to-top';
	button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
		background: #d97706;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

	button.onclick = scrollToTop;
	document.body.appendChild(button);

	// Show/hide button based on scroll position
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 300) {
			button.style.display = 'block';
		} else {
			button.style.display = 'none';
		}
	});
}

// Initialize scroll-to-top button
addScrollToTopButton();

// Hero autoplay
function startHeroCarousel() {
	const slides = document.querySelectorAll('.hero-slide');
	let index = 0;
	setInterval(() => {
		slides[index].classList.remove('active');
		index = (index + 1) % slides.length;
		slides[index].classList.add('active');
	}, 3500);
}

// Carousel functionality
function initializeCarousel() {
	const carousel = document.getElementById('products-container');
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');
	const indicatorsContainer = document.getElementById('carousel-indicators');

	if (!carousel || !prevBtn || !nextBtn) return;

	// Set initial responsive layout
	updateCardsPerView();
	updateCarouselLayout();
	createIndicators();
	updateCarouselPosition();
	updateButtonStates();

	// Add event listeners
	prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
	nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

	// Add indicator click events
	if (indicatorsContainer) {
		indicatorsContainer.addEventListener('click', (e) => {
			if (e.target.classList.contains('indicator')) {
				const slideIndex = parseInt(e.target.dataset.slide);
				goToSlide(slideIndex);
			}
		});
	}
}

function updateCardsPerView() {
	const width = window.innerWidth;
	if (width <= 480) {
		cardsPerView = 1; // Mobile
	} else if (width <= 768) {
		cardsPerView = 2; // Tablet
	} else {
		cardsPerView = 3; // Desktop
	}

	// Recalculate total slides
	totalSlides = Math.ceil(products.length / cardsPerView);

	// Ensure current slide is within bounds
	if (currentSlide >= totalSlides) {
		currentSlide = Math.max(0, totalSlides - 1);
	}
}

function updateCarouselLayout() {
	const carousel = document.getElementById('products-container');
	if (!carousel) return;

	// Update CSS custom property for cards per view
	document.documentElement.style.setProperty('--cards-per-view', cardsPerView);
}

function createIndicators() {
	const indicatorsContainer = document.getElementById('carousel-indicators');
	if (!indicatorsContainer) return;

	indicatorsContainer.innerHTML = '';

	for (let i = 0; i < totalSlides; i++) {
		const indicator = document.createElement('button');
		indicator.className = 'indicator';
		indicator.dataset.slide = i;
		indicator.setAttribute('aria-label', `Go to slide ${i + 1} of ${totalSlides}`);
		indicator.setAttribute('aria-pressed', i === currentSlide ? 'true' : 'false');
		indicator.setAttribute('tabindex', '0');
		indicator.setAttribute('role', 'tab');
		indicatorsContainer.appendChild(indicator);
	}
}

function goToSlide(slideIndex) {
	if (slideIndex < 0 || slideIndex >= totalSlides) return;

	currentSlide = slideIndex;
	updateCarouselPosition();
	updateButtonStates();
	updateIndicators();
}

function updateCarouselPosition() {
	const carousel = document.getElementById('products-container');
	if (!carousel) return;

	const translateX = -(currentSlide * (100 / cardsPerView));
	carousel.style.transform = `translateX(${translateX}%)`;
}

function updateButtonStates() {
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');

	if (prevBtn) {
		prevBtn.disabled = currentSlide === 0;
		prevBtn.setAttribute('aria-disabled', currentSlide === 0);
	}

	if (nextBtn) {
		nextBtn.disabled = currentSlide >= totalSlides - 1;
		nextBtn.setAttribute('aria-disabled', currentSlide >= totalSlides - 1);
	}
}

function updateIndicators() {
	const indicators = document.querySelectorAll('.indicator');
	indicators.forEach((indicator, index) => {
		indicator.classList.toggle('active', index === currentSlide);
		indicator.setAttribute('aria-pressed', index === currentSlide ? 'true' : 'false');
	});
}

function handleKeyboardNavigation(e) {
	// Only handle keyboard navigation when not in form inputs
	if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');

	switch (e.key) {
		case 'ArrowLeft':
			e.preventDefault();
			if (prevBtn && !prevBtn.disabled) {
				prevBtn.click();
			}
			break;
		case 'ArrowRight':
			e.preventDefault();
			if (nextBtn && !nextBtn.disabled) {
				nextBtn.click();
			}
			break;
		case 'Home':
			e.preventDefault();
			goToSlide(0);
			break;
		case 'End':
			e.preventDefault();
			goToSlide(totalSlides - 1);
			break;
	}
}

function handleResize() {
	// Debounce resize events
	clearTimeout(window.resizeTimeout);
	window.resizeTimeout = setTimeout(() => {
		updateCardsPerView();
		updateCarouselLayout();
		createIndicators();
		updateCarouselPosition();
		updateButtonStates();
	}, 150);
}

// Footer functionality
function initializeFooter() {
	const newsletterForm = document.querySelector('.newsletter-form');

	if (newsletterForm) {
		newsletterForm.addEventListener('submit', handleNewsletterSubmit);
	}
}

function handleNewsletterSubmit(e) {
	e.preventDefault();
	const emailInput = e.target.querySelector('input[type="email"]');
	const email = emailInput.value.trim();

	if (email) {
		// In a real application, this would send the email to a server
		alert(`Thank you for subscribing with ${email}! You'll receive our travel tips and exclusive offers.`);
		emailInput.value = '';
	}
}
