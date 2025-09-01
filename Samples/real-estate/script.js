document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for contacting Dream Homes Realty!');
}); 

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
        nav.style.flexDirection = 'column';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
}

// Property search functionality
const searchBtn = document.querySelector('.search-btn');
const locationInput = document.querySelector('.search-input input');
const propertyType = document.querySelector('.property-type');
const priceRange = document.querySelector('.price-range');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        const type = propertyType.value;
        const price = priceRange.value;
        
        if (!location) {
            showNotification('Please enter a location to search', 'error');
            return;
        }
        
        // Simulate search results
        showNotification(`Searching for ${type || 'properties'} in ${location}${price ? ` within price range ${price}` : ''}...`, 'success');
        
        // Scroll to properties section
        setTimeout(() => {
            document.querySelector('#properties').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });
}

// Property card interactions
document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const propertyCard = e.target.closest('.property-card');
        const propertyName = propertyCard.querySelector('h3').textContent;
        const propertyPrice = propertyCard.querySelector('.property-price').textContent;
        
        showPropertyModal(propertyName, propertyPrice);
    });
});

document.querySelectorAll('.btn-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const propertyCard = e.target.closest('.property-card');
        const propertyName = propertyCard.querySelector('h3').textContent;
        
        // Pre-fill contact form
        const contactForm = document.querySelector('.contact-form');
        const textarea = contactForm.querySelector('textarea');
        const serviceSelect = contactForm.querySelector('select');
        
        if (serviceSelect) serviceSelect.value = 'buying';
        if (textarea) textarea.value = `I'm interested in the property: ${propertyName}`;
        
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        showNotification('Contact form pre-filled with property details', 'success');
    });
});

// Agent contact functionality
document.querySelectorAll('.agent-contact a').forEach(link => {
    link.addEventListener('click', (e) => {
        const agentCard = e.target.closest('.agent-card');
        const agentName = agentCard.querySelector('h3').textContent;
        const contactType = e.target.closest('a').querySelector('i').className;
        
        if (contactType.includes('phone')) {
            e.preventDefault();
            showNotification(`Calling ${agentName}...`, 'success');
        } else if (contactType.includes('envelope')) {
            e.preventDefault();
            showNotification(`Opening email to ${agentName}...`, 'success');
        }
    });
});

// Contact form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formInputs = this.querySelectorAll('input');
        const firstName = formInputs[0].value.trim();
        const lastName = formInputs[1].value.trim();
        const email = formInputs[2].value.trim();
        const phone = formInputs[3].value.trim();
        const interest = this.querySelector('select').value;
        const message = this.querySelector('textarea').value.trim();
        
        // Validation
        if (!firstName || !lastName || !email || !phone || !interest || !message) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid phone number!', 'error');
            return;
        }
        
        // Success
        showNotification(`Thank you ${firstName}! Your consultation request has been received. Our team will contact you within 24 hours.`, 'success');
        this.reset();
    });
}

// Property modal functionality
function showPropertyModal(propertyName, propertyPrice) {
    // Remove existing modal
    const existingModal = document.querySelector('.property-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${propertyName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="property-details">
                    <div class="detail-item">
                        <strong>Price:</strong> ${propertyPrice}
                    </div>
                    <div class="detail-item">
                        <strong>Property Type:</strong> Residential
                    </div>
                    <div class="detail-item">
                        <strong>Year Built:</strong> 2020
                    </div>
                    <div class="detail-item">
                        <strong>Parking:</strong> 2 Car Garage
                    </div>
                    <div class="detail-item">
                        <strong>Features:</strong> Swimming Pool, Garden, Modern Kitchen
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-schedule">Schedule Viewing</button>
                    <button class="btn-contact-agent">Contact Agent</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
            }
            .modal-content {
                background: white;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                z-index: 1;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid #eee;
            }
            .modal-header h3 {
                color: #2c3e50;
                margin: 0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s;
            }
            .modal-close:hover {
                background: #f0f0f0;
            }
            .modal-body {
                padding: 30px;
            }
            .property-details {
                margin-bottom: 30px;
            }
            .detail-item {
                margin-bottom: 15px;
                padding: 10px 0;
                border-bottom: 1px solid #f0f0f0;
            }
            .detail-item:last-child {
                border-bottom: none;
            }
            .modal-actions {
                display: flex;
                gap: 15px;
            }
            .btn-schedule,
            .btn-contact-agent {
                flex: 1;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .btn-schedule {
                background: #4CAF50;
                color: white;
            }
            .btn-schedule:hover {
                background: #45a049;
                transform: translateY(-2px);
            }
            .btn-contact-agent {
                background: transparent;
                color: #1e3c72;
                border: 2px solid #1e3c72;
            }
            .btn-contact-agent:hover {
                background: #1e3c72;
                color: white;
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Modal button actions
    modal.querySelector('.btn-schedule').addEventListener('click', () => {
        modal.remove();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        showNotification('Scroll down to schedule your property viewing', 'success');
    });
    
    modal.querySelector('.btn-contact-agent').addEventListener('click', () => {
        modal.remove();
        document.querySelector('#agents').scrollIntoView({ behavior: 'smooth' });
        showNotification('Choose an agent to contact', 'success');
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #f44336, #d32f2f)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Scroll reveal animation
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

// Observe elements for scroll animation
document.querySelectorAll('.property-card, .service-card, .agent-card, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Statistics counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 1000 ? '+' : target === 98 ? '%' : '+');
    }, 20);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetValue = parseInt(statNumber.textContent.replace(/\D/g, ''));
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Property card hover effects
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.property-placeholder');
        if (image) {
            image.style.transform = 'scale(1.1)';
            image.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.property-placeholder');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// Initialize
document.body.style.opacity = '0';

// Enter key support for search
if (locationInput) {
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
} 