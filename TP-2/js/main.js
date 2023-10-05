document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    let navBtn = document.querySelector('#nav-btn');
    let navList = document.querySelector('.nav-bar');

    let btnCarrito = document.querySelector('#id-carrito');
    let menuCarrito = document.querySelector('.menu-carrito');

    let btnUsuario = document.querySelector('#id-usuario');
    let menuUsuario = document.querySelector('.menu-usuario');

    let navCategoriasH3 = document.querySelectorAll('.div-categorias h3');

    navBtn.addEventListener('click', openNavbar);

    btnCarrito.addEventListener('click', openCartMenu);

    btnUsuario.addEventListener('click', openUserMenu);

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
        setTimeout(() =>{
            menuUsuario.classList.add("oculto");
        },200);
    }

    function openUserMenu(){
        menuUsuario.classList.toggle("opacity-transition");
        menuUsuario.classList.toggle("oculto");
        menuCarrito.classList.add("opacity-transition");
        setTimeout(() =>{
            menuCarrito.classList.add("oculto");
        },200);
    }
}