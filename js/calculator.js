document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const totalCostEl = document.getElementById('total-cost');
    const servicesList = document.getElementById('services-list');
    const resetButton = document.getElementById('reset-button');

    fetch('calculator-services.json')
        .then(response => response.json())
        .then(data => {
            for (const category in data) {
                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('mb-4');

                const categoryHeader = document.createElement('button');
                categoryHeader.type = 'button';
                categoryHeader.classList.add('w-full', 'text-left', 'p-4', 'bg-gray-700', 'hover:bg-gray-600', 'transition', 'rounded-lg', 'font-bold', 'flex', 'justify-between', 'items-center');
                categoryHeader.innerHTML = `
                    <span>${category}</span>
                    <i class="fas fa-chevron-down transition-transform"></i>
                `;

                const servicesContainer = document.createElement('div');
                servicesContainer.classList.add('hidden', 'pt-4', 'pl-4', 'border-l-2', 'border-gray-600', 'ml-4');

                data[category].forEach(service => {
                    const label = document.createElement('label');
                    label.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'rounded-lg', 'bg-gray-700/50', 'border', 'border-gray-600', 'hover:bg-gray-700', 'transition', 'cursor-pointer', 'mb-2');
                    label.innerHTML = `
                        <span>
                            <span class="font-bold">${service.name}</span>
                            <span class="text-sm text-gray-400 block">${service.description}</span>
                        </span>
                        <span class="text-lg font-bold text-green-400">$${service.price}</span>
                        <input type="checkbox" name="service" value="${service.price}" class="hidden">
                    `;
                    servicesContainer.appendChild(label);
                });

                categoryContainer.appendChild(categoryHeader);
                categoryContainer.appendChild(servicesContainer);
                servicesList.appendChild(categoryContainer);

                categoryHeader.addEventListener('click', () => {
                    servicesContainer.classList.toggle('hidden');
                    categoryHeader.querySelector('i').classList.toggle('rotate-180');
                });
            }
        })
        .catch(error => {
            console.error('Error fetching services:', error);
            servicesList.innerHTML = '<p class="text-red-500">Could not load services.</p>';
        });

    const packagesContainer = document.getElementById('packages-container');
    const packages = {
      "Blog Package": [
        "Basic Website"
      ],
      "E-Shop Package": [
        "Single Page Applications (React/Vue/Next.js)",
        "Backends with Node.js",
        "Custom UX/UI Design"
      ],
      "AI-Powered App Package": [
        "Smart Chatbots",
        "API Integrations"
      ]
    };

    packagesContainer.addEventListener('click', (e) => {
        const packageBtn = e.target.closest('.package-btn');
        if (!packageBtn) return;

        // Reset all current selections
        const allCheckboxes = form.querySelectorAll('input[name="service"]');
        allCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.checked = false;
                toggleSelectedStyle(checkbox.closest('label'), false);
            }
        });

        const packageName = packageBtn.dataset.package;
        const servicesInPackage = packages[packageName];

        if (servicesInPackage) {
            servicesInPackage.forEach(serviceName => {
                const checkbox = Array.from(allCheckboxes).find(cb => {
                    const label = cb.closest('label');
                    const nameSpan = label.querySelector('span > span.font-bold');
                    return nameSpan && nameSpan.textContent === serviceName;
                });

                if (checkbox) {
                    checkbox.checked = true;
                    toggleSelectedStyle(checkbox.closest('label'), true);
                }
            });
        }

        calculateTotal();
    });

    const calculateTotal = () => {
        let total = 0;
        const checkedServices = form.querySelectorAll('input[name="service"]:checked');
        checkedServices.forEach(service => {
            total += parseInt(service.value);
        });
        totalCostEl.textContent = `$${total}`;

        // Show/hide reset button
        if (total > 0) {
            resetButton.classList.remove('hidden');
        } else {
            resetButton.classList.add('hidden');
        }
    };

    const toggleSelectedStyle = (label, isSelected) => {
        if (isSelected) {
            label.classList.add('ring-2', 'ring-purple-500', 'bg-gray-700');
            label.classList.remove('bg-gray-700/50');
        } else {
            label.classList.remove('ring-2', 'ring-purple-500', 'bg-gray-700');
            label.classList.add('bg-gray-700/50');
        }
    };

    servicesList.addEventListener('change', (e) => {
        if (e.target.name === 'service') {
            const label = e.target.closest('label');
            toggleSelectedStyle(label, e.target.checked);
            calculateTotal();
        }
    });

    resetButton.addEventListener('click', () => {
        const checkedServices = form.querySelectorAll('input[name="service"]:checked');
        checkedServices.forEach(service => {
            service.checked = false;
            const label = service.closest('label');
            toggleSelectedStyle(label, false);
        });
        calculateTotal();
    });
});
