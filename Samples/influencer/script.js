// Alex Rivera - Influencer Website Interactive JavaScript

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const contentFilters = document.querySelectorAll('.filter-btn');
const contentCards = document.querySelectorAll('.content-card');
const contactForm = document.querySelector('.contact-form');
const animatedElements = document.querySelectorAll('.content-card, .brand-card, .stat-card, .highlight');

// Mobile Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on links
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
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

// Content Filtering System
function initContentFilters() {
    if (contentFilters.length > 0 && contentCards.length > 0) {
        contentFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                contentFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-filter');
                
                contentCards.forEach(card => {
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
}

// Contact Form Handler
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Simulate form submission
                showNotification('Thank you for reaching out! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    // Get form fields by their position in the form
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const company = inputs[2].value;
    const collaborationType = inputs[3].value;
    const budget = inputs[4].value;
    const message = inputs[5].value;
    
    if (!name || name.length < 2) {
        errors.push('Please enter your name');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!company || company.length < 2) {
        errors.push('Please enter your company or brand name');
    }
    
    if (!collaborationType) {
        errors.push('Please select a collaboration type');
    }
    
    if (!budget) {
        errors.push('Please enter your budget range');
    }
    
    if (!message || message.length < 10) {
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
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
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

// Add notification animations to head
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
        gap: 0.8rem;
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
        font-size: 1rem;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Counter Animation for Stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-card h3, .stat h3');
    
    const startCounting = (counter) => {
        const target = counter.textContent;
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        const suffix = target.replace(/[\d.]/g, '');
        const duration = 2000; // 2 seconds
        const increment = numericValue / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < numericValue) {
                counter.textContent = formatNumber(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.floor(num).toString();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Social Media Link Analytics (Mock)
function trackSocialClick(platform) {
    console.log(`Social media click tracked: ${platform}`);
    // In a real implementation, this would send analytics data
    showNotification(`Opening ${platform}! Thanks for following! 🎉`, 'info');
}

// Add click tracking to social links
function initSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-link, .platform-link, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Determine platform based on icon
            const icon = link.querySelector('i');
            let platform = 'Social Media';
            
            if (icon) {
                if (icon.classList.contains('fa-instagram')) platform = 'Instagram';
                else if (icon.classList.contains('fa-tiktok')) platform = 'TikTok';
                else if (icon.classList.contains('fa-youtube')) platform = 'YouTube';
                else if (icon.classList.contains('fa-twitter')) platform = 'Twitter';
            }
            
            trackSocialClick(platform);
            
            // Add visual feedback
            link.style.transform = 'scale(1.1)';
            setTimeout(() => {
                link.style.transform = '';
            }, 200);
        });
    });
}

// Content Card Interactions
function initContentInteractions() {
    contentCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const platform = card.querySelector('.content-platform i');
            let platformName = 'Platform';
            
            if (platform) {
                if (platform.classList.contains('fa-instagram')) platformName = 'Instagram';
                else if (platform.classList.contains('fa-tiktok')) platformName = 'TikTok';
                else if (platform.classList.contains('fa-youtube')) platformName = 'YouTube';
            }
            
            showNotification(`Opening "${title}" on ${platformName}! 📱`, 'info');
            
            // Add visual feedback
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
        
        // Hover effect for better UX
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });
    });
}

// Brand Card Interactions
function initBrandInteractions() {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        card.addEventListener('click', () => {
            const brandName = card.querySelector('h3').textContent;
            showNotification(`Learn more about my partnership with ${brandName}! 🤝`, 'info');
            
            // Add visual feedback
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
        });
    });
}

// Floating Elements Animation Enhancement
function enhanceFloatingElements() {
    const floatingItems = document.querySelectorAll('.float-item');
    
    floatingItems.forEach((item, index) => {
        // Add random movement on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 20;
            const y = (e.clientY / window.innerHeight) * 20;
            
            item.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px) rotate(${x}deg)`;
        });
    });
}

// Collaboration CTA Enhancement
function initCollaborationCTA() {
    const ctaButton = document.querySelector('.collaboration-cta .btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Smooth scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Add attention to the form
                setTimeout(() => {
                    const form = document.querySelector('.contact-form-container');
                    if (form) {
                        form.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.3)';
                        form.style.transition = 'box-shadow 0.3s ease';
                        
                        setTimeout(() => {
                            form.style.boxShadow = '';
                        }, 2000);
                    }
                }, 500);
            }
        });
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 968) {
        navMenu.classList.remove('active');
        
        // Reset hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Handle page load
window.addEventListener('load', () => {
    // Add page loaded class for animations
    document.body.classList.add('loaded');
    
    // Initialize lazy loading for content images (if needed)
    // This would be useful if you had actual images instead of placeholders
});

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContentFilters();
    initContactForm();
    initScrollAnimations();
    initCounters();
    initSocialTracking();
    initContentInteractions();
    initBrandInteractions();
    enhanceFloatingElements();
    initCollaborationCTA();
    
    // Add a welcome message
    setTimeout(() => {
        showNotification('Welcome to my creative space! 🎨✨', 'info');
    }, 1000);
});

// Export functions for external use
window.InfluencerApp = {
    showNotification,
    validateForm,
    trackSocialClick
}; 