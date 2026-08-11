document.addEventListener("DOMContentLoaded", () => {
/* =========================================
   AOS — ANIMATIONS
========================================= */

if (window.AOS) {

    AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });

}


/* =========================================
   ANNÉE AUTOMATIQUE
========================================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   MENU MOBILE
========================================= */

const navToggle =
    document.getElementById("navToggle");

const navList =
    document.getElementById("navList");


if (navToggle && navList) {

    navToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navList.classList.toggle("open");


            navToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            const icon =
                navToggle.querySelector("i");


            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        }
    );


    /* Fermer après clic */

    navList.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navList.classList.remove(
                        "open"
                    );

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        navToggle.querySelector("i");


                    if (icon) {

                        icon.classList.add(
                            "fa-bars"
                        );

                        icon.classList.remove(
                            "fa-xmark"
                        );

                    }

                }
            );

        });

}


/* =========================================
   HEADER AU SCROLL
========================================= */

const header =
    document.getElementById("siteHeader");


const updateHeader =
    () => {

        if (!header) return;


        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    };


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =========================================
   BOUTON RETOUR EN HAUT
========================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


const updateBackToTop =
    () => {

        if (!backToTop) return;


        if (window.scrollY > 400) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    };


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


updateBackToTop();


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   COMPTEURS
========================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );


        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 60)
            );


        const updateCounter =
            () => {

                current += increment;


                if (current >= target) {

                    counter.textContent =
                        target + "+";

                    return;

                }


                counter.textContent =
                    current;


                requestAnimationFrame(
                    updateCounter
                );

            };


        updateCounter();

    });

}


/* Déclencher les compteurs
   lorsque la section apparaît */

const numbersSection =
    document.querySelector(
        ".numbers-section"
    );


if (
    numbersSection &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        startCounters();

                        observer.disconnect();

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    observer.observe(
        numbersSection
    );

} else {

    startCounters();

}


/* =========================================
   ESC — FERMER MENU
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        if (!navList || !navToggle) {
            return;
        }


        navList.classList.remove(
            "open"
        );


        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        const icon =
            navToggle.querySelector("i");


        if (icon) {

            icon.classList.add(
                "fa-bars"
            );

            icon.classList.remove(
                "fa-xmark"
            );

        }

    }
);


console.log(
    "MAGWET GROUP — Page À propos chargée."
);

});
