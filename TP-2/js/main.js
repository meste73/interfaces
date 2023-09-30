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
            menuCarrito.classList.toggle("oculto");
            menuUsuario.classList.add("oculto");
        }

    function openUserMenu(){
            menuCarrito.classList.add("oculto");
            menuUsuario.classList.toggle("oculto");
    }
}