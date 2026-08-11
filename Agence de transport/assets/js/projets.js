document.addEventListener("DOMContentLoaded", () => {

/* =========================================
   AOS
========================================= */

if (window.AOS) {

    AOS.init({
        duration: 750,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
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

    navToggle.addEventListener("click", () => {

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

    });


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
   CATÉGORIES DE PROJETS
========================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );

const projectPanels =
    document.querySelectorAll(
        ".project-panel"
    );


function openProject(targetId) {

    if (!targetId) return;


    let targetPanel =
        document.getElementById(targetId);


    if (!targetPanel) {

        targetPanel =
            document.getElementById(
                "transport-routier"
            );

        targetId =
            "transport-routier";

    }


    /* Désactiver les panneaux */

    projectPanels.forEach(panel => {

        panel.classList.remove(
            "active"
        );

    });


    /* Désactiver les boutons */

    categoryButtons.forEach(button => {

        button.classList.remove(
            "active"
        );

        button.setAttribute(
            "aria-selected",
            "false"
        );

    });


    /* Activer le panneau */

    targetPanel.classList.add(
        "active"
    );


    /* Activer le bouton */

    const activeButton =
        document.querySelector(
            `.category-btn[data-target="${targetId}"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

        activeButton.setAttribute(
            "aria-selected",
            "true"
        );

    }


    /* Mettre à jour l'URL */

    history.replaceState(
        null,
        "",
        `#${targetId}`
    );


    /* Réinitialiser les animations AOS */

    if (window.AOS) {
        AOS.refresh();
    }

}


/* =========================================
   CLIC SUR UNE CATÉGORIE
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const target =
                button.dataset.target;

            openProject(target);


            /* Sur mobile, remonter légèrement
               vers les projets */

            if (window.innerWidth <= 600) {

                const projectContainer =
                    document.querySelector(
                        ".projects-container"
                    );

                if (projectContainer) {

                    setTimeout(() => {

                        projectContainer.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }

            }

        }
    );

});


/* =========================================
   OUVERTURE VIA HASH URL
========================================= */

const hash =
    window.location.hash.replace("#", "");


if (hash) {

    const validPanel =
        document.getElementById(hash);


    if (validPanel) {

        openProject(hash);

    } else {

        openProject(
            "transport-routier"
        );

    }

} else {

    openProject(
        "transport-routier"
    );

}


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
   ESCAPE : FERMER MENU MOBILE
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
    "MAGWET GROUP — Page projets chargée."
);
})