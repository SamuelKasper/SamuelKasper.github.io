// Enable only on desktop
if (window.innerWidth > 980) {
    window.addEventListener("scroll", function () {
        this.document.getElementById("spotlight-programming")!.style.backgroundPositionY = -window.scrollY*0.05+"px";
        this.document.getElementById("spotlight-music")!.style.backgroundPositionY = -(window.scrollY*0.05)+"px";
        this.document.getElementById("spotlight-gallery")!.style.backgroundPositionY = -window.scrollY*0.05+"px";
    });
}