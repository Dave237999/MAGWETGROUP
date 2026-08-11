document.addEventListener("DOMContentLoaded", () => {
/* =========================================
   AOS
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

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
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


    navList
        .querySelectorAll("a")
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


function updateHeader() {

    if (!header) return;


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =========================================
   RETOUR EN HAUT
========================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


function updateBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


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
   NAVIGATION VERS LES SERVICES
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    history.replaceState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });


/* =========================================
   FERMETURE MENU AVEC ESC
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
    "MAGWET GROUP — Services chargé."
);

});
