// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimationForElement(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.querySelectorAll('.about-card, .program-card, .achievement-box, .contact-item').forEach(el => {
    observer.observe(el);
});

function getAnimationForElement(element) {
    if (element.classList.contains('about-card')) {
        return 'scaleInOnScroll 0.8s ease-out forwards';
    } else if (element.classList.contains('program-card')) {
        return 'slideInOnScroll 0.8s ease-out forwards';
    } else if (element.classList.contains('achievement-box')) {
        return 'popInOnScroll 0.8s ease-out forwards';
    } else if (element.classList.contains('contact-item')) {
        return 'slideInLeft 0.8s ease-out forwards';
    }
    return '';
}

// CTA Button click animation
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaButton.style.transform = '';
            alert('Thank you for your interest! Please scroll to contact us.');
        }, 200);
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
            
            console.log('Form submitted:', { name, email, message });
        }
    });
}

// Add parallax effect to floating circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCircles = document.querySelectorAll('.floating-circle');
    
    floatingCircles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add ripple effect on button click
function addRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Add ripple to buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', addRipple);
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Cursor follow effect on hero shapes
const shapes = document.querySelectorAll('.shape');
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});

// Counter animation for achievements
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Trigger counter animation when achievement boxes come into view
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.achievement-number');
            const text = numberElement.textContent.replace(/[^\d]/g, '');
            const target = parseInt(text);
            if (!isNaN(target)) {
                animateCounter(numberElement, target);
            }
            achievementObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.achievement-box').forEach(box => {
    achievementObserver.observe(box);
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Mobile menu close on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease-out';
});

// Add fade in animation to style
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(fadeInStyle);

console.log('Model Learning Secondary School Website - Interactive Features Loaded Successfully! 🎓');
