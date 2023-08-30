let menu = document.querySelector(".burger-menu");
if(menu){
    menu.addEventListener("click", function(){
        let panel = document.querySelector(".nav-menu");
        panel?.classList.toggle("nav-menu-open");
    }, false)
}
