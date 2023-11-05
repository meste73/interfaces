document.addEventListener('DOMContentLoaded', startPage);
function startPage() {

    "use strict"

    let logo = document.querySelector("#logo-form-page");

    //Form containers
    let firstFormContainer = document.querySelector(".first-form");
    let loginFormContainer = document.querySelector(".login-form");
    let signFormContainer = document.querySelector(".sign-form");

    //First form buttons.
    let firstLoginBtn = document.querySelector("#first-login-btn");
    let firstSignBtn = document.querySelector("#first-sign-btn");

    //Form submits
    let loginForm = document.querySelector("#form-login");
    let signForm = document.querySelector("#form-register");

    //Pop up success
    let popUp = document.querySelector(".pop-up-exitoso");

    firstLoginBtn.addEventListener("click", () => {
        firstFormContainer.classList.add("oculto");
        loginFormContainer.classList.remove("oculto");
    });

    firstSignBtn.addEventListener("click", () => {
        firstFormContainer.classList.add("oculto");
        signFormContainer.classList.remove("oculto");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        animationSuccess("logueado");
    });

    signForm.addEventListener("submit", (e) => {
        e.preventDefault();
        animationSuccess("registrado");
    });

    logo.addEventListener('click', () => {
        window.location.replace("home.html");
    });

    function animationSuccess(msg){
        popUp.classList.add("display-flex");
        popUp.classList.add("opacity-1-transition");
        document.querySelector("#success-msg").innerHTML = `¡Te has ${msg} exitosamente!`;
        setTimeout(() => {
            window.location.replace("home.html");
        },2000);
    }
}