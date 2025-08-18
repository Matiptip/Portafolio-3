// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('mobile-menu-open-icon');
const closeIcon = document.getElementById('mobile-menu-close-icon');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
});

// Initialize Swiper
const swiper = new Swiper('.service-swiper', {
  // Optional parameters
  loop: true,
  spaceBetween: 30,

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.getElementById('portfolio-container');

    if (portfolioContainer) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('bg-gray-800', 'rounded-xl', 'overflow-hidden', 'group', 'transition', 'hover:shadow-lg', 'hover:shadow-purple-500/10');

                    const title = i18next.t('projects.' + project.key + '.title');
                    const description = i18next.t('projects.' + project.key + '.description');

                    projectCard.innerHTML = `
                        <div class="relative">
                            <img src="${project.image}" alt="${title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x200?text=Image+not+found'">
                            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2">${title}</h3>
                            <p class="text-gray-400 mb-4 h-24 overflow-hidden">${description}</p>
                            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-block text-purple-400 hover:text-purple-300 transition font-medium">
                                View Project <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    `;
                    portfolioContainer.appendChild(projectCard);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                portfolioContainer.innerHTML = '<p class="text-center text-gray-400 col-span-full">Could not load projects.</p>';
            });
    }
});
