const i18n = {
    lng: 'en',
    resources: {},
    async init() {
        try {
            const en = await fetch('locales/en/translation.json').then(res => res.json());
            const es = await fetch('locales/es/translation.json').then(res => res.json());
            this.resources = { en: { translation: en }, es: { translation: es } };

            this.renderAllContent();
            this.setupSwitcher();

        } catch (error) {
            console.error("Error loading translation files:", error);
        }
    },
    t(key) {
        const keys = key.split('.');
        let value = this.resources[this.lng]?.translation;
        for (const k of keys) {
            if (value === undefined) return key;
            value = value[k];
        }
        return value || key;
    },
    renderAllContent() {
        // Update static content with data-i18n tags
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = this.t(el.dataset.i18n);
        });

        // Render dynamic content
        if (typeof renderIndexPageContent === 'function') {
            renderIndexPageContent();
        }
        if (typeof renderCalculatorContent === 'function') {
            renderCalculatorContent();
        }
    },
    changeLanguage(lng) {
        this.lng = lng;
        this.renderAllContent();
        this.updateLangButtons();
    },
    setupSwitcher() {
        const langEnBtn = document.getElementById('lang-en');
        const langEsBtn = document.getElementById('lang-es');
        if (langEnBtn && langEsBtn) {
            langEnBtn.addEventListener('click', () => this.changeLanguage('en'));
            langEsBtn.addEventListener('click', () => this.changeLanguage('es'));
            this.updateLangButtons();
        }
    },
    updateLangButtons() {
        const langEnBtn = document.getElementById('lang-en');
        const langEsBtn = document.getElementById('lang-es');
        if (langEnBtn && langEsBtn) {
            if (this.lng === 'en') {
                langEnBtn.classList.add('active', 'font-bold', 'text-white');
                langEsBtn.classList.remove('active', 'font-bold', 'text-white');
            } else if (this.lng === 'es') {
                langEsBtn.classList.add('active', 'font-bold', 'text-white');
                langEnBtn.classList.remove('active', 'font-bold', 'text-white');
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => i18n.init());
