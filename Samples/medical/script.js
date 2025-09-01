// HealthCare Plus Medical Center - Interactive JavaScript

// DOM Elements
const loader = document.querySelector('.loader');
const emergencyBanner = document.querySelector('.emergency-banner');
const emergencyClose = document.querySelector('.emergency-close');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const counters = document.querySelectorAll('.counter');
const serviceCards = document.querySelectorAll('.service-card');
const doctorCards = document.querySelectorAll('.doctor-card');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialBtns = document.querySelectorAll('.testimonial-btn');
const appointmentForm = document.querySelector('.appointment-form');
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
    }, 2000);
});

// Emergency Banner
if (emergencyClose) {
    emergencyClose.addEventListener('click', () => {
        emergencyBanner.classList.add('hidden');
        // Adjust navbar position
        if (navbar) {
            navbar.style.top = '0';
        }
        // Store in localStorage
        localStorage.setItem('emergencyBannerClosed', 'true');
    });
}

// Check if emergency banner was previously closed
if (localStorage.getItem('emergencyBannerClosed') === 'true') {
    emergencyBanner.classList.add('hidden');
    if (navbar) {
        navbar.style.top = '0';
    }
}

// Mobile Navigation
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
    const bannerOffset = emergencyBanner.classList.contains('hidden') ? 0 : emergencyBanner.offsetHeight;
    
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
            const bannerOffset = emergencyBanner.classList.contains('hidden') ? 0 : emergencyBanner.offsetHeight;
            const offsetTop = targetSection.offsetTop - 80 - bannerOffset;
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
        const increment = target / 80;
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
            
            // Trigger counter animation when stats section is visible
            if (entry.target.querySelector('.counter')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-stats, .service-card, .doctor-card, .about-content, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Service Cards Interactions
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        showNotification(`Learn more about ${serviceName} services. Book an appointment to get started!`, 'info');
        
        // Scroll to appointment section after delay
        setTimeout(() => {
            const appointmentSection = document.querySelector('#appointment');
            if (appointmentSection) {
                appointmentSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill department selection
                setTimeout(() => {
                    const departmentSelect = appointmentForm.querySelector('select');
                    if (departmentSelect) {
                        const serviceValue = serviceName.toLowerCase();
                        const option = departmentSelect.querySelector(`option[value*="${serviceValue}"]`);
                        if (option) {
                            departmentSelect.value = option.value;
                        }
                    }
                }, 500);
            }
        }, 1000);
    });
    
    // Service card hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Doctor Cards Interactions
doctorCards.forEach(card => {
    const appointmentBtn = card.querySelector('.btn');
    
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const doctorName = card.querySelector('h3').textContent;
            
            showNotification(`Booking appointment with ${doctorName}...`, 'info');
            
            // Scroll to appointment form
            setTimeout(() => {
                const appointmentSection = document.querySelector('#appointment');
                if (appointmentSection) {
                    appointmentSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-fill doctor selection
                    setTimeout(() => {
                        const doctorSelect = appointmentForm.querySelectorAll('select')[1];
                        if (doctorSelect) {
                            const doctorValue = doctorName.toLowerCase().replace(/\s+/g, '-').replace('dr.', 'dr');
                            const option = doctorSelect.querySelector(`option[value*="${doctorValue}"]`);
                            if (option) {
                                doctorSelect.value = option.value;
                            }
                        }
                    }, 500);
                }
            }, 1000);
        });
    }
    
    // Doctor rating hover effect
    const rating = card.querySelector('.doctor-rating');
    if (rating) {
        rating.addEventListener('mouseenter', () => {
            const stars = rating.querySelectorAll('i');
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2)';
                    star.style.color = '#ffd700';
                }, index * 100);
            });
        });
        
        rating.addEventListener('mouseleave', () => {
            const stars = rating.querySelectorAll('i');
            stars.forEach(star => {
                star.style.transform = 'scale(1)';
            });
        });
    }
});

// Testimonials Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
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
setInterval(nextTestimonial, 6000);

