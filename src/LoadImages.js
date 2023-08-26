"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadImageHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./json/images.json");
        const json_data = yield response.json();
        const content = document.getElementById("images-grid");
        loadImages(json_data.gallery_images, content);
    });
}
function loadImages(images, column) {
    return __awaiter(this, void 0, void 0, function* () {
        images.forEach((image, index) => {
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
            column === null || column === void 0 ? void 0 : column.appendChild(section);
        });
    });
}
window.onload = loadImageHandler;
