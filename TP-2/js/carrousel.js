document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    let prevBtn = document.querySelectorAll("#btn-left");
    let nextBtn = document.querySelectorAll("#btn-right");
    
    let firstImgWidth = 150 + 14;

    for(let btn of prevBtn){
        btn.addEventListener('click', function(){
            console.log(this.id);
            this.nextElementSibling.scrollLeft -= firstImgWidth;
        })
    }

    for(let btn of nextBtn){
        btn.addEventListener('click', function(){
            console.log(this.id);
            this.previousElementSibling.scrollLeft += firstImgWidth;
        })
    }
}