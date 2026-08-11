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
    document.getElementById("backToTop");


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
   FORMULAIRE
========================================= */

const form =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const submitBtn =
    document.getElementById("submitBtn");


if (!form) return;


const fields = {

    name: document.getElementById("name"),

    email: document.getElementById("email"),

    phone: document.getElementById("phone"),

    message: document.getElementById("message")

};


function showError(
    field,
    message
) {

    const group =
        field.closest(".form-group");

    const error =
        group.querySelector(
            ".error-message"
        );


    group.classList.add("error");
    group.classList.remove("success");

    error.textContent = message;

}


function showSuccess(field) {

    const group =
        field.closest(".form-group");

    const error =
        group.querySelector(
            ".error-message"
        );


    group.classList.remove("error");
    group.classList.add("success");

    error.textContent = "";

}


function clearValidation() {

    form
        .querySelectorAll(".form-group")
        .forEach(group => {

            group.classList.remove(
                "error",
                "success"
            );

            const error =
                group.querySelector(
                    ".error-message"
                );

            if (error) {
                error.textContent = "";
            }

        });

}


function validEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


function validateForm() {

    let valid = true;


    const name =
        fields.name.value.trim();

    const email =
        fields.email.value.trim();

    const message =
        fields.message.value.trim();


    if (!name) {

        showError(
            fields.name,
            "Veuillez renseigner votre nom."
        );

        valid = false;

    } else if (name.length < 2) {

        showError(
            fields.name,
            "Le nom doit contenir au moins 2 caractères."
        );

        valid = false;

    } else {

        showSuccess(fields.name);

    }


    if (!email) {

        showError(
            fields.email,
            "Veuillez renseigner votre adresse email."
        );

        valid = false;

    } else if (!validEmail(email)) {

        showError(
            fields.email,
            "Veuillez entrer une adresse email valide."
        );

        valid = false;

    } else {

        showSuccess(fields.email);

    }


    if (!message) {

        showError(
            fields.message,
            "Veuillez saisir votre message."
        );

        valid = false;

    } else if (message.length < 10) {

        showError(
            fields.message,
            "Votre message doit contenir au moins 10 caractères."
        );

        valid = false;

    } else {

        showSuccess(fields.message);

    }


    return valid;

}


/* =========================================
   SOUMISSION
========================================= */

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        clearValidation();


        formMessage.className =
            "form-message";

        formMessage.textContent = "";


        if (!validateForm()) {

            formMessage.textContent =
                "Veuillez corriger les champs indiqués.";

            formMessage.classList.add(
                "error"
            );

            return;

        }


        if (submitBtn) {

            submitBtn.disabled = true;

            submitBtn.innerHTML = `
                <span>Envoi en cours...</span>
                <i class="fas fa-spinner fa-spin"></i>
            `;

        }


        /*
         * Simulation d'envoi.
         *
         * Pour un véritable envoi,
         * connecte ce formulaire à ton
         * backend Django ou à une API.
         */

        setTimeout(() => {

            formMessage.textContent =
                "Merci ! Votre message a bien été enregistré. Notre équipe vous répondra prochainement.";

            formMessage.classList.add(
                "success"
            );


            form.reset();


            clearValidation();


            if (submitBtn) {

                submitBtn.disabled = false;

                submitBtn.innerHTML = `
                    <span>Envoyer le message</span>
                    <i class="fas fa-arrow-right"></i>
                `;

            }

        }, 1000);

    }
);


/* =========================================
   VALIDATION EN DIRECT
========================================= */

Object.values(fields)
    .filter(Boolean)
    .forEach(field => {

        field.addEventListener(
            "input",
            () => {

                const group =
                    field.closest(".form-group");

                const error =
                    group.querySelector(
                        ".error-message"
                    );


                group.classList.remove(
                    "error"
                );

                if (error) {
                    error.textContent = "";
                }

            }
        );

    });


/* =========================================
   FERMETURE DU MENU AVEC ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navList
        ) {

            navList.classList.remove(
                "open"
            );

            navToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);

});
