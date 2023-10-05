document.addEventListener('DOMContentLoaded', startPage);
function startPage() {

    "use strict"

    //Form containers
    let firstFormContainer = document.querySelector(".first-form");
    let loginFormContainer = document.querySelector(".login-form");
    let signFormContainer = document.querySelector(".sign-form");

    //First form buttons.
    let firstLoginBtn = document.querySelector("#first-login-btn");
    let firstSignBtn = document.querySelector("#first-sign-btn");


    let loginForm = document.querySelector("#form-login");
    let signForm = document.querySelector("#form-register");

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
        document.querySelector("body").appendChild(getSpinnerTag());
        activateSpinner();

    });

    signForm.addEventListener("submit", (e) => {
        e.preventDefault();
        document.querySelector("body").appendChild(getSpinnerTag());
        activateSpinner();
    });

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

        setTimeout(() => {
            window.location.replace("index.html");
        }, 5000);

        let status = 10;
        setInterval(() => {
            console.log(status)
            spinnerStatus.innerHTML = `${status}%`;
            if(status < 100)
                status += 5;
        }, 242)
    }
    
}