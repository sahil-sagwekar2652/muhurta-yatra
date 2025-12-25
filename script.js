// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeAOS();
    initializeNavigation();
    initializeHeroCarousel();
    initializeScrollEffects();
    initializeContactForm();
    initializeSmoothScroll();
});

// ==================== AOS ANIMATION ====================
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 50
        });
    }
}

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Scroll header effect
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu
            navMenu.classList.remove('show');

            // Handle dropdown toggle on mobile
            if (window.innerWidth <= 768) {
                const dropdown = link.closest('.dropdown');
                if (dropdown) {
                    e.preventDefault();
                    const isActive = dropdown.classList.contains('active');

                    // Close all dropdowns
                    dropdowns.forEach(d => d.classList.remove('active'));

                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                    }
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('show');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

// ==================== HERO CAROUSEL ====================
function initializeHeroCarousel() {
    const slides = document.querySelectorAll('.hero__slide');
    const dotsContainer = document.getElementById('hero-dots');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');

    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('hero__dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.hero__dot');

    // Go to specific slide
    function goToSlide(n) {
        // Remove active class from all slides and dots
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide
        currentSlide = n;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset autoplay
        resetAutoplay();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Pause on hover
    const heroCarousel = document.querySelector('.hero__carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopAutoplay);
        heroCarousel.addEventListener('mouseleave', startAutoplay);
    }

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    heroCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }

    // Start autoplay
    startAutoplay();

    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
}

// ==================== SCROLL EFFECTS ====================
function initializeScrollEffects() {
    const scrollTop = document.getElementById('scroll-top');

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 400) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });

    // Scroll to top
    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero section (optional enhancement)
    const heroSlides = document.querySelectorAll('.hero__slide');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        heroSlides.forEach(slide => {
            const img = slide.querySelector('.hero__img');
            if (img && scrolled < window.innerHeight) {
                img.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only handle internal anchor links
            if (href === '#' || href.startsWith('#!')) return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// ==================== CONTACT FORM ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const formInputs = contactForm.querySelectorAll('.form__input');

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Remove focus from inputs
                formInputs.forEach(input => input.blur());
            }, 1500);

            // In production, replace the setTimeout with actual form submission:
            /*
            fetch('/api/contact', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showNotification('Sorry, something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            */
        });
    }
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1.25rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }

        .notification--success {
            border-left: 4px solid #2D6A4F;
        }

        .notification--error {
            border-left: 4px solid #D97757;
        }

        .notification__content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }

        .notification__content i {
            font-size: 1.5rem;
            margin-top: 0.1rem;
        }

        .notification--success .notification__content i {
            color: #2D6A4F;
        }

        .notification--error .notification__content i {
            color: #D97757;
        }

        .notification__content p {
            flex: 1;
            margin: 0;
            color: #4A4542;
            line-height: 1.6;
        }

        .notification__close {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: none;
            border: none;
            color: #A8A5A0;
            font-size: 1rem;
            cursor: pointer;
            padding: 0.25rem;
            transition: color 0.3s ease;
        }

        .notification__close:hover {
            color: #4A4542;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @media screen and (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }
    `;

    // Add style to head if not already added
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }

    // Add to body
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==================== LAZY LOADING IMAGES ====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images have data-src attribute
if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyLoadImages();
}

// ==================== PERFORMANCE MONITORING ====================
// Log performance metrics (optional)
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Skip to main content
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#packages';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';

    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
        }
        .skip-link:focus {
            top: 0;
        }
    `;

    document.head.appendChild(style);
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add skip link for accessibility
addSkipLink();

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== PACKAGE CARD INTERACTIONS ====================
const packageCards = document.querySelectorAll('.package__card');

packageCards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(217, 119, 87, 0.3);
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        // Add ripple animation if not already added
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== CONSOLE BRANDING ====================
console.log('%c🌏 Muhurta Yatra', 'color: #D97757; font-size: 24px; font-weight: bold;');
console.log('%cHandcrafted with care | Explore India with us', 'color: #1B7A8E; font-size: 14px;');
console.log('%c✈️ Ready for your next adventure?', 'color: #4A4542; font-size: 12px;');
