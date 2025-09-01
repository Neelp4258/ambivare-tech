document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    // Toggle navigation menu on mobile
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle the icon (e.g., bars to times)
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for navigation links and close mobile menu
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }

                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for "reveal on scroll" animations
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');

                // Apply specific animations based on classes
                const animateElements = entry.target.querySelectorAll('.animate-fade-in, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in');
                animateElements.forEach(el => {
                    const animationClass = Array.from(el.classList).find(cls => cls.startsWith('animate-'));
                    if (animationClass) {
                        el.style.animation = `${animationClass.replace('animate-', '')} 0.8s ease-out forwards`;
                        // Handle delays
                        if (el.classList.contains('delay-1')) el.style.animationDelay = '0.3s';
                        if (el.classList.contains('delay-2')) el.style.animationDelay = '0.6s';
                    }
                });

                // Staggered animation for children
                const staggeredChildrenContainer = entry.target.querySelector('.animate-fade-in-children');
                if (staggeredChildrenContainer) {
                    Array.from(staggeredChildrenContainer.children).forEach((child, index) => {
                        child.style.animation = `fadeInUp 0.8s ease-out forwards ${index * 0.15 + 0.2}s`;
                    });
                }


                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (!section.classList.contains('hero-section')) { // Hero section animates immediately
             section.classList.add('section-hidden');
             sectionObserver.observe(section);
        }
    });


    // Optional: Add a simple form submission handler (for demonstration)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            console.log('Form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');

            contactForm.reset(); // Clear the form
        });
    }
});