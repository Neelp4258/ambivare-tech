// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    handleLoadingScreen();
    initializeNavigation();
    initializeGallery();
    initializeTestimonials();
    initializeCounters();
    initializeSkillBars();
    initializeLightbox();
    initializeContactForm();
    initializeScrollEffects();
    initializeLikeButtons();
    initializeShareButtons();
}

// Loading Screen
function handleLoadingScreen() {
    const loader = document.querySelector('.loader');
    
    // Show loader for 3 seconds
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            // Remove loader from DOM after transition
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }, 3000);
}

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation highlighting
    highlightActiveSection();
}

// Gallery Functionality
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.querySelector('.gallery-load-more .btn');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulate loading more photos
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                showNotification('More photos loaded! This would typically load additional gallery items.', 'success');
                loadMoreBtn.textContent = 'Load More Photos';
                loadMoreBtn.style.opacity = '1';
            }, 1500);
        });
    }
}

// Testimonials Slider
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentTestimonial = 0;

    if (testimonialCards.length === 0) return;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialCards[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    // Button event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(skillBar => {
        skillObserver.observe(skillBar);
    });
}

// Lightbox Functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const viewButtons = document.querySelectorAll('.view-btn');

    // Open lightbox
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const galleryItem = button.closest('.gallery-item');
            const title = galleryItem.querySelector('.gallery-info h4').textContent;
            const description = galleryItem.querySelector('.gallery-info p').textContent;
            
            // Update lightbox content
            const lightboxTitle = lightbox.querySelector('.lightbox-info h4');
            const lightboxDesc = lightbox.querySelector('.lightbox-info p');
            
            if (lightboxTitle) lightboxTitle.textContent = title;
            if (lightboxDesc) lightboxDesc.textContent = description;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {};
    
    // Collect form data
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Validate required fields
    const requiredFields = e.target.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e53e3e';
            field.addEventListener('input', () => {
                field.style.borderColor = '#f0f0f0';
            }, { once: true });
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your inquiry! I\'ll get back to you within 24 hours to discuss your photography needs.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.gallery-item, .service-card, .contact-item, .footer-section');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
}

// Like Button Functionality
function initializeLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const heart = button.querySelector('i');
            
            if (heart.classList.contains('fas')) {
                heart.classList.remove('fas');
                heart.classList.add('far');
                button.style.color = 'white';
                showNotification('Removed from favorites', 'info');
            } else {
                heart.classList.remove('far');
                heart.classList.add('fas');
                button.style.color = '#ff6b6b';
                showNotification('Added to favorites', 'success');
                
                // Add heart animation
                button.style.animation = 'heartBeat 0.6s ease';
                setTimeout(() => {
                    button.style.animation = '';
                }, 600);
            }
        });
    });
}

// Share Button Functionality
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const galleryItem = button.closest('.gallery-item');
            const title = galleryItem.querySelector('.gallery-info h4').textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: 'Check out this amazing photograph by Elena Rodriguez',
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    showNotification('Link copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Unable to share. Please copy the URL manually.', 'error');
                });
            }
        });
    });
}

// Active Section Highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    const colors = {
        success: '#48bb78',
        error: '#e53e3e',
        info: '#667eea',
        warning: '#ed8936'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        line-height: 1.4;
        border-left: 4px solid rgba(255,255,255,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Parallax Effect for Hero Section
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && window.innerWidth > 768) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Service Card Hover Effects
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
}

// Gallery Item Staggered Animation
function staggerGalleryAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
}

// Keyboard Navigation for Gallery
function initializeKeyboardNavigation() {
    let currentFocus = 0;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentFocus < galleryItems.length - 1) {
            currentFocus++;
            galleryItems[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (e.key === 'ArrowLeft' && currentFocus > 0) {
            currentFocus--;
            galleryItems[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (e.key === 'Enter') {
            const viewBtn = galleryItems[currentFocus].querySelector('.view-btn');
            if (viewBtn) viewBtn.click();
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        enhanceServiceCards();
        staggerGalleryAnimation();
        initializeKeyboardNavigation();
        
        // Enable parallax on desktop only
        if (window.innerWidth > 768) {
            initializeParallax();
        }
    }, 3500); // After loading screen
});

// Handle window resize
window.addEventListener('resize', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});

// Add CSS animations
const additionalStyles = `
<style>
@keyframes heartBeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
    75% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.gallery-item:hover .gallery-actions .action-btn {
    animation: bounceIn 0.3s ease forwards;
}

.gallery-item:hover .gallery-actions .action-btn:nth-child(1) {
    animation-delay: 0.1s;
}

.gallery-item:hover .gallery-actions .action-btn:nth-child(2) {
    animation-delay: 0.2s;
}

.gallery-item:hover .gallery-actions .action-btn:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale(0.3);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.nav-link.active {
    color: #667eea !important;
}

.nav-link.active::after {
    width: 100% !important;
}

/* Mobile menu animation */
.nav-toggle.active .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

/* Loading animation improvements */
.loader-text span {
    opacity: 0;
    animation: letterDrop 1.5s infinite;
}

@keyframes letterDrop {
    0%, 40%, 100% {
        opacity: 0;
        transform: translateY(-20px);
    }
    20% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Smooth hover transitions */
.gallery-item,
.service-card,
.testimonial-card {
    will-change: transform;
}

/* Focus styles for accessibility */
.action-btn:focus,
.btn:focus,
.nav-link:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

/* Service card featured pulse */
.service-card.featured {
    animation: featuredPulse 3s infinite;
}

@keyframes featuredPulse {
    0%, 100% {
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    50% {
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles); 