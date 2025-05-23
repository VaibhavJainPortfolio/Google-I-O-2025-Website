const navLinksData = [
    { title: "Home", file: "index.html" },
    { title: "Gemini Updates", file: "gemini-updates-spa.html" },
    { title: "Gemini AI Everywhere", file: "gemini-ai-everywhere-spa.html" },
    { title: "Gemini Live", file: "gemini-live-spa.html" },
    { title: "AI in Workspace", file: "ai-in-workspace-everyday-tools-spa.html" },
    { title: "Developer Tools", file: "developer-tools-ai-for-building-spa.html" },
    { title: "Generative AI for Creators", file: "generative-ai-for-creators-spa.html" },
    { title: "AI Subscriptions", file: "ai-subscriptions-spa.html" },
    { title: "Android XR", file: "android-xr-spa.html" },
    { title: "Google Beam", file: "google-beam-spa.html" },
    { title: "The Future is AI", file: "the-future-is-ai-powered-spa.html" },
    { title: "Other Mentions", file: "other-notable-mentions-spa.html" }
];

function initializeNavigation() {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    // Create mobile menu button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden p-2 rounded-lg hover:bg-sky-700 transition-colors duration-200';
    mobileMenuButton.setAttribute('aria-label', 'Toggle menu');
    mobileMenuButton.innerHTML = `
        <div class="w-6 h-5 relative flex flex-col justify-between">
            <span class="w-full h-0.5 bg-white transform transition-all duration-300"></span>
            <span class="w-full h-0.5 bg-white transform transition-all duration-300"></span>
            <span class="w-full h-0.5 bg-white transform transition-all duration-300"></span>
        </div>
    `;

    // Create navigation list
    const navList = document.createElement('ul');
    navList.className = 'hidden md:flex flex-wrap justify-center gap-x-4 gap-y-2 overflow-x-auto pb-2';

    // Add navigation links
    navLinksData.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.file;
        a.textContent = link.title;
        a.className = 'text-white hover:text-sky-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-sky-700/50';
        
        // Add active state
        if (window.location.pathname.endsWith(link.file)) {
            a.classList.add('bg-sky-700', 'font-medium');
        }
        
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Add mobile menu functionality
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Animate hamburger button
        const spans = mobileMenuButton.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].classList.add('rotate-45', 'translate-y-2');
            spans[1].classList.add('opacity-0');
            spans[2].classList.add('-rotate-45', '-translate-y-2');
            navList.classList.remove('hidden');
            navList.classList.add('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'right-0', 'bg-sky-800', 'p-4', 'shadow-lg');
        } else {
            spans[0].classList.remove('rotate-45', 'translate-y-2');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('-rotate-45', '-translate-y-2');
            navList.classList.add('hidden');
            navList.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'right-0', 'bg-sky-800', 'p-4', 'shadow-lg');
        }
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('nav')) {
            toggleMenu();
        }
    });

    // Add shadow to header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Insert elements into the DOM
    navContainer.appendChild(mobileMenuButton);
    navContainer.appendChild(navList);
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavigation);
