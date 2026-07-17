// ===== PAGE NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');

function navigatePage(pageName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Add click listeners to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        navigatePage(pageName);
    });
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// ===== WHATSAPP INTEGRATION =====
const WHATSAPP_NUMBER = '6281234567890';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function openWhatsApp(message = '') {
    if (message) {
        window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        window.open(WHATSAPP_URL, '_blank');
    }
}

// WhatsApp buttons
const whatsappButtons = document.querySelectorAll('[id*="whatsapp"]');
whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        openWhatsApp('Halo, saya tertarik dengan produk Anda. Bisa tahu lebih lanjut?');
    });
});

// Product order buttons
const orderButtons = document.querySelectorAll('.product-buttons .btn-primary');
orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = btn.closest('.product-card').querySelector('h3').textContent;
        openWhatsApp(`Halo, saya tertarik memesan ${productName}. Bisa tahu harganya?`);
    });
});

// ===== PRODUCT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter products
        const filter = btn.dataset.filter;
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isOpen = faqItem.classList.contains('open');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item.open').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('open');
            }
        });
        
        // Toggle current FAQ
        faqItem.classList.toggle('open');
    });
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards and other elements
document.querySelectorAll('.product-card, .advantage-card, .value-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 31, 92, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 31, 92, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== BUTTON RIPPLE EFFECT =====
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// ===== ADD RIPPLE STYLES =====
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== FORM VALIDATION (if needed) =====
function validateForm(formData) {
    return Object.values(formData).every(value => value.trim() !== '');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Set home page as active by default
    navigatePage('home');
    
    // Add smooth transitions to all elements
    document.querySelectorAll('*').forEach(el => {
        if (!el.style.transition) {
            el.style.transition = 'all 0.3s ease';
        }
    });
    
    console.log('Website loaded successfully!');
});

// ===== UTILITY FUNCTIONS =====
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

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY =====
// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ===== EXPORT FUNCTIONS =====
window.navigatePage = navigatePage;
window.openWhatsApp = openWhatsApp;
