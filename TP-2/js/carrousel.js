document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    const arrowsIcon = document.querySelectorAll(".btn");
    const carousel = document.querySelector(".img-container");

    let isDragStart = false;
    let prevPageX;
    let prevScrollLeft;
    let firstImgWidth = getFirstImgWidth() + 14;

    const dragging = (e) => {
        if(!isDragStart) return;
        e.preventDefault();
        let positionDiff = e.pageX - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
    }

    const dragStart = (e) => {
        carousel.classList.remove("smooth");
        isDragStart = true;
        prevPageX = e.pageX;
        prevScrollLeft = carousel.scrollLeft;
    }

    const dragStop = () => {
        isDragStart = false;
    }

    arrowsIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            if(icon.id === "btn-left"){
                carousel.classList.add("smooth");
                carousel.scrollLeft -= firstImgWidth;
            } else {
                carousel.classList.add("smooth");
                carousel.scrollLeft += firstImgWidth;
            }
        })
    });

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseleave", dragStop);

    function getFirstImgWidth(){
        return carousel.querySelectorAll("img")[0].clientWidth;
    }
}