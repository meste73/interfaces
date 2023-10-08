document.addEventListener('DOMContentLoaded', startPage);

function startPage() {

    "use strict"

    let body = document.querySelector("body");

    let homeLogo = document.querySelector('#home-logo');

    let navBtn = document.querySelector('#nav-btn');
    let navList = document.querySelector('.nav-bar');

    let btnCarrito = document.querySelector('#id-carrito');
    let menuCarrito = document.querySelector('#menu-nav');

    let btnUsuario = document.querySelector('#id-usuario');
    let menuUsuario = document.querySelector('#user-nav');
    let closeSessionBtn = document.querySelector('#close-session');

    let navCategoriasH3 = document.querySelectorAll('.nav-categorias h3');

    let btnPlay = document.querySelector("#play-btn-4inline");

    homeLogo.addEventListener('click', navigateHome);

    navBtn.addEventListener('click', openNavbar);

    btnCarrito.addEventListener('click', openCartMenu);

    btnUsuario.addEventListener('click', openUserMenu);

    closeSessionBtn.addEventListener('click', navigateHome);

    function navigateHome(){
        window.location.replace("home.html");
    }

    function openNavbar() {
        navList.classList.toggle("nav-bar-open");
        navBtn.classList.toggle("rotate");
        setTimeout(() => {
            navCategoriasH3.forEach((s) => {
                s.classList.toggle("oculto");
            });
        },100);
    }
    
    function openCartMenu(){
        menuCarrito.classList.toggle("opacity-transition");
        menuCarrito.classList.toggle("oculto");
        menuUsuario.classList.add("opacity-transition");
        menuUsuario.classList.add("oculto");
    }

    function openUserMenu(){
        menuUsuario.classList.toggle("opacity-transition");
        menuUsuario.classList.toggle("oculto");
        menuCarrito.classList.add("opacity-transition");
        menuCarrito.classList.add("oculto");
    }

    function goGamePage(){
        window.location.replace("game.html");
    }

    if(window.location.href.includes("home.html")){
        btnPlay.addEventListener('click', goGamePage);
        spinner();
    }

    function spinner(){

        let divSpinnerNode = document.createElement("div");
        let divSpinner = document.createElement("div");
        let spanStatus = document.createElement("span");
    
        body.appendChild(getSpinnerTag());
                activateSpinner();
    
        function getSpinnerTag(){
    
            divSpinnerNode.classList.add("spinner");
            divSpinnerNode.classList.add("z-index-max");
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
            window.scrollTo(0, 0);
            let spinnerStatus = document.querySelector(".spinner-status");
            body.classList.add("form-hide");
            setTimeout(() => {
                body.classList.remove("form-hide");
                divSpinnerNode.remove();
                document.querySelector("header").classList.remove("opacity-0");
                document.querySelector("aside").classList.remove("opacity-0");
                document.querySelector("main").classList.remove("opacity-0");
                document.querySelector("footer").classList.remove("opacity-0");
            }, 4900);
    
            let status = 10;
            setInterval(() => {
                spinnerStatus.innerHTML = `${status}%`;
                if(status < 100)
                    status += 1;
            }, 38)
        }
    }
}
