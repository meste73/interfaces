document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    let navBtn = document.querySelector('#nav-btn');
    let navList = document.querySelector('.nav-bar');

    let btnCarrito = document.querySelector('#id-carrito');
    let menuCarrito = document.querySelector('#menu-nav');

    let btnUsuario = document.querySelector('#id-usuario');
    let menuUsuario = document.querySelector('#user-nav');
    let closeSessionBtn = document.querySelector('#close-session');

    let navCategoriasH3 = document.querySelectorAll('.div-categorias h3');

    let btnPlay = document.querySelector("#play-btn-4inline");

    navBtn.addEventListener('click', openNavbar);

    btnCarrito.addEventListener('click', openCartMenu);

    btnUsuario.addEventListener('click', openUserMenu);

    btnPlay.addEventListener('click', goGamePage);

    closeSessionBtn.addEventListener('click', closeSession);

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

    function closeSession(){
        window.location.replace("index.html");
    }
}