// Luxe Beauty Salon - Interactive JavaScript

// DOM Elements
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('nav');
const galleryFilters = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const bookingForm = document.querySelector('.booking-form');
const contactForm = document.querySelector('.contact-form form');

// Mobile Navigation Toggle
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on links
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Filtering
function initGalleryFilters() {
    if (galleryFilters.length > 0 && galleryItems.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                galleryFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Booking Form Handler
function initBookingForm() {
    if (bookingForm) {
        const form = bookingForm.querySelector('form') || bookingForm;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateBookingForm(data)) {
                // Simulate form submission
                showNotification('Booking request submitted successfully! We will contact you shortly.', 'success');
                form.reset();
            }
        });
        
        // Date validation - prevent past dates
        const dateInput = form.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        // Time slot availability (example)
        const timeSelect = form.querySelector('select[name="time"]');
        const dateSelect = form.querySelector('input[name="date"]');
        
        if (timeSelect && dateSelect) {
            dateSelect.addEventListener('change', () => {
                updateAvailableTimeSlots(dateSelect.value, timeSelect);
            });
        }
    }
}

// Validate Booking Form
function validateBookingForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    if (!data.date) {
        errors.push('Please select a date');
    }
    
    if (!data.time) {
        errors.push('Please select a time');
    }
    
    // Check if date is not in the past
    if (data.date && new Date(data.date) < new Date()) {
        errors.push('Please select a future date');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Update Available Time Slots
function updateAvailableTimeSlots(selectedDate, timeSelect) {
    // Simulate availability check
    const allSlots = [
        '09:00', '10:00', '11:00', '12:00', 
        '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    // Randomly disable some slots for demo
    const unavailableSlots = Math.random() > 0.5 ? ['12:00', '15:00'] : ['10:00', '17:00'];
    
    // Clear current options except the first one
    timeSelect.innerHTML = '<option value="">Select Time</option>';
    
    allSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        
        if (unavailableSlots.includes(slot)) {
            option.disabled = true;
            option.textContent += ' (Unavailable)';
        }
        
        timeSelect.appendChild(option);
    });
}

// Contact Form Handler
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            if (validateContactForm(data)) {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }
}

// Validate Contact Form
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        white-space: pre-line;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-category, .team-member, .gallery-item, .contact-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Service Price Calculator (if needed)
function initPriceCalculator() {
    const serviceSelects = document.querySelectorAll('select[name="service"]');
    
    serviceSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const price = selectedOption.getAttribute('data-price');
            
            if (price) {
                const priceDisplay = document.querySelector('.price-display');
                if (priceDisplay) {
                    priceDisplay.textContent = `Estimated Price: $${price}`;
                    priceDisplay.style.display = 'block';
                }
            }
        });
    });
}

// Service Time Estimator
function getServiceDuration(serviceName) {
    const serviceDurations = {
        'haircut': 60,
        'coloring': 120,
        'highlights': 180,
        'facial': 90,
        'massage': 60,
        'manicure': 45,
        'pedicure': 60,
        'eyebrow': 30,
        'makeup': 45
    };
    
    const serviceKey = serviceName.toLowerCase().replace(/\s+/g, '');
    return serviceDurations[serviceKey] || 60;
}

// Add Google Maps Integration (placeholder)
function initMap() {
    const mapContainer = document.querySelector('#map');
    if (mapContainer) {
        // This would integrate with Google Maps API
        mapContainer.innerHTML = `
            <div style="width: 100%; height: 300px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                <p>Interactive Map Would Load Here</p>
            </div>
        `;
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGalleryFilters();
    initBookingForm();
    initContactForm();
    initScrollAnimations();
    initCounters();
    initPriceCalculator();
    initMap();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle page load animations
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Service booking quick actions
function quickBookService(serviceName) {
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
        
        // Scroll to booking section
        const bookingSection = document.querySelector('#booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Add click events to service cards for quick booking
document.querySelectorAll('.service-category').forEach(category => {
    const quickBookBtn = document.createElement('button');
    quickBookBtn.className = 'quick-book-btn';
    quickBookBtn.textContent = 'Quick Book';
    quickBookBtn.style.cssText = `
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
        width: 100%;
        font-weight: 500;
        transition: all 0.3s ease;
    `;
    
    quickBookBtn.addEventListener('click', () => {
        const serviceName = category.querySelector('h3').textContent;
        quickBookService(serviceName);
    });
    
    quickBookBtn.addEventListener('mouseover', () => {
        quickBookBtn.style.background = 'var(--gold)';
        quickBookBtn.style.transform = 'translateY(-2px)';
    });
    
    quickBookBtn.addEventListener('mouseout', () => {
        quickBookBtn.style.background = 'var(--primary-color)';
        quickBookBtn.style.transform = 'translateY(0)';
    });
    
    category.appendChild(quickBookBtn);
});

// Export functions for external use
window.SalonApp = {
    showNotification,
    quickBookService,
    validateBookingForm,
    validateContactForm
}; 