// FitZone Gym - Interactive JavaScript

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const loader = document.querySelector('.loader');
const counters = document.querySelectorAll('.counter');
const filterButtons = document.querySelectorAll('.filter-btn');
const programCards = document.querySelectorAll('.program-card');
const scheduleButtons = document.querySelectorAll('.schedule-btn');
const scheduleDays = document.querySelectorAll('.schedule-day');
const contactForm = document.querySelector('.contact-form');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            if (loader) {
                loader.style.display = 'none';
            }
        }, 500);
    }, 1000);
});

// Mobile Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                switch(index) {
                    case 0:
                        bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        break;
                    case 1:
                        bar.style.opacity = '0';
                        break;
                    case 2:
                        bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                        break;
                }
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
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
        const increment = target / 100;
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Trigger counter animation when hero section is visible
            if (entry.target.querySelector('.counter')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-stats, .section-header, .program-card, .trainer-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Program Filtering
if (filterButtons.length > 0 && programCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            programCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Schedule Day Navigation
if (scheduleButtons.length > 0 && scheduleDays.length > 0) {
    scheduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and days
            scheduleButtons.forEach(btn => btn.classList.remove('active'));
            scheduleDays.forEach(day => day.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const targetDay = button.getAttribute('data-day');
            const targetDayElement = document.querySelector(`[data-day="${targetDay}"].schedule-day`);
            
            if (targetDayElement) {
                targetDayElement.classList.add('active');
            }
        });
    });
}

// Class Booking Simulation
document.addEventListener('click', (e) => {
    if (e.target.matches('.class-item .btn')) {
        e.preventDefault();
        const button = e.target;
        const classItem = button.closest('.class-item');
        const className = classItem.querySelector('h4').textContent;
        
        if (button.textContent === 'Book Now') {
            button.textContent = 'Booked!';
            button.style.background = '#28a745';
            button.disabled = true;
            
            // Update spots
            const spotsElement = classItem.querySelector('.class-spots');
            if (spotsElement && !spotsElement.classList.contains('full')) {
                const currentSpots = parseInt(spotsElement.textContent.match(/\d+/)[0]);
                const newSpots = currentSpots - 1;
                
                if (newSpots > 0) {
                    spotsElement.textContent = `${newSpots} spots left`;
                } else {
                    spotsElement.textContent = 'Full';
                    spotsElement.classList.add('full');
                }
            }
            
            // Show booking confirmation
            showNotification(`Successfully booked ${className}!`, 'success');
        }
    }
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const firstName = contactForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = contactForm.querySelector('input[placeholder="Last Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value;
        const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value;
        const goal = contactForm.querySelector('select').value;
        
        // Validate form
        if (!firstName || !lastName || !email || !phone || !goal) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification(`Thank you ${firstName}! We'll contact you soon to start your fitness journey.`, 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Pricing Plan Selection
document.addEventListener('click', (e) => {
    if (e.target.matches('.pricing-card .btn')) {
        e.preventDefault();
        const button = e.target;
        const planCard = button.closest('.pricing-card');
        const planName = planCard.querySelector('h3').textContent;
        const planPrice = planCard.querySelector('.amount').textContent;
        
        if (button.textContent !== 'Current Plan') {
            showNotification(`Great choice! ${planName} plan ($${planPrice}/month) selected. Redirecting to checkout...`, 'success');
            
            // Simulate plan selection
            setTimeout(() => {
                button.textContent = 'Current Plan';
                button.style.background = '#28a745';
                
                // Reset other plan buttons
                document.querySelectorAll('.pricing-card .btn').forEach(btn => {
                    if (btn !== button) {
                        btn.textContent = 'Choose Plan';
                        btn.style.background = '';
                    }
                });
            }, 1500);
        }
    }
});

// Program Card Interactions
programCards.forEach(card => {
    card.addEventListener('click', () => {
        const programName = card.querySelector('h3').textContent;
        const programPrice = card.querySelector('.price').textContent;
        
        showNotification(`Interested in ${programName}? Contact us to get started!`, 'info');
        
        // Scroll to contact section
        setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    });
});

// Trainer Booking Simulation
document.addEventListener('click', (e) => {
    if (e.target.matches('.trainer-card .btn')) {
        e.preventDefault();
        const button = e.target;
        const trainerCard = button.closest('.trainer-card');
        const trainerName = trainerCard.querySelector('h3').textContent;
        
        showNotification(`Booking session with ${trainerName}... Please check your email for confirmation.`, 'success');
        
        button.textContent = 'Session Booked!';
        button.style.background = '#28a745';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Book Session';
            button.style.background = '';
            button.disabled = false;
        }, 3000);
    }
});

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
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    `;
    
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
    }, 300);
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
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}

// Page Visibility API for pause/resume animations
document.addEventListener('visibilitychange', () => {
    const animatedElements = document.querySelectorAll('.floating-icons i, .hero-placeholder');
    
    if (document.hidden) {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
    
    // Navigate through schedule days with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeButton = document.querySelector('.schedule-btn.active');
        if (activeButton) {
            const buttons = Array.from(scheduleButtons);
            const currentIndex = buttons.indexOf(activeButton);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            } else {
                nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            }
            
            buttons[nextIndex].click();
            buttons[nextIndex].focus();
        }
    }
});

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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.removeEventListener('scroll', debouncedScrollHandler);
window.addEventListener('scroll', debouncedScrollHandler);

// Initialize tooltips for trainer stats
document.querySelectorAll('.trainer-stats span').forEach(stat => {
    stat.addEventListener('mouseenter', (e) => {
        const text = e.target.textContent;
        if (text.includes('Years Experience')) {
            e.target.title = 'Years of professional training experience';
        } else if (text.includes('Certified')) {
            e.target.title = 'Professional certification credentials';
        }
    });
});

// Lazy loading for background images (if any were added)
const lazyImages = document.querySelectorAll('[data-bg]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            imageObserver.unobserve(element);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Console welcome message
console.log('%c🏋️ Welcome to FitZone Gym! 💪', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cTransform your body, transform your life!', 'color: #f7931e; font-size: 14px;');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounters,
        debounce
    };
} 