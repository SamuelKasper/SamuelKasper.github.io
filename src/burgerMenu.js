"use strict";
let menu = document.querySelector(".burger-menu");
if (menu) {
    menu.addEventListener("click", function () {
        let panel = document.querySelector(".nav-menu");
        panel === null || panel === void 0 ? void 0 : panel.classList.toggle("nav-menu-open");
    }, false);
}
