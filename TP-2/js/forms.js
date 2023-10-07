document.addEventListener('DOMContentLoaded', startPage);
function startPage() {

    "use strict"

    let logo = document.querySelector("#logo-form-page");

    //Form containers
    let firstFormContainer = document.querySelector(".first-form");
    let loginFormContainer = document.querySelector(".login-form");
    let signFormContainer = document.querySelector(".sign-form");
    let body = document.querySelector("body");

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
        window.scrollTo(0, 0);
        animationSuccess("logueado");
    });

    signForm.addEventListener("submit", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
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
            body.appendChild(getSpinnerTag());
            activateSpinner();
        },2000);
    }

    let divSpinnerNode = document.createElement("div");
    let divSpinner = document.createElement("div");
    let spanStatus = document.createElement("span");

    function getSpinnerTag(){

        divSpinnerNode.classList.add("spinner");
        divSpinner.classList.add("lds-spinner");
        spanStatus.classList.add("spinner-status");

        spanStatus.appendChild(document.createTextNode("0%"));

        for (let index = 0; index < 12; index++) {
            divSpinner.innerHTML += "<div></div>";   
        }

        divSpinnerNode.appendChild(divSpinner);
        divSpinnerNode.appendChild(spanStatus);

        return divSpinnerNode;
    }

    function activateSpinner(){

        let spinnerStatus = document.querySelector(".spinner-status");
        document.querySelector("body").classList.add("form-hide");
        popUp.classList.add("z-index-0");
        setTimeout(() => {
            window.location.replace("home.html");
        }, 4900);

        let status = 10;
        setInterval(() => {
            spinnerStatus.innerHTML = `${status}%`;
            if(status < 100)
                status += 1;
        }, 38)
    }
}