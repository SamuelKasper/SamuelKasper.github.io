async function loadImageHandler() {
    const response = await fetch("./json/images.json");
    const json_data = await response.json();

    const content = document.getElementById("images-grid");
    loadImages(json_data.gallery_images, content);
}

async function loadImages(images: any, column: HTMLElement | null) {
    images.forEach((image: any, index:number) => {
        let section = document.createElement("section");
        let link = document.createElement("a");
        let img = document.createElement("img");

        link.href = image.href;
        link.target = "_blank";
        link.classList.add("image_style");
        img.src = image.src;
        img.alt = image.alt;

        link.appendChild(img);
        section.appendChild(link);
        column?.appendChild(section);
    });
}

window.onload = loadImageHandler;