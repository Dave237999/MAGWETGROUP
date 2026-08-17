document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Déclenche l'animation un peu avant que l'élément n'arrive tout en bas
        threshold: 0.15 // 15% de l'élément visible pour déclencher
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Si tu veux que l'animation se joue une seule fois :
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Cible tous les éléments possédant une classe "reveal-"
    const revealElements = document.querySelectorAll('[class*="reveal-"]');
    revealElements.forEach(el => observer.observe(el));
});