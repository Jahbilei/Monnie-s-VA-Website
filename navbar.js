// components/navbar.js

class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<style>
        /* FIX: Replaced var(--orange-400) with the hex code (#e54d24) for reliability */
        .nav-item-effect {
            position: relative;
            display: inline-block; 
        }

        .nav-item-effect::after {
            content: '';
            position: absolute;
            bottom: -5px; 
            left: 0;
            width: 0; 
            height: 2px; 
            /* Fixed color code for the sliding line */
            background-color: #e54d24; 
            
            transition: width 0.3s ease-out;
        }

        .nav-item-effect:hover::after {
            width: 100%; 
        }

        /* --- NEW STYLES FOR BUTTON GLOW AND ACTIVE EFFECT --- */
        .nav-button-glow:hover {
            box-shadow: 0 0 10px #f28b6f, 0 0 20px #e54d24; /* Subtle glow on hover */
            transition: box-shadow 0.3s ease-in-out;
        }
        
        /* This is the GLOW WHEN CLICKED/PRESSED */
        .nav-button-glow:active {
            /* Intense shadow for the "glow" on click, using the rose-gold colors */
            box-shadow: 0 0 15px #f28b6f, 0 0 30px #e54d24, 0 0 50px #e54d24;
            /* Scale down slightly to give a "press" effect */
            transform: scale(0.98); 
            transition: box-shadow 0.1s ease-out, transform 0.1s ease-out;
        }
        /* --------------------------------------------------- */
      </style>
      
      <nav class="fixed top-0 left-0 right-0 z-50 bg-charcoal/90 backdrop-blur-sm shadow-md text-white">
        <div class="max-w-7xl mx-auto px-4 md:px-8">
          <div class="flex justify-between items-center h-20">
            
            <a href="#home" class="font-serif text-2xl font-bold text-rose-gold">
              <span class="text-white">Your VA: Monnie</span>
            </a>
            
            <div class="hidden md:flex items-center space-x-6">
              <ul class="flex space-x-6 text-lg">
                <li><a href="#home" class="nav-item-effect hover:text-rose-gold">Home</a></li>
                <li><a href="#about" class="nav-item-effect hover:text-rose-gold">About</a></li>
                <li><a href="#services" class="nav-item-effect hover:text-rose-gold">Services</a></li>
                <li><a href="#packages" class="nav-item-effect hover:text-rose-gold">Packages</a></li>
              </ul>
              <a href="#contact" class="bg-rose-gold text-white px-5 py-2 rounded-full font-semibold nav-button-glow">
                Contact
              </a>
            </div>
            
            <button id="menu-toggle-btn" class="md:hidden p-2">
              <i data-feather="menu" class="w-7 h-7"></i>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-charcoal/90 backdrop-blur-sm">
          <ul class="flex flex-col items-center py-4 space-y-2 text-white">
            <li><a href="#home" class="block py-2 nav-item-effect hover:text-rose-gold">Home</a></li>
            <li><a href="#about" class="block py-2 nav-item-effect hover:text-rose-gold">About</a></li>
            <li><a href="#services" class="block py-2 nav-item-effect hover:text-rose-gold">Services</a></li>
            <li><a href="#packages" class="block py-2 nav-item-effect hover:text-rose-gold">Packages</a></li>
            <li class="py-2">
              <a href="#contact" class="bg-rose-gold text-white px-5 py-2 rounded-full font-semibold nav-button-glow">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    `;

    // --- JavaScript Logic for Toggling the Menu (No changes here) ---
    const toggleBtn = this.querySelector('#menu-toggle-btn');
    const mobileMenu = this.querySelector('#mobile-menu');

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);
