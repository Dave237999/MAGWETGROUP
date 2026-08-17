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

document.addEventListener("DOMContentLoaded", function() {
    // ==========================================
    // 1. GESTION DU MENU MOBILE (HAMBURGER)
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêche la propagation du clic
            navList.classList.toggle('open');
            
            // Changement d'icône (barres <-> croix si tu utilises FontAwesome)
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Fermer le menu si on clique n'importe où ailleurs sur la page
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    }

    // ==========================================
    // 2. OBSERVATEUR D'ANIMATION (REVEAL)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('[class*="reveal-"]');
    revealElements.forEach(el => observer.observe(el));
});