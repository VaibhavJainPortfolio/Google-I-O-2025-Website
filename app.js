/**
 * SPA Application for Google I/O 2025 Website
 * Handles content loading, routing, and navigation state management
 */

// Store page content cache
const pageCache = {};

// Define page routes and titles
const pages = [
    { id: 'home', title: 'Exploring AI Mode in Search', file: 'index.html' },
    { id: 'gemini-updates', title: 'Gemini Updates', file: 'gemini-updates-spa.html' },
    { id: 'gemini-ai-everywhere', title: 'Gemini AI Everywhere', file: 'gemini-ai-everywhere-spa.html' },
    { id: 'gemini-live', title: 'Gemini Live', file: 'gemini-live-spa.html' },
    { id: 'ai-in-workspace', title: 'AI in Workspace', file: 'ai-in-workspace-everyday-tools-spa.html' },
    { id: 'developer-tools', title: 'Developer Tools', file: 'developer-tools-ai-for-building-spa.html' },
    { id: 'generative-ai-for-creators', title: 'Generative AI for Creators', file: 'generative-ai-for-creators-spa.html' },
    { id: 'ai-subscriptions', title: 'AI Subscriptions', file: 'ai-subscriptions-spa.html' },
    { id: 'android-xr', title: 'Android XR', file: 'android-xr-spa.html' },
    { id: 'google-beam', title: 'Google Beam', file: 'google-beam-spa.html' },
    { id: 'the-future-is-ai', title: 'The Future is AI', file: 'the-future-is-ai-powered-spa.html' },
    { id: 'other-mentions', title: 'Other Mentions', file: 'other-notable-mentions-spa.html' }
];

/**
 * Initialize the SPA application
 */
function initApp() {
    // Set up navigation
    initializeNavigation();
    
    // Set up routing
    window.addEventListener('hashchange', handleRouteChange);
    
    // Load initial content
    handleRouteChange();
    
    // Set up any global event listeners
    setupEventListeners();
}

/**
 * Initialize the navigation menu
 */
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
    navList.id = 'nav-list';

    // Add navigation links
    pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${page.id}`;
        a.textContent = page.title;
        a.className = 'nav-link text-white hover:text-sky-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-sky-700/50';
        a.dataset.page = page.id;
        
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

/**
 * Handle route changes
 */
function handleRouteChange() {
    // Get the current hash (without the # symbol)
    let pageId = window.location.hash.substring(1);
    
    // Default to home if no hash is present
    if (!pageId) {
        pageId = 'home';
        window.location.hash = '#home';
        return; // This will trigger another hashchange event
    }
    
    // Find the page configuration
    const page = pages.find(p => p.id === pageId);
    if (!page) {
        console.error(`Page not found: ${pageId}`);
        pageId = 'home';
        window.location.hash = '#home';
        return;
    }
    
    // Update active state in navigation
    updateActiveNavLink(pageId);
    
    // Update page title
    document.title = `Google I/O 2025: ${page.title}`;
    
    // Load the page content
    loadPageContent(page);
}

/**
 * Update the active state in navigation
 */
function updateActiveNavLink(pageId) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'bg-sky-700', 'font-medium');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active', 'bg-sky-700', 'font-medium');
    }
}

/**
 * Load page content
 */
async function loadPageContent(page) {
    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) {
        console.error('Content container not found');
        return;
    }
    
    // Show loading state
    contentContainer.innerHTML = '<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700"></div></div>';
    
    try {
        // Check if content is cached
        if (pageCache[page.id]) {
            contentContainer.innerHTML = pageCache[page.id];
            initPageScripts(page.id);
            return;
        }
        
        // Fetch the page content
        const response = await fetch(page.file);
        if (!response.ok) {
            throw new Error(`Failed to load page: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Extract the main content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const mainContent = doc.querySelector('main');
        
        if (!mainContent) {
            throw new Error('Main content not found in page');
        }
        
        // Cache the content
        pageCache[page.id] = mainContent.innerHTML;
        
        // Update the content container
        contentContainer.innerHTML = mainContent.innerHTML;
        
        // Initialize any page-specific scripts
        initPageScripts(page.id);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
    } catch (error) {
        console.error('Error loading page content:', error);
        contentContainer.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline"> Failed to load page content. Please try again later.</span>
            </div>
        `;
    }
}

/**
 * Initialize page-specific scripts
 */
function initPageScripts(pageId) {
    // Re-initialize any charts or other dynamic content
    if (pageId === 'home' && window.Chart && document.getElementById('aiSearchChart')) {
        initHomeCharts();
    }
    
    if (pageId === 'gemini-updates' && window.Chart && document.getElementById('geminiPerformanceChart')) {
        initGeminiCharts();
    }
    
    // Add other page-specific initializations as needed
}

/**
 * Initialize charts for the home page
 */
function initHomeCharts() {
    if (!window.Chart || !document.getElementById('aiSearchChart')) return;
    
    const ctx = document.getElementById('aiSearchChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.aiSearchChart) {
        window.aiSearchChart.destroy();
    }
    
    window.aiSearchChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Traditional Search', 'AI Mode Basic', 'AI Mode with Deep Search'],
            datasets: [{
                label: 'Relative Information Depth',
                data: [30, 65, 100],
                backgroundColor: [
                    'rgba(107, 114, 128, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(2, 132, 199, 0.7)'
                ],
                borderColor: [
                    'rgba(107, 114, 128, 1)',
                    'rgba(14, 165, 233, 1)',
                    'rgba(2, 132, 199, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Information Depth Score'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.raw}/100`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize charts for the Gemini Updates page
 */
function initGeminiCharts() {
    if (!window.Chart || !document.getElementById('geminiPerformanceChart')) return;
    
    const ctx = document.getElementById('geminiPerformanceChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.geminiPerformanceChart) {
        window.geminiPerformanceChart.destroy();
    }
    
    window.geminiPerformanceChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Reasoning', 'Efficiency', 'Multimodal', 'Security', 'Long Context'],
            datasets: [
                {
                    label: 'Gemini 2.0',
                    data: [70, 65, 75, 60, 65],
                    backgroundColor: 'rgba(107, 114, 128, 0.2)',
                    borderColor: 'rgba(107, 114, 128, 0.8)',
                    pointBackgroundColor: 'rgba(107, 114, 128, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(107, 114, 128, 1)'
                },
                {
                    label: 'Gemini 2.5 Flash',
                    data: [75, 90, 80, 85, 70],
                    backgroundColor: 'rgba(14, 165, 233, 0.2)',
                    borderColor: 'rgba(14, 165, 233, 0.8)',
                    pointBackgroundColor: 'rgba(14, 165, 233, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(14, 165, 233, 1)'
                },
                {
                    label: 'Gemini 2.5 Pro',
                    data: [95, 80, 90, 85, 95],
                    backgroundColor: 'rgba(2, 132, 199, 0.2)',
                    borderColor: 'rgba(2, 132, 199, 0.8)',
                    pointBackgroundColor: 'rgba(2, 132, 199, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(2, 132, 199, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
