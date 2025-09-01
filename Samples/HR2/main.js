// ===== GLOBAL VARIABLES =====
let isPreloaderHidden = false;
let currentTabIndex = 0;
let isScrolling = false;
let fabMenuOpen = false;

// ===== PRELOADER =====
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        isPreloaderHidden = true;
        
        // Initialize animations after preloader
        setTimeout(() => {
            initializeAnimations();
            startCounterAnimations();
        }, 500);
    }, 2000);
});

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dazzlo HR - Initializing futuristic systems...');
    
    // Initialize all components
    initializeNavigation();
    initializeHero();
    initializeTabs();
    initializeScrollEffects();
    initializeContactForm();
    initializeFloatingActions();
    initializeTiltEffect();
    initializeParticles();
    
    console.log('✨ All systems operational! Welcome to the future of HR.');
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect with throttling
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
    
    // Active navigation highlighting with intersection observer
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                // Remove active class from all nav links
                navLinksArray.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    });
    
    sections.forEach(section => navObserver.observe(section));
}

// ===== HERO SECTION =====
function initializeHero() {
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const action = this.textContent.trim();
            
            if (action.includes('Watch Demo')) {
                showNotification('🎬 Demo video will be available soon!', 'info');
            } else if (action.includes('Free Trial')) {
                smoothScrollTo(document.getElementById('contact').offsetTop - 80, 800);
                showNotification('👋 Let\'s get you started with Dazzlo HR!', 'success');
            }
            
            // Ripple effect
            createRippleEffect(this, e);
        });
    });
    
    // Parallax effect for hero background
    let heroParallaxTicking = false;
    
    function updateHeroParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroElements = document.querySelectorAll('.floating-element');
        
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            
            // Animate floating elements
            heroElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        }
        
        heroParallaxTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!heroParallaxTicking) {
            requestAnimationFrame(updateHeroParallax);
            heroParallaxTicking = true;
        }
    });
}

// ===== TABS FUNCTIONALITY =====
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel with animation
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                currentTabIndex = index;
            }
            
            // Animate tab change
            animateTabContent(targetPanel);
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('career-card')) {
                    animateGridItems(entry.target.parentElement);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .service-card, .career-card, .team-member, .contact-method, 
        .about-stat, .solution-mockup, .contact-form-container
    `);
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        fadeObserver.observe(el);
    });

    // Scroll progress indicator
    createScrollProgress();
    
    // Scroll to top button
    createScrollToTop();
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {};
        
        // Collect form data
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validation
        if (!validateForm(data)) {
            return;
        }
        
        // Simulate form submission
        submitForm(this, data);
    });
    
    // Input animations and validation
    formInputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = 'var(--accent-blue)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            this.style.borderColor = 'var(--border-light)';
            
            // Real-time validation
            validateField(this);
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// ===== FLOATING ACTIONS =====
function initializeFloatingActions() {
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    const fabItems = document.querySelectorAll('.fab-item');
    
    fabMain.addEventListener('click', function() {
        fabMenuOpen = !fabMenuOpen;
        
        if (fabMenuOpen) {
            fabMenu.classList.add('active');
            this.style.transform = 'rotate(45deg) scale(1.1)';
        } else {
            fabMenu.classList.remove('active');
            this.style.transform = 'rotate(0deg) scale(1)';
        }
    });
    
    fabItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'chat':
                    showNotification('💬 Live chat will be available soon!', 'info');
                    break;
                case 'demo':
                    showNotification('📅 Demo booking feature coming soon!', 'info');
                    break;
                case 'help':
                    showNotification('❓ Help center is under development!', 'info');
                    break;
            }
            
            // Close FAB menu
            fabMenuOpen = false;
            fabMenu.classList.remove('active');
            fabMain.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    // Close FAB menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.floating-actions') && fabMenuOpen) {
            fabMenuOpen = false;
            fabMenu.classList.remove('active');
            fabMain.style.transform = 'rotate(0deg) scale(1)';
        }
    });
}

// ===== TILT EFFECT =====
function initializeTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transformOrigin = 'center';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    // Random initial position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation
    const duration = 10 + Math.random() * 20;
    const delay = Math.random() * 5;
    
    particle.style.animation = `particleFloat ${duration}s ${delay}s infinite linear`;
    
    container.appendChild(particle);
    
    // Add particle float animation
    if (!document.querySelector('#particle-styles')) {
        const particleStyles = document.createElement('style');
        particleStyles.id = 'particle-styles';
        particleStyles.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyles);
    }
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuart(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
    }

    requestAnimationFrame(scrollAnimation);
}

// Easing function
function easeInOutQuart(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    t -= 2;
    return -c/2 * (t*t*t*t - 2) + b;
}

// Counter animations
function startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = Date.now();
    
    function updateCounter() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Grid animation
function animateGridItems(gridContainer) {
    const items = gridContainer.children;
    
    Array.from(items).forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Tab content animation
function animateTabContent(panel) {
    const elements = panel.querySelectorAll('.solution-text, .solution-visual');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(' + (index === 0 ? '-' : '') + '30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    });
}

// Notification system
function showNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        max-width: 400px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Close functionality
    closeButton.addEventListener('click', () => removeNotification(notification));
    
    // Auto remove
    setTimeout(() => removeNotification(notification), duration);
}

function removeNotification(notification) {
    if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.firstName?.trim()) {
        errors.push('First name is required');
    }
    
    if (!data.lastName?.trim()) {
        errors.push('Last name is required');
    }
    
    if (!data.email?.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    if (!data.message?.trim()) {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return false;
    }
    
    return true;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch(fieldName) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'firstName':
        case 'lastName':
            if (value && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
            }
            break;
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#EF4444';
    
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #EF4444;
            font-size: 12px;
            margin-top: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.opacity = '1';
}

function clearFieldError(field) {
    field.style.borderColor = 'var(--border-light)';
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.style.opacity = '0';
        setTimeout(() => errorElement.remove(), 300);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission
function submitForm(form, data) {
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    // Loading state
    submitButton.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Sending...</span>
    `;
    submitButton.disabled = true;
    
    // Add loading spinner styles
    if (!document.querySelector('#loading-spinner-styles')) {
        const spinnerStyles = document.createElement('style');
        spinnerStyles.id = 'loading-spinner-styles';
        spinnerStyles.textContent = `
            .loading-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyles);
    }
    
    // Simulate API call
    setTimeout(() => {
        // Success
        showNotification('🎉 Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Analytics (placeholder)
        console.log('Form submitted:', data);
        
    }, 2000);
}

// Ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    let progressTicking = false;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
        progressTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!progressTicking) {
            requestAnimationFrame(updateProgress);
            progressTicking = true;
        }
    });
}

// Scroll to top button
function createScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: var(--shadow-strong);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    let scrollBtnTicking = false;
    
    function updateScrollBtn() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
        scrollBtnTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!scrollBtnTicking) {
            requestAnimationFrame(updateScrollBtn);
            scrollBtnTicking = true;
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 800);
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize animations
function initializeAnimations() {
    // Add global animation styles
    if (!document.querySelector('#global-animations')) {
        const animationStyles = document.createElement('style');
        animationStyles.id = 'global-animations';
        animationStyles.textContent = `
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
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .notification {
                animation: slideInRight 0.3s ease;
            }
        `;
        document.head.appendChild(animationStyles);
    }
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('⚡ Performance Metrics:');
                console.log(`  DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
                console.log(`  Load Complete: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                console.log(`  Total Load Time: ${perfData.loadEventEnd - perfData.navigationStart}ms`);
            }, 1000);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('🔥 JavaScript Error:', e.error);
    // Optionally show user-friendly error message
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('💫 Service Worker registered'))
            .catch(error => console.log('⚠️ Service Worker registration failed'));
    });
}

console.log('🚀 Dazzlo HR JavaScript initialized successfully!'); 