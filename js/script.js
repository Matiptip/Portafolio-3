function renderIndexPageContent() {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                portfolioContainer.innerHTML = ''; // Clear existing content
                projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('bg-gray-800', 'rounded-xl', 'overflow-hidden', 'group', 'transition', 'hover:shadow-lg', 'hover:shadow-purple-500/10');

                    const title = i18n.t('projects.' + project.key + '.title');
                    const description = i18n.t('projects.' + project.key + '.description');
                    const viewProject = i18n.t('projects.view_project_btn');

                    projectCard.innerHTML = `
                        <div class="relative">
                            <img src="${project.image}" alt="${title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x200?text=Image+not+found'">
                            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2">${title}</h3>
                            <p class="text-gray-400 mb-4 h-24 overflow-hidden">${description}</p>
                            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-block text-purple-400 hover:text-purple-300 transition font-medium">
                                ${viewProject} <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    `;
                    portfolioContainer.appendChild(projectCard);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                portfolioContainer.innerHTML = `<p class="text-center text-gray-400 col-span-full">${i18n.t('projects.load_error')}</p>`;
            });
    }
    // Note: Services swiper is not yet translated.
}

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        const openIcon = document.getElementById('mobile-menu-open-icon');
        const closeIcon = document.getElementById('mobile-menu-close-icon');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Initialize Swiper for services
    if (document.querySelector('.service-swiper')) {
        new Swiper('.service-swiper', {
            loop: true,
            spaceBetween: 30,
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }
});
