/*document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    let prevBtn = document.querySelector(".prev-btn");
    let nextBtn = document.querySelector(".next-btn");

    let carousel = document.querySelector(".carrousel");
    let carouselChildrens = [...carousel.children];
    
    let firstImgWidth = 150 + 10;

    let cardPerView = Math.round(carousel.offsetWidth / (firstImgWidth));

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    })

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    })

    carouselChildrens = [...carousel.children];

    prevBtn.addEventListener('click', function(){
        carouselChildrens.forEach(card => {
            card.classList.add("skew-left");
            card.classList.add("animation-carousel-left");
        });
        setTimeout(() => {
            this.nextElementSibling.scrollLeft -= firstImgWidth;
        }, 50);
        setTimeout(() => {
            carouselChildrens.forEach(card => {
                card.classList.remove("skew-left");
                card.classList.remove("animation-carousel-left");
            });
        }, 500);
    })

    nextBtn.addEventListener('click', function(){
        carouselChildrens.forEach(card => {
            card.classList.add("skew-right");
            card.classList.add("animation-carousel-right");
        });
        setTimeout(() => {
            this.previousElementSibling.scrollLeft += firstImgWidth;
        }, 50);
        setTimeout(() => {
            carouselChildrens.forEach(card => {
                card.classList.remove("skew-right");
                card.classList.remove("animation-carousel-right");
            });
        }, 500);
    })

    carousel.addEventListener("scroll", infiniteScroll);

    function infiniteScroll(){

        if(carousel.scrollLeft === 0){

            carousel.classList.add("no-transition")
            carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition")

        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){

            carousel.classList.add("no-transition")
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition")
        }
    }
}*/

document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    let prevBtn = document.querySelectorAll(".prev-btn");
    let nextBtn = document.querySelectorAll(".next-btn");
    let imgsCarousel = document.querySelectorAll(".img-carrousel");

    let cards;
    let firstImgWidth = 150 + 10;

    prevBtn.forEach( btn => {
        btn.addEventListener('click', function(){
            cards = [...this.nextElementSibling.children];

            cards.forEach(c => {
                c.classList.add("animation-carousel-left");
            });

            setTimeout(() => {
                this.nextElementSibling.scrollLeft -= firstImgWidth;
            }, 50);

            setTimeout(() => {
                cards.forEach(c => {
                    c.classList.remove("animation-carousel-left");
                });
            }, 500);
        })
    });

    nextBtn.forEach( btn => {
        btn.addEventListener('click', function(){
            cards = [...this.previousElementSibling.children];

            cards.forEach(c => {
                c.classList.add("animation-carousel-right");
            });

            setTimeout(() => {
                console.log(this.previousElementSibling.scrollLeft);
                this.previousElementSibling.scrollLeft += firstImgWidth;
            }, 50);
            
            setTimeout(() => {
                cards.forEach(c => {
                    c.classList.remove("animation-carousel-right");
                });
            }, 500);
        })
    });

    imgsCarousel.forEach( img => {
        img.addEventListener('mouseover', (e)=>{
            e.target.classList.add("carrousel-hovered");
        });
        img.addEventListener("mouseout",  (e)=>{
            e.target.classList.remove("carrousel-hovered");
        })
    });

}