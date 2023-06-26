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
        const content_left = document.getElementById("content_left");
        const content_mid = document.getElementById("content_mid");
        const content_right = document.getElementById("content_right");
        loadImages(json_data.content_left, content_left);
        loadImages(json_data.content_mid, content_mid);
        loadImages(json_data.content_right, content_right);
    });
}
function loadImages(images, column) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(images);
        images.forEach((image) => {
            let section = document.createElement("section");
            let link = document.createElement("a");
            let img = document.createElement("img");
            let line = document.createElement("hr");
            link.href = image.href;
            link.target = "_blank";
            link.classList.add("image");
            link.classList.add("fit");
            img.src = image.src;
            img.alt = image.alt;
            link.appendChild(img);
            section.appendChild(link);
            column === null || column === void 0 ? void 0 : column.appendChild(section);
            column === null || column === void 0 ? void 0 : column.appendChild(line);
        });
    });
}
window.onload = loadImageHandler;
