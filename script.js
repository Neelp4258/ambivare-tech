// ===== ULTRA-ELITE AMBIVARE SOLUTIONS WEBSITE =====
// Advanced JavaScript with WebGL, GSAP, and cutting-edge features

// Global variables
let isChatbotOpen = false;
let currentTheme = localStorage.getItem('theme') || 'light';
let cursorFollower;
let webglScene, webglCamera, webglRenderer;
let animationId;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

async function initializeWebsite() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all components
    await Promise.all([
        initializeParticles(),
        initializeWebGL(),
        initializeGSAP(),
        initializeAOS(),
        initializeTheme(),
        initializeNavigation(),
        initializeCursorFollower(),
        initializeCounters(),
        initializeCarousel(),
        initializeChatbot(),
        initializeFormValidation()
    ]);
    
    // Hide loading screen after everything is ready
    setTimeout(() => {
        hideLoadingScreen();
    }, 3000);
}

// ===== LOADING SCREEN =====
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');
    
    if (loadingScreen && progressBar) {
        loadingScreen.classList.remove('hidden');
        
        // Animate progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressBar.style.width = progress + '%';
        }, 100);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ===== WEBGL BACKGROUND =====
function initializeWebGL() {
    const canvas = document.getElementById('webglBackground');
    if (!canvas) return;
    
    // Scene setup
    webglScene = new THREE.Scene();
    
    // Camera setup
    webglCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    webglCamera.position.z = 5;
    
    // Renderer setup
    webglRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    createWebGLParticles();
    
    // Start animation
    animateWebGL();
    
    // Handle resize
    window.addEventListener('resize', onWebGLResize);
}

function createWebGLParticles() {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    webglScene.add(particles);
}

function animateWebGL() {
    animationId = requestAnimationFrame(animateWebGL);
    
    if (webglScene && webglRenderer && webglCamera) {
        webglScene.rotation.x += 0.001;
        webglScene.rotation.y += 0.002;
        
        webglRenderer.render(webglScene, webglCamera);
    }
}

function onWebGLResize() {
    if (webglCamera && webglRenderer) {
        webglCamera.aspect = window.innerWidth / window.innerHeight;
        webglCamera.updateProjectionMatrix();
        webglRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ===== GSAP ANIMATIONS =====
function initializeGSAP() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.timeline()
        .from('.hero-badge', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero-title .title-line', { 
            y: 100, 
            opacity: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: 'power3.out' 
        }, '-=0.5')
        .from('.hero-stats', { 
            y: 50, 
            opacity: 0, 
            duration: 1, 
            ease: 'power3.out' 
        }, '-=0.3')
        .from('.hero-cta', { 
            y: 50, 
            opacity: 0, 
            duration: 1, 
            ease: 'power3.out' 
        }, '-=0.5');
    
    // Floating cards animation
    gsap.to('.floating-card', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        stagger: 0.5,
        yoyo: true,
        repeat: -1
    });
    
    // Tech sphere animation
    gsap.to('.sphere-core', {
        scale: 1.2,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
    
    // Parallax effects
    gsap.utils.toArray('.floating-card').forEach(card => {
        const speed = parseFloat(card.dataset.speed) || 1;
        gsap.to(card, {
            y: -100 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// ===== CURSOR FOLLOWER =====
function initializeCursorFollower() {
    cursorFollower = document.getElementById('cursorFollower');
    if (!cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following
    function updateCursor() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Hover effects
    document.querySelectorAll('a, button, .floating-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform += ' scale(2)';
            cursorFollower.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(2)', '');
            cursorFollower.style.opacity = '0.7';
        });
    });
}

// ===== PARTICLES.JS INITIALIZATION =====
function initializeParticles() {
    if (typeof particlesJS === 'undefined') return;
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS === 'undefined') return;
    
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    console.log('Initializing theme system');
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Add event listeners for theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('Theme toggle button found, adding event listeners');
        
        // Remove existing onclick attribute and add proper event listener
        themeToggle.removeAttribute('onclick');
        
        // Add multiple event listeners for better compatibility
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme toggle clicked');
            toggleTheme();
        });
        
        themeToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Theme toggle touched');
            toggleTheme();
        });
        
        // Add keyboard support
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Theme toggle activated via keyboard');
                toggleTheme();
            }
        });
        
        // Add fallback for older browsers
        themeToggle.onclick = function(e) {
            e.preventDefault();
            console.log('Theme toggle fallback clicked');
            toggleTheme();
        };
        
        console.log('Theme toggle event listeners added');
    } else {
        console.error('Theme toggle button not found');
    }
    
    // Add fallback for when JavaScript is disabled
    document.addEventListener('DOMContentLoaded', function() {
        const fallbackToggle = document.getElementById('themeToggle');
        if (fallbackToggle && !fallbackToggle.hasAttribute('data-initialized')) {
            fallbackToggle.setAttribute('data-initialized', 'true');
            fallbackToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }
    });
}

function setTheme(theme) {
    console.log('Setting theme to:', theme);
    
    // Add transition class for smooth theme change
    document.documentElement.classList.add('theme-transitioning');
    
    // Set theme on both html and body elements
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    
    // Force a repaint
    document.documentElement.style.display = 'none';
    document.documentElement.offsetHeight; // Trigger reflow
    document.documentElement.style.display = '';
    
    // Update theme toggle button appearance
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
        
        // Add visual feedback
        themeToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 200);
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
    }, 300);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', currentTheme, 'to', newTheme);
    
    // Add immediate visual feedback
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 200);
    }
    
    setTheme(newTheme);
}

// Add global function for onclick
function toggleThemeGlobal() {
    console.log('Global toggle theme called');
    toggleTheme();
}

// Make function globally available
window.toggleTheme = toggleThemeGlobal;

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Navigation elements found:', {
        navbar: !!navbar,
        mobileMenuToggle: !!mobileMenuToggle,
        navMenu: !!navMenu,
        navLinks: navLinks.length
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        console.log('Mobile menu toggle initialized');
        
        // Add click event listener
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            toggleMobileMenu();
        });
        
        // Add touch event listener for mobile
        mobileMenuToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Mobile menu toggle touched');
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        console.log('Mobile menu event listeners added');
    } else {
        console.error('Mobile menu elements not found:', {
            mobileMenuToggle: !!mobileMenuToggle,
            navMenu: !!navMenu
        });
    }
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Mobile-specific enhancements
    if (window.innerWidth <= 768) {
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('.btn, .nav-link, .service-card, .industry-card');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// ===== ANIMATED COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// ===== CAROUSEL =====
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.industry-card');
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    if (!track || cards.length === 0) return;
    
    // Set initial position
    track.style.transform = `translateX(0%)`;
    
    function moveCarousel(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        } else if (currentIndex >= cards.length) {
            currentIndex = 0;
        }
        
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }
    
    // Mobile touch/swipe support
    if (window.innerWidth <= 768) {
        track.addEventListener('touchstart', (e) => {
            isDragging = true;
            startPos = e.touches[0].clientX;
            track.style.transition = 'none';
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentPosition = e.touches[0].clientX;
            const diff = currentPosition - startPos;
            const cardWidth = track.offsetWidth;
            
            currentTranslate = prevTranslate + diff;
            track.style.transform = `translateX(${currentTranslate}px)`;
        });
        
        track.addEventListener('touchend', () => {
            isDragging = false;
            track.style.transition = 'transform 0.3s ease-out';
            
            const cardWidth = track.offsetWidth;
            const threshold = cardWidth * 0.3;
            
            if (Math.abs(currentTranslate - prevTranslate) > threshold) {
                if (currentTranslate < prevTranslate) {
                    moveCarousel(1); // Swipe left
                } else {
                    moveCarousel(-1); // Swipe right
                }
            } else {
                // Snap back
                track.style.transform = `translateX(${prevTranslate}px)`;
            }
            
            prevTranslate = -currentIndex * cardWidth;
        });
    }
    
    // Auto-advance carousel (only on desktop)
    if (window.innerWidth > 768) {
        setInterval(() => {
            moveCarousel(1);
        }, 5000);
    }
    
    // Make moveCarousel globally available
    window.moveCarousel = moveCarousel;
}

// ===== CHATBOT =====
function initializeChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendButton = document.querySelector('.chatbot-input button');
    
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }
    
    if (chatbotClose && chatbotWindow) {
        chatbotClose.addEventListener('click', toggleChatbot);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', handleChatbotKeypress);
    }
    
    if (chatbotSendButton) {
        chatbotSendButton.addEventListener('click', sendMessage);
    }
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    isChatbotOpen = !isChatbotOpen;
    
    if (isChatbotOpen) {
        chatbotWindow.classList.add('active');
    } else {
        chatbotWindow.classList.remove('active');
    }
}

function handleChatbotKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const responses = {
        'hello': 'Hello! How can I help you with your IT project today?',
        'services': 'We offer comprehensive IT services including Web Development, AI & Automation, Cloud Services, Cybersecurity, Data Analytics, and Digital Marketing. Which area interests you?',
        'pricing': 'Our pricing is competitive and varies based on project scope. Would you like to schedule a free consultation to discuss your specific needs?',
        'contact': 'You can reach us at hello@ambivare.com or call +1 (555) 123-4567. We typically respond within 2 hours during business hours.',
        'default': 'Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services or schedule a consultation.'
    };
    
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    return responses.default;
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const consultationForm = document.getElementById('consultationForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmit);
    }
    
    // Mobile form enhancements
    if (window.innerWidth <= 768) {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Prevent zoom on focus (iOS)
            if (input.type !== 'file') {
                input.addEventListener('focus', function() {
                    this.style.fontSize = '16px';
                });
            }
            
            // Add visual feedback
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
        
        // Auto-scroll to focused input
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            });
        });
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Sending message...', 'info');
    
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        event.target.reset();
    }, 2000);
}

function handleConsultationSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.company || !data.service || !data.budget || !data.timeline) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Scheduling your consultation...', 'info');
    
    setTimeout(() => {
        showNotification('Consultation scheduled successfully! We\'ll contact you within 24 hours.', 'success');
        event.target.reset();
    }, 2000);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function downloadProfile() {
    // Download Ambivare Profile PDF
    showNotification('Downloading Ambivare Profile...', 'info');
    
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = 'Ambivare_Profile.pdf';
    link.download = 'Ambivare_Profile.pdf';
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
        showNotification('Ambivare Profile downloaded successfully!', 'success');
    }, 1000);
}

function downloadComic() {
    // Download Ambivare Man Comic PDF
    showNotification('Downloading Ambivare Man Comic...', 'info');
    
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = 'Ambivare_Man.pdf';
    link.download = 'Ambivare_Man.pdf';
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
        showNotification('Ambivare Man Comic downloaded successfully!', 'success');
    }, 1000);
}

function downloadComicAndOpenSite(event) {
    // Prevent default link behavior
    event.preventDefault();
    
    // Show notification
    showNotification('Downloading Ambivare Man Comic and opening website...', 'info');
    
    // First, trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://ambivare.com/Ambivare_man.pdf';
    downloadLink.download = 'Ambivare_Man.pdf';
    downloadLink.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Then, open the website in a new tab after a short delay
    setTimeout(() => {
        window.open('https://ambivare.com', '_blank');
        showNotification('Comic downloaded! Website opened in new tab.', 'success');
    }, 500);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and effects
}, 16));

// Mobile performance optimizations
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (reduceMotion.matches) {
        // Disable heavy animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-normal', '0.1s ease-in-out');
        document.documentElement.style.setProperty('--transition-slow', '0.2s ease-in-out');
    }
    
    // Optimize touch events
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
    }, { passive: true });
    
    // Prevent pull-to-refresh on mobile
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
}

// ===== ACCESSIBILITY =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.getElementById('navMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Close chatbot
        if (isChatbotOpen) {
            toggleChatbot();
        }
    }
});

// ===== SEO ENHANCEMENTS =====
// Update meta description dynamically
function updateMetaDescription(description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
}

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.downloadProfile = downloadProfile;
window.downloadComic = downloadComic;
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.handleChatbotKeypress = handleChatbotKeypress;
window.moveCarousel = moveCarousel;

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        console.log('Toggle mobile menu called');
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            console.log('Mobile menu closed');
        } else {
            navMenu.classList.add('active');
            mobileMenuToggle.classList.add('active');
            console.log('Mobile menu opened - Menu should be visible now');
        }
    } else {
        console.error('Mobile menu elements not found:', {
            mobileMenuToggle: !!mobileMenuToggle,
            navMenu: !!navMenu
        });
    }
}

window.toggleMobileMenu = toggleMobileMenu;

// Theme toggle function
function toggleThemeGlobal() {
    console.log('Global theme toggle called');
    toggleTheme();
}

window.toggleTheme = toggleThemeGlobal;

// ===== CONSULTATION FORM FUNCTIONS =====
function openConsultationForm() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
}

function closeConsultationForm() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('buildWithAmbivareForm');
        if (form) {
            form.reset();
        }
    }
}

function handleBuildWithAmbivareSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Collect form data
    const projectData = {
        projectName: formData.get('projectName'),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientPhone: formData.get('clientPhone'),
        companyName: formData.get('companyName'),
        projectType: formData.get('projectType'),
        projectDescription: formData.get('projectDescription'),
        projectBudget: formData.get('projectBudget'),
        projectTimeline: formData.get('projectTimeline'),
        industry: formData.get('industry'),
        businessGoals: formData.get('businessGoals'),
        targetAudience: formData.get('targetAudience'),
        technicalRequirements: formData.get('technicalRequirements'),
        additionalInfo: formData.get('additionalInfo'),
        ndaRequired: formData.get('ndaRequired') === 'on',
        technologies: formData.getAll('technologies'),
        agreement: formData.get('agreement') === 'on',
        submittedAt: new Date().toISOString()
    };
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="btn-text">Submitting...</span><div class="btn-glow"></div>';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success notification
        showNotification('Project request submitted successfully! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form and close modal
        form.reset();
        closeConsultationForm();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Log project data (for development - remove in production)
        console.log('Project Request Data:', projectData);
        
        // Here you would typically send the data to your backend
        // Example: sendProjectRequest(projectData);
        
    }, 2000);
}

// Export consultation form functions
window.openConsultationForm = openConsultationForm;
window.closeConsultationForm = closeConsultationForm;
window.handleBuildWithAmbivareSubmit = handleBuildWithAmbivareSubmit;

