document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const totalCostEl = document.getElementById('total-cost');
    const servicesList = document.getElementById('services-list');
    const resetButton = document.getElementById('reset-button');

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
