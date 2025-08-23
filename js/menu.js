"use strict";
let button = document.querySelector(".nav__menu-button");
let menu = document.querySelector(".nav__menu");
if (button && menu) {
    button.addEventListener("click", function () {
        menu.classList.toggle("active");
    }, false);
}