// Appointment Form Handling
if (appointmentForm) {
    // Date input minimum date (today)
    const dateInput = appointmentForm.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Department and Doctor dependency
    const departmentSelect = appointmentForm.querySelector('select');
    const doctorSelect = appointmentForm.querySelectorAll('select')[1];
    
    if (departmentSelect && doctorSelect) {
        departmentSelect.addEventListener('change', () => {
            const selectedDepartment = departmentSelect.value;
            
            // Clear doctor selection
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
            
            // Add relevant doctors based on department
            const doctorOptions = {
                'cardiology': [
                    { value: 'dr-johnson', text: 'Dr. Sarah Johnson' }
                ],
                'neurology': [
                    { value: 'dr-chen', text: 'Dr. Michael Chen' }
                ],
                'pediatrics': [
                    { value: 'dr-rodriguez', text: 'Dr. Emily Rodriguez' }
                ],
                'orthopedics': [
                    { value: 'dr-smith', text: 'Dr. James Smith' }
                ],
                'ophthalmology': [
                    { value: 'dr-wilson', text: 'Dr. Lisa Wilson' }
                ],
                'pulmonology': [
                    { value: 'dr-brown', text: 'Dr. Robert Brown' }
                ],
                'general': [
                    { value: 'dr-davis', text: 'Dr. Mary Davis' }
                ]
            };
            
            if (doctorOptions[selectedDepartment]) {
                doctorOptions[selectedDepartment].forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.value;
                    option.textContent = doctor.text;
                    doctorSelect.appendChild(option);
                });
            }
            
            // Add "Any Available" option
            const anyOption = document.createElement('option');
            anyOption.value = 'any';
            anyOption.textContent = 'Any Available';
            doctorSelect.appendChild(anyOption);
        });
    }
    
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(appointmentForm);
        const firstName = appointmentForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = appointmentForm.querySelector('input[placeholder="Last Name"]').value;
        const email = appointmentForm.querySelector('input[placeholder="Email Address"]').value;
        const phone = appointmentForm.querySelector('input[placeholder="Phone Number"]').value;
        const department = departmentSelect.value;
        const doctor = doctorSelect.value;
        const date = dateInput.value;
        const time = appointmentForm.querySelectorAll('select')[2].value;
        
        // Validate form
        if (!firstName || !lastName || !email || !phone || !department || !doctor || !date || !time) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid phone number!', 'error');
            return;
        }
        
        // Date validation (not in the past)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showNotification('Please select a future date!', 'error');
            return;
        }
        
        // Simulate appointment booking
        const submitButton = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Booking...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            const doctorName = doctorSelect.options[doctorSelect.selectedIndex].text;
            const formattedDate = new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            showNotification(
                `Appointment confirmed! ${firstName}, your appointment with ${doctorName} is scheduled for ${formattedDate} at ${time}. You will receive a confirmation email shortly.`, 
                'success'
            );
            
            appointmentForm.reset();
            
            // Reset date minimum
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    });
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value;
        const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value;
        const inquiryType = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !phone || !inquiryType || !message) {
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
            showNotification(`Thank you ${name}! Your message has been sent. Our team will get back to you within 24 hours.`, 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Emergency Contact Pulse Effect
const emergencyBox = document.querySelector('.emergency-box');
if (emergencyBox) {
    emergencyBox.addEventListener('click', () => {
        showNotification('For immediate medical emergencies, please call 911 or visit our Emergency Department!', 'warning');
    });
}

// Floating Elements Animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        const duration = 6 + index * 2;
        const delay = index * 2;
        
        element.style.animation = `floatElement ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Initialize floating elements animation
animateFloatingElements();

// Achievement Badges Animation
const badges = document.querySelectorAll('.badge');
badges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        badge.style.transition = 'all 0.5s ease';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 2000 + index * 200);
});

// Service Features Reveal
serviceCards.forEach(card => {
    const features = card.querySelectorAll('.service-features li');
    
    card.addEventListener('mouseenter', () => {
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateX(10px)';
                feature.style.color = 'var(--primary-color)';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        features.forEach(feature => {
            feature.style.transform = 'translateX(0)';
            feature.style.color = 'var(--text-light)';
        });
    });
});

// Medical Cross Animation Enhancement
const medicalCross = document.querySelector('.medical-cross');
if (medicalCross) {
    medicalCross.addEventListener('animationend', () => {
        // Add pulse effect after cross animation
        medicalCross.style.animation = 'pulse 1s ease-in-out infinite';
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
        font-family: 'Nunito', sans-serif;
        backdrop-filter: blur(10px);
        border-left: 4px solid ${getNotificationBorderColor(type)};
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
    
    // Auto remove after 6 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 6000);
    
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
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, #0d7377, #14a085)';
        case 'error': return 'linear-gradient(135deg, #e53e3e, #c53030)';
        case 'warning': return 'linear-gradient(135deg, #d69e2e, #b7791f)';
        case 'info': return 'linear-gradient(135deg, #7ad7f0, #14a085)';
        default: return 'linear-gradient(135deg, #0d7377, #14a085)';
    }
}

function getNotificationBorderColor(type) {
    switch (type) {
        case 'success': return '#14a085';
        case 'error': return '#e53e3e';
        case 'warning': return '#d69e2e';
        case 'info': return '#7ad7f0';
        default: return '#14a085';
    }
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.element');
    
    floatingElements.forEach((element, index) => {
        const rate = scrolled * -0.2 * (index + 1);
        element.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Health Tips Ticker (simulated)
function showHealthTip() {
    const tips = [
        "Remember to drink 8 glasses of water daily for optimal health!",
        "Regular exercise can reduce the risk of chronic diseases by up to 50%.",
        "Getting 7-9 hours of sleep is essential for immune system function.",
        "Regular check-ups can help detect health issues early.",
        "A balanced diet with fruits and vegetables supports overall wellness."
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showNotification(randomTip, 'info');
}

// Show health tip every 2 minutes
setInterval(showHealthTip, 120000);

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
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
    
    // Emergency contact shortcut
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        showNotification('Emergency Contact: Call +1 (555) 911-HELP or dial 911', 'warning');
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
    const bannerOffset = emergencyBanner.classList.contains('hidden') ? 0 : emergencyBanner.offsetHeight;
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize tooltips for medical credentials
document.querySelectorAll('.doctor-credentials span').forEach(credential => {
    credential.addEventListener('mouseenter', (e) => {
        const text = e.target.textContent;
        if (text.includes('MD')) {
            e.target.title = 'Doctor of Medicine degree';
        } else if (text.includes('Years Experience')) {
            e.target.title = 'Years of professional medical practice';
        } else if (text.includes('Certified')) {
            e.target.title = 'Professional medical certification';
        }
    });
});

// Medical emergency simulation
function simulateEmergency() {
    const emergencyModal = document.createElement('div');
    emergencyModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(229, 62, 62, 0.95);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        flex-direction: column;
        font-family: 'Nunito', sans-serif;
    `;
    
    emergencyModal.innerHTML = `
        <div style="text-align: center; max-width: 500px; padding: 2rem;">
            <i class="fas fa-ambulance" style="font-size: 4rem; margin-bottom: 1rem; animation: emergencyPulse 1s ease-in-out infinite;"></i>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">MEDICAL EMERGENCY</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">If this is a real emergency, please:</p>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
                <button onclick="window.open('tel:911')" style="background: white; color: #e53e3e; border: none; padding: 1rem 2rem; border-radius: 10px; font-weight: bold; cursor: pointer;">CALL 911</button>
                <button onclick="window.open('tel:+15559114357')" style="background: white; color: #e53e3e; border: none; padding: 1rem 2rem; border-radius: 10px; font-weight: bold; cursor: pointer;">CALL HOSPITAL</button>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: 2px solid white; color: white; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
    `;
    
    document.body.appendChild(emergencyModal);
}

// Console welcome message
console.log('%c🏥 HealthCare Plus Medical Center 💙', 'color: #0d7377; font-size: 20px; font-weight: bold;');
console.log('%cYour Health is Our Top Priority', 'color: #14a085; font-size: 14px;');
console.log('%cPress Ctrl+E for emergency contact info', 'color: #7ad7f0; font-size: 12px;');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounters,
        debounce,
        simulateEmergency
    };
} 