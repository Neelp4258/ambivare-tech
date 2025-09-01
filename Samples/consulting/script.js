// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', mobileMenu);
}

function mobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(n => n.addEventListener('click', closeMenu));

function closeMenu() {
    if (hamburger) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

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

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animate Statistics on Scroll
const observeStats = () => {
    const stats = document.querySelectorAll('.stat h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                let finalValue, suffix = '';
                
                // Handle different number formats
                if (text.includes('$')) {
                    finalValue = parseInt(text.replace(/[$M+]/g, ''));
                    suffix = 'M+';
                } else if (text.includes('%')) {
                    finalValue = parseInt(text.replace('%', ''));
                    suffix = '%';
                } else if (text.includes('+')) {
                    finalValue = parseInt(text.replace('+', ''));
                    suffix = '+';
                } else {
                    finalValue = parseInt(text);
                }
                
                animateNumber(target, finalValue, suffix);
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
};

function animateNumber(element, finalValue, suffix = '') {
    let currentValue = 0;
    const increment = finalValue / 60;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            if (suffix === 'M+') {
                element.textContent = '$' + finalValue + 'M+';
            } else {
                element.textContent = finalValue + suffix;
            }
            clearInterval(timer);
        } else {
            if (suffix === 'M+') {
                element.textContent = '$' + Math.floor(currentValue) + 'M+';
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }
        }
    }, 30);
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!data.name || !data.email || !data.service || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! We\'ve received your consultation request. Our team will contact you within 24 hours to discuss your business goals.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#ff6b35' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        line-height: 1.4;
        border-left: 4px solid ${type === 'success' ? '#e55a2b' : '#c0392b'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 6000);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .team-member, .about-text, .about-image, .case-study');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Animate case study results on scroll
const animateCaseStudyResults = () => {
    const resultNumbers = document.querySelectorAll('.case-study .result .number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                let finalValue, suffix = '';
                
                // Handle different formats in case studies
                if (text.includes('%')) {
                    finalValue = parseInt(text.replace('%', ''));
                    suffix = '%';
                } else if (text.includes('$')) {
                    finalValue = parseFloat(text.replace(/[$M]/g, ''));
                    suffix = 'M';
                } else if (text.includes('mo')) {
                    finalValue = parseInt(text.replace('mo', ''));
                    suffix = 'mo';
                } else {
                    finalValue = parseInt(text);
                }
                
                animateCaseStudyNumber(target, finalValue, suffix);
                observer.unobserve(target);
            }
        });
    });
    
    resultNumbers.forEach(number => observer.observe(number));
};

function animateCaseStudyNumber(element, finalValue, suffix = '') {
    let currentValue = 0;
    const increment = finalValue / 40;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            if (suffix === 'M') {
                element.textContent = '$' + finalValue + 'M';
            } else {
                element.textContent = finalValue + suffix;
            }
            clearInterval(timer);
        } else {
            if (suffix === 'M') {
                element.textContent = '$' + Math.floor(currentValue * 10) / 10 + 'M';
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }
        }
    }, 50);
}

// Service card hover effects
const enhanceServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
};

// Team member card interactions
const enhanceTeamCards = () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const image = member.querySelector('.member-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.3s ease';
            }
        });
        
        member.addEventListener('mouseleave', () => {
            const image = member.querySelector('.member-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
};

// Case study card interactions
const enhanceCaseStudyCards = () => {
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach(study => {
        study.addEventListener('mouseenter', () => {
            study.style.transform = 'translateY(-5px)';
            study.style.background = 'rgba(255, 255, 255, 0.15)';
            study.style.transition = 'all 0.3s ease';
        });
        
        study.addEventListener('mouseleave', () => {
            study.style.transform = 'translateY(0)';
            study.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
};

// Active navigation highlighting
const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
};

// Parallax effect for hero section
const parallaxHero = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
};

// Stagger animation for service cards
const staggerServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200); // Stagger by 200ms
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    serviceCards.forEach(card => observer.observe(card));
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeStats();
    animateOnScroll();
    animateCaseStudyResults();
    enhanceServiceCards();
    enhanceTeamCards();
    enhanceCaseStudyCards();
    highlightActiveSection();
    staggerServiceCards();
    
    // Add fade-in class to hero content with delay
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    }, 500);
    
    // Enable parallax on desktop only
    if (window.innerWidth > 768) {
        parallaxHero();
    }
    
    // Add loading class to body
    document.body.classList.add('loaded');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add smooth reveal for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
};

// Call reveal sections after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(revealSections, 100);
}); 