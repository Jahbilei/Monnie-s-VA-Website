class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    width: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    background-color: rgba(28, 37, 51, 0.85);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                }
                
                .navbar-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-family: 'Lora', serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    text-decoration: none;
                }
                
                .logo span {
                    color: #e54d24;
}
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s;
                    position: relative;
                }
                
                .nav-link:hover {
                    color: #e54d24; /* theme orange */
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #e54d24;
                    transition: width 0.3s;
                }

                .nav-link:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: rgba(28, 37, 51, 0.95);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        flex-direction: column;
                        align-items: center;
                        padding: 1rem 0;
                        gap: 1rem;
                        transform: translateY(-150%);
                        transition: transform 0.3s ease;
                        z-index: 999;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    }
                    
                    .nav-links.active {
                        transform: translateY(0);
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                }
            </style>
            <div class="navbar-container">
                <a href="#home" class="logo">Monnie<span>.</span></a>
                <nav class="nav-links">
                    <a href="#home" class="nav-link">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#services" class="nav-link">Services</a>
                    <a href="#packages" class="nav-link">Packages</a>
                    <a href="#contact" class="nav-link">Contact</a>
                </nav>
<button class="mobile-menu-btn">
                    <i data-feather="menu"></i>
                </button>
            </div>
        `;
        // Initialize mobile menu toggle
        const menuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            feather.replace();
        });
// Replace icons
        this.shadowRoot.querySelectorAll('i').forEach(icon => {
            feather.replace(icon);
        });
        // Enhanced scroll behavior for navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                this.classList.add('scrolled');
            } else {
                this.classList.remove('scrolled');
            }
        });

        // Add keyboard navigation support
        this.shadowRoot.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('focus', () => {
                link.classList.add('focus-visible');
            });
            link.addEventListener('blur', () => {
                link.classList.remove('focus-visible');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
}
}


customElements.define('custom-navbar', CustomNavbar);
