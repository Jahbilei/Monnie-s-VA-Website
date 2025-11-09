
document.addEventListener('DOMContentLoaded', function() {
    // Add dynamic background elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const bg = document.createElement('div');
        bg.className = 'absolute inset-0 pointer-events-none overflow-hidden';
        bg.innerHTML = `
            <div class="floating-bg absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-rose-gold/5 to-transparent rounded-full blur-3xl"></div>
            <div class="floating-bg absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-orange-300/5 to-transparent rounded-full blur-3xl" style="animation-delay: -5s"></div>
        `;
        if (!section.classList.contains('bg-charcoal')) {
            section.appendChild(bg);
        }
    });

    // Add hover effects to cards
    document.querySelectorAll('.group').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shimmer');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shimmer');
        });
    });

    // Add pressed state to buttons
    document.querySelectorAll('button, a[role="button"]').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.classList.add('active');
        });
        button.addEventListener('mouseup', () => {
            button.classList.remove('active');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('active');
        });
    });

    // Add form input animations
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.group')?.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.closest('.group')?.classList.remove('focused');
            }
        });
    });

// Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 80;
                const distance = targetPosition - startPosition;
                const duration = Math.min(Math.max(Math.abs(distance) / 2, 500), 1200);
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutQuad(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t + b;
                    t--;
                    return -c/2 * (t*(t-2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    
    // Enhanced scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Contact form submit -> open Gmail compose prefilled to cloudclerks@gmail.com
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contact-name')?.value.trim() || '';
            const email = document.getElementById('contact-email')?.value.trim() || '';
            const message = document.getElementById('contact-message')?.value.trim() || '';
            const subject = `Website enquiry${name ? ' from ' + name : ''}`;
            const body = `${message}\n\n---\nFrom: ${name}\nReply to: ${email}`;

            // Build Gmail compose URL
            const params = new URLSearchParams({
                view: 'cm',
                to: 'cloudclerks@gmail.com',
                su: subject,
                body: body
            });
            const gmailUrl = `https://mail.google.com/mail/?${params.toString()}`;

            // Try to open Gmail in a new tab; fallback to mailto if blocked
            const win = window.open(gmailUrl, '_blank');
            if (!win) {
                const mailto = `mailto:cloudclerks@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailto;
            }
        });
    }
});