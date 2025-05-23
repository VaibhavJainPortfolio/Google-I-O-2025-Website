
const navLinksData = [
    { title: 'Gemini & AI Everywhere', file: './gemini-ai-everywhere-spa.html' },
    { title: 'Gemini Updates', file: './gemini-updates-spa.html' },
    { title: 'AI Mode in Search', file: './index.html' },
    { title: 'Google Beam', file: './google-beam-spa.html' },
    { title: 'Generative AI for Creators', file: './generative-ai-for-creators-spa.html' },
    { title: 'Android XR', file: './android-xr-spa.html' },
    { title: 'Gemini Live', file: './gemini-live-spa.html' },
    { title: 'AI Subscriptions', file: './ai-subscriptions-spa.html' },
    { title: 'Workspace & Tools', file: './ai-in-workspace-everyday-tools-spa.html' },
    { title: 'Developer Tools', file: './developer-tools-ai-for-building-spa.html' },
    // { title: 'Healthcare AI', file: './healthcare-ai-spa.html' }, // Removed due to missing file
    { title: 'Other Mentions', file: './other-notable-mentions-spa.html' }
];

const navContainer = document.getElementById('navigation');
if (navContainer) {
    const navList = document.createElement('ul');
    navList.className = "flex flex-wrap gap-4 justify-center p-4 bg-gray-100 shadow";

    navLinksData.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link.file}" class="text-blue-600 hover:text-blue-800 font-semibold">${link.title}</a>`;
        navList.appendChild(li);
    });

    navContainer.appendChild(navList);
}
