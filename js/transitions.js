document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        // Check if the link is internal and not a hash link
        if (link.hostname === window.location.hostname && !link.href.includes('#')) {
            link.addEventListener('click', e => {
                e.preventDefault();
                const destination = link.href;
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = destination;
                }, 500); // Match the animation duration
            });
        }
    });
});
