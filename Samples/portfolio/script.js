// Alex Morgan Portfolio - Interactive JavaScript

// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const customCursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const counters = document.querySelectorAll('.counter');
const skillBars = document.querySelectorAll('.skill-progress');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialBtns = document.querySelectorAll('.testimonial-btn');
const contactForm = document.querySelector('.contact-form');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start animations after loading
            initAnimations();
        }, 500);
    }, 1500);
});

// Custom Cursor
let cursorX = 0;
let cursorY = 0;
let cursorOutlineX = 0;
let cursorOutlineY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
});

function animateCursorOutline() {
    cursorOutlineX += (cursorX - cursorOutlineX) * 0.1;
    cursorOutlineY += (cursorY - cursorOutlineY) * 0.1;
    
    cursorOutline.style.left = cursorOutlineX + 'px';
    cursorOutline.style.top = cursorOutlineY + 'px';
    
    requestAnimationFrame(animateCursorOutline);
}

animateCursorOutline();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

// Mobile Navigation
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate lines
        const lines = navToggle.querySelectorAll('.line');
        if (navToggle.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            const lines = navToggle.querySelectorAll('.line');
            lines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated Counters
function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 60;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Skill bars animation
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations
            if (entry.target.querySelector('.counter')) {
                animateCounters();
            }
            
            if (entry.target.querySelector('.skill-progress')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
function initAnimations() {
    const animatedElements = document.querySelectorAll('.hero-text, .about-stats, .about-skills, .service-card, .portfolio-item, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Portfolio Filtering
if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Portfolio hover effects
portfolioItems.forEach(item => {
    const overlay = item.querySelector('.portfolio-overlay');
    
    item.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(20px)';
    });
});

// Testimonials Slider
let currentTestimonial = 0;

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

// Testimonial navigation
testimonialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('next')) {
            nextTestimonial();
        } else {
            prevTestimonial();
        }
    });
});

// Auto-play testimonials
setInterval(nextTestimonial, 5000);

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Project Subject"]').value;
        const service = contactForm.querySelector('select').value;
        const budget = contactForm.querySelector('input[placeholder="Budget Range"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !subject || !service || !budget || !message) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification(`Thank you ${name}! Your message has been sent. I'll get back to you within 24 hours.`, 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Service card interactions
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        showNotification(`Interested in ${serviceName}? Let's discuss your project!`, 'info');
        
        // Scroll to contact form
        setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill service selection
                setTimeout(() => {
                    const serviceSelect = contactForm.querySelector('select');
                    if (serviceSelect) {
                        const optionValue = serviceName.toLowerCase().replace(/[^a-z]/g, '-');
                        const option = serviceSelect.querySelector(`option[value*="${optionValue.split('-')[0]}"]`);
                        if (option) {
                            serviceSelect.value = option.value;
                        }
                    }
                }, 500);
            }
        }, 1000);
    });
});

// Portfolio item interactions
portfolioItems.forEach(item => {
    const links = item.querySelectorAll('.portfolio-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const projectName = item.querySelector('h4').textContent;
            const icon = link.querySelector('i');
            
            if (icon.classList.contains('fa-eye')) {
                showNotification(`Viewing ${projectName} project details...`, 'info');
            } else {
                showNotification(`Opening ${projectName} live demo...`, 'info');
            }
        });
    });
});

// Floating shapes animation
function animateFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    shapes.forEach((shape, index) => {
        const duration = 15 + index * 5;
        const delay = index * 2;
        
        shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Social links interactions
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.querySelector('i').classList[1].split('-')[1];
        showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)} profile...`, 'info');
    });
});

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
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
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        border-radius: 4px;
        transition: background 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 400);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        case 'error': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        case 'warning': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const floatingShapes = document.querySelector('.floating-shapes');
    
    if (heroSection && floatingShapes) {
        const rate = scrolled * -0.5;
        floatingShapes.style.transform = `translateY(${rate}px)`;
    }
});

// Text typing animation for hero title
function typeWriter() {
    const titleLines = document.querySelectorAll('.hero-title span');
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            line.textContent += text[charIndex];
            charIndex++;
            
            if (charIndex === text.length) {
                clearInterval(typeInterval);
            }
        }, 100 + index * 50);
    });
}

// Initialize typing animation after loading
setTimeout(() => {
    typeWriter();
}, 2000);

// Performance optimization: Debounce scroll events
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

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const lines = navToggle.querySelectorAll('.line');
        lines.forEach(line => {
            line.style.transform = 'none';
            line.style.opacity = '1';
        });
    }
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Initialize floating shapes animation
animateFloatingShapes();

// Console welcome message
console.log('%c🎨 Alex Morgan Portfolio 🚀', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cCreative Designer & Developer', 'color: #764ba2; font-size: 14px;');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounters,
        debounce
    };
} 