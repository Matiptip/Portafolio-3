function renderServicesSwiper() {
    const swiperWrapper = document.querySelector('.service-swiper .swiper-wrapper');
    if (!swiperWrapper) return;

    fetch('services.json')
        .then(response => response.json())
        .then(services => {
            swiperWrapper.innerHTML = ''; // Clear existing content
            services.forEach(service => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                const title = i18n.t(`main_page_services.${service.key}.title`);
                const description = i18n.t(`main_page_services.${service.key}.description`);
                const getStartedBtn = i18n.t('services_section.get_started_btn');

                const featuresHtml = service.features.map(featureKey => `
                    <li class="flex items-center">
                        <i class="fas fa-check-circle text-green-500 mr-2"></i>
                        <span>${i18n.t(`main_page_services.${service.key}.features.${featureKey}`)}</span>
                    </li>
                `).join('');

                slide.innerHTML = `
                    <div id="${service.key}" class="section-card bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-${service.color}/30 h-full flex flex-col">
                        <div class="w-16 h-16 bg-${service.color}/10 rounded-lg flex items-center justify-center mb-6 glow">
                            <i class="${service.icon} text-3xl text-${service.color}"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4">${title}</h3>
                        <p class="text-gray-400 mb-6 flex-grow">${description}</p>
                        <ul class="space-y-3 mb-8">${featuresHtml}</ul>
                        <a href="service.html?id=${service.key}" class="inline-block px-6 py-2 border border-${service.color} text-${service.color} rounded-full hover:bg-${service.color}/10 transition mt-auto">
                            ${getStartedBtn}
                        </a>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });

            // Initialize Swiper for services, waiting for the library to load
            const initSwiper = () => {
                if (typeof Swiper !== 'undefined') {
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
                } else {
                    setTimeout(initSwiper, 100);
                }
            };
            initSwiper();
        })
        .catch(error => {
            console.error('Error fetching services:', error);
            swiperWrapper.innerHTML = `<p class="text-center text-gray-400 col-span-full">${i18n.t('services.load_error')}</p>`;
        });
}

function renderIndexPageContent() {
    renderServicesSwiper();

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
});
