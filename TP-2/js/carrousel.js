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

            if(this.previousElementSibling.scrollLeft < 480){
                this.previousElementSibling.scrollLeft += firstImgWidth;
                setTimeout(() => {
                }, 50);
            }
            
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
            e.target.nextElementSibling.classList.add("z-index-5");
        });
        img.addEventListener("mouseout",  (e)=>{
            e.target.classList.remove("carrousel-hovered");
            e.target.nextElementSibling.classList.remove("z-index-5");
        })
    });
}