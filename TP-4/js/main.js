document.addEventListener('DOMContentLoaded', startPage);

function startPage(){

    'use strict'

    let logo = document.querySelector(".logo-img");

    //Menu hamburguesa
    let menuBtn = document.querySelector(".menu-btn");
    let menuSimpleTop = document.querySelector(".menu-btn-simple-top");
    let menuSimpleMid = document.querySelector(".menu-btn-simple-mid");
    let menuSimpleBottom = document.querySelector(".menu-btn-simple-bottom");
    let rects = document.querySelectorAll(".rect");
    let rectMid = document.querySelector(".rect-mid");
    let navbar = document.querySelector(".navbar");
    let navUno = document.querySelector(".nav-uno");
    let navDos = document.querySelector(".nav-dos");
    let navTres = document.querySelector(".nav-tres");
    let navCuatro = document.querySelector(".nav-cuatro");

    menuBtn.addEventListener("click", ()=>{
        menuSimpleMid.classList.toggle("rotate-btn-top");
        menuSimpleMid.classList.toggle("z-index-max");
        menuSimpleTop.classList.toggle("rotate-btn-top");
        menuSimpleBottom.classList.toggle("rotate-btn-bottom");
        console.log("btn clicked");
        rects.forEach(e => {
            e.classList.toggle("rect-close");
        });
        rectMid.classList.toggle("no-stroke");
        navbar.classList.toggle("width-200");
        navUno.classList.toggle("translate-300");
        navDos.classList.toggle("translate-600");
        navTres.classList.toggle("translate-900");
        navCuatro.classList.toggle("translate-1200");
    })

    //Seccion hero
    let cielo = document.querySelector(".fondo-cielo");
    let edificioIzq = document.querySelector(".edificio-izq");
    let edificioCen = document.querySelector(".edificio-cen");
    let edificioDer = document.querySelector(".edificio-der");
    let spiderIzq = document.querySelector(".hero-izq");
    let spiderCen = document.querySelector(".div-hero-cen");
    let spiderDer = document.querySelector(".div-hero-der");

    //Seccion duende
    let duende = document.querySelector(".duende");

    //Seccion spidey
    let screenUno = document.querySelector(".screenshot-top");
    let screenDos = document.querySelector(".screenshot-center");
    let screenTres = document.querySelector(".screenshot-bottom");

    //Seccion cards
    let cardUno = document.querySelector(".card-1");
    let cardDos = document.querySelector(".card-2");
    let cardTres = document.querySelector(".card-3");

    //Seccion vengadores
    let hulk = document.querySelector(".hulk");
    let blackIronman = document.querySelector(".black-ironman")
    let larguirucha = document.querySelector(".larguirucha");
    let fondoUno = document.querySelector(".fondo-uno-seccion-5");
    let fondoDos = document.querySelector(".fondo-dos-seccion-5");
    fondoDos.addEventListener("mousemove", (e) => {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        hulk.style.left = `${680 - (_mouseX - _w) * 0.005}px`;
        hulk.style.top = `${100 - (_mouseY - _h) * 0.005}px`;
        blackIronman.style.left = `${450 - (_mouseX - _w) * 0.006}px`;
        blackIronman.style.top = `${-250 - (_mouseY - _h) * 0.006}px`;
        larguirucha.style.left = `${-(_mouseX - _w) * 0.005}px`;
        larguirucha.style.top = `${-100 - (_mouseY - _h) * 0.005}px`;
        fondoUno.style.left = `${-(_mouseX - _w) * 0.003}px`;
        fondoUno.style.top = `${- (_mouseY - _h) * 0.003}px`;
        
    });

    //Seccion amigos
    let contenedorImagenes = document.querySelector(".imagenes-seccion-6");
    let imagen1 = document.querySelector(".imagen-1-seccion-6");
    let imagen2 = document.querySelector(".imagen-2-seccion-6");
    let imagen3 = document.querySelector(".imagen-3-seccion-6");
    let imagen4 = document.querySelector(".imagen-4-seccion-6");

    //Seccion spyders
    let fondoSpyders = document.querySelector(".fondo-seccion-8-hover");
    let spyderIzq = document.querySelector(".spyder-left");
    let spyderCen = document.querySelector(".spyder-center");
    let spyderDer = document.querySelector(".spyder-right");

    spyderIzq.addEventListener('mouseover', () => {
        console.log("mouseover izq");
        spyderIzq.style.transform = "scale(1.2)";
        spyderCen.style.opacity = 0.5;
        spyderDer.style.opacity = 0.5;
        fondoSpyders.style.opacity = 1;
        fondoSpyders.style.background = "url(./img/fondo-spyder-izq.png)";
    });

    spyderIzq.addEventListener('mouseleave', () => {
        console.log("mouseleave izq");
        spyderIzq.style.transform = "scale(1)";
        spyderCen.style.opacity = 1;
        spyderDer.style.opacity = 1;
        fondoSpyders.style.opacity = 0;
    });

    spyderCen.addEventListener('mouseover', () => {
        console.log("mouseover cen");
        spyderCen.style.transform = "scale(1.2)";
        spyderIzq.style.opacity = 0.5;
        spyderDer.style.opacity = 0.5;
        fondoSpyders.style.opacity = 1;
        fondoSpyders.style.background = "url(./img/fondo-spyder-cen.png)";
    });

    spyderCen.addEventListener('mouseleave', () => {
        console.log("mouseleave cen");
        spyderCen.style.transform = "scale(1)";
        spyderIzq.style.opacity = 1;
        spyderDer.style.opacity = 1;
        fondoSpyders.style.opacity = 0;
    });

    spyderDer.addEventListener('mouseover', () => {
        console.log("mouseover der");
        spyderDer.style.transform = "scale(1.2)";
        spyderIzq.style.opacity = 0.5;
        spyderCen.style.opacity = 0.5;
        fondoSpyders.style.opacity = 1;
        fondoSpyders.style.background = "url(./img/fondo-spyder-der.png)";
    });

    spyderDer.addEventListener('mouseleave', () => {
        console.log("mouseleave der");
        spyderDer.style.transform = "scale(1)";
        spyderIzq.style.opacity = 1;
        spyderCen.style.opacity = 1;
        fondoSpyders.style.opacity = 0;
    });

    onscroll = (e) => {
        console.log(window.scrollY);
        //Logo
        if(window.scrollY >= 0 && window.scrollY < 265){
            logo.style.transform = `translateY(${-window.scrollY * 0.7}px) scale(${1- window.scrollY/320})`;
        } else {
            logo.style.transform = `translateY(-185px) scale(0.17)`;

        }

        //Seccion duende
        if(window.scrollY > 300){
            duende.style.transform = `translateY(${window.scrollY - (window.scrollY*0.92)}px)`;
        }

        //Seccion hero
        if(window.scrollY >= 0 && window.scrollY < 600){
            spiderIzq.style.transform = `translateY(${window.scrollY - (window.scrollY*0.8)}px) 
                                         translateX(${-window.scrollY + (window.scrollY*0.90)}px)`;

            spiderCen.style.transform = `translateY(${window.scrollY - (window.scrollY*0.8)}px)`;

            spiderDer.style.transform = `translateY(${window.scrollY - (window.scrollY*0.8)}px) 
                                         translateX(${window.scrollY - (window.scrollY*0.90)}px)`;

            edificioIzq.style.transform = `translateY(${window.scrollY - (window.scrollY*0.9)}px) 
                                           translateX(${window.scrollY - (window.scrollY*0.96)}px)`;

            edificioCen.style.transform = `translateY(${window.scrollY - (window.scrollY*0.9)}px)`;

            edificioDer.style.transform = `translateY(${window.scrollY - (window.scrollY*0.9)}px) 
                                           translateX(${-window.scrollY + (window.scrollY*0.96)}px)`;

            cielo.style.transform = `translateY(${window.scrollY - (window.scrollY*0.97)}px) 
                                     translateX(${window.scrollY - (window.scrollY*0.87)}px)`;

        }

        //Seccion 3 screenshots
        if(window.scrollY >= 1600){
            cardUno.style.opacity = 1;
            cardUno.style.transform = `translateY(0)`;
            cardDos.style.opacity = 1;
            cardDos.style.transform = `translateY(0)`;
            cardTres.style.opacity = 1;
            cardTres.style.transform = `translateY(0)`;
        }


        if(window.scrollY > 1000 && window.scrollY < 3400){
            screenUno.style.top = `${-60 + (window.scrollY/57)}px`;
            screenDos.style.top = `${100 + (window.scrollY/57)}px`;
            screenTres.style.top = `${260 + (window.scrollY/57)}px`;
        }

        //Seccion amigos
        if(window.scrollY < 3500){
            contenedorImagenes.classList.add("display-none");
        }
        if(window.scrollY > 3600){
            contenedorImagenes.classList.remove("display-none");
        }

        if(window.scrollY < 3800){
            imagen1.style.opacity = 0;
            imagen2.style.opacity = 0;
            imagen3.style.opacity = 0;
            imagen4.style.opacity = 0;
        }
        
        if(window.scrollY >= 3800){
            imagen1.style.opacity = 1;
            imagen2.style.opacity = 0;
            imagen3.style.opacity = 0;
            imagen4.style.opacity = 0;
        }

        if(window.scrollY >= 4250){
            imagen1.style.opacity = 0;
            imagen2.style.opacity = 1;
            imagen3.style.opacity = 0;
            imagen4.style.opacity = 0;
        }

        if(window.scrollY >= 4900){
            imagen1.style.opacity = 0;
            imagen2.style.opacity = 0;
            imagen3.style.opacity = 1;
            imagen4.style.opacity = 0;
        }

        if(window.scrollY >= 5700){
            imagen1.style.opacity = 0;
            imagen2.style.opacity = 0;
            imagen3.style.opacity = 0;
            imagen4.style.opacity = 1;
        }

        if(window.scrollY >= 6200){
            imagen1.style.opacity = 0;
            imagen2.style.opacity = 0;
            imagen3.style.opacity = 0;
            imagen4.style.opacity = 0;
        }

        if(window.scrollY > 6500){
            contenedorImagenes.classList.add("display-none");
        }
    }
}