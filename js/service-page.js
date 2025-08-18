function renderServicePage() {
    const container = document.getElementById('service-detail-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const serviceKey = urlParams.get('id');
    if (!serviceKey) {
        container.innerHTML = '<p>Service not found.</p>';
        return;
    }

    Promise.all([
        fetch('services.json').then(res => res.json()),
        fetch('projects.json').then(res => res.json())
    ])
    .then(([services, projects]) => {
        const service = services.find(s => s.key === serviceKey);
        if (!service) {
            container.innerHTML = '<p>Service not found.</p>';
            return;
        }

        const relatedProjects = projects.filter(p => service.related_projects.includes(p.key));

        const title = i18n.t(`main_page_services.${service.key}.title`);
        const extended_desc = i18n.t(`service_page.${service.extended_description_key}`);
        const features_title = i18n.t('service_page.features_title', 'Key Features');
        const related_projects_title = i18n.t('service_page.related_projects_title', 'Related Projects');
        const get_quote_btn = i18n.t('service_page.get_quote_btn', 'Get a Quote');
        const get_quote_subtitle = i18n.t('service_page.get_quote_subtitle', 'Ready to start your project? Let\'s talk.');
        const contact_me_btn = i18n.t('hero.contact_btn', 'Contact Me');


        const featuresHtml = service.features.map(featureKey => `
            <li class="flex items-start">
                <i class="fas fa-check-circle text-purple-400 mr-3 mt-1"></i>
                <span>${i18n.t(`main_page_services.${service.key}.features.${featureKey}`)}</span>
            </li>
        `).join('');

        const projectsHtml = relatedProjects.map(project => `
            <div class="bg-gray-800/50 rounded-xl overflow-hidden group">
                <img src="${project.image}" alt="${i18n.t('projects.' + project.key + '.title')}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://via.placeholder.com/400x200?text=Image+not+found'">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${i18n.t('projects.' + project.key + '.title')}</h3>
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-block text-purple-400 hover:text-purple-300 transition font-medium">
                        ${i18n.t('projects.view_project_btn')} <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="text-center mb-16">
                <h1 class="text-5xl md:text-6xl font-bold mb-4 gradient-text">${title}</h1>
                <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">${extended_desc}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="md:col-span-2">
                    <h2 class="text-3xl font-bold mb-6">${features_title}</h2>
                    <ul class="space-y-4 text-lg">${featuresHtml}</ul>
                </div>
                <div class="text-center bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                    <h3 class="text-2xl font-bold mb-4">${get_quote_btn}</h3>
                    <p class="text-gray-400 mb-6">${get_quote_subtitle}</p>
                    <a href="index.html#contact" class="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium hover:opacity-90 transition">
                        ${contact_me_btn}
                    </a>
                </div>
            </div>

            ${relatedProjects.length > 0 ? `
            <div class="mt-20">
                <h2 class="text-3xl font-bold mb-8 text-center">${related_projects_title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${projectsHtml}
                </div>
            </div>
            ` : ''}
        `;
    })
    .catch(error => {
        console.error('Error building service page:', error);
        container.innerHTML = '<p>Error loading service details.</p>';
    });
}
