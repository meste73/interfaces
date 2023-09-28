document.addEventListener('DOMContentLoaded', startPage);
function startPage() {
    
    "use strict"

    let navBtn = document.querySelector('#nav-btn');

    navBtn.addEventListener('click', openNavbar);

    function openNavbar() {
        let navList = document.querySelector('.nav-bar');
        navList.classList.toggle("nav-bar-open");
    }
}