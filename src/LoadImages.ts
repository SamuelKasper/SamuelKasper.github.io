async function loadImageHandler() {
    const response = await fetch("./json/images.json");
    const json_data = await response.json();

    const content_left = document.getElementById("content_left");
    const content_mid = document.getElementById("content_mid");
    const content_right = document.getElementById("content_right");
    loadImages(json_data.content_left, content_left);
    loadImages(json_data.content_mid, content_mid);
    loadImages(json_data.content_right, content_right);
}

async function loadImages(images: any, column: HTMLElement | null) {
    console.log(images);
    images.forEach((image: any) => {
        let section = document.createElement("section");
        let link = document.createElement("a");
        let img = document.createElement("img");

        link.href = image.href;
        link.target = "_blank";
        link.classList.add("image");
        link.classList.add("image_style");
        link.classList.add("fit");
        img.src = image.src;
        img.alt = image.alt;

        link.appendChild(img);
        section.appendChild(link);
        column?.appendChild(section);
    });
}

window.onload = loadImageHandler;