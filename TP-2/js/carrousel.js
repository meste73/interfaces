document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    const carousel = document.querySelector(".carrousel");

    let isDragStart = false;
    let prevPageX;
    let prevScrollLeft;
    let firstImgWidth = getFirstImgWidth() + 14;

    const dragging = (e) => {
        console.log("dragging");
        if(!isDragStart) return;
        e.preventDefault();
        let positionDiff = e.pageX - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
    }

    const dragStart = (e) => {
        console.log("start drag");
        carousel.classList.remove("smooth");
        isDragStart = true;
        prevPageX = e.pageX;
        prevScrollLeft = carousel.scrollLeft;
    }

    const dragStop = () => {
        console.log("stop drag");
        isDragStart = false;
    }

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseleave", dragStop);

    function getFirstImgWidth(){
        return carousel.querySelectorAll("img")[0].clientWidth;
    }
}