"use strict";
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("move-r")) {
                entry.target.classList.add('from-right');
            }
            else if (entry.target.classList.contains("move-l")) {
                entry.target.classList.add('from-left');
            }
        }
    });
});
let obj = document.querySelectorAll('.sidepanel');
obj.forEach(element => {
    observer.observe(element);
});
