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
window.onload = typing;
let i = 0;
let txt = 'Student | Entwickler | Musiker';
let speed = 140;
let toggle = true;
function typing() {
    return __awaiter(this, void 0, void 0, function* () {
        if (toggle) {
            if (i < txt.length) {
                document.getElementById("typing").innerHTML += txt.charAt(i);
                i++;
            }
            else {
                toggle = false;
                yield wait();
            }
        }
        else {
            if (i >= 0) {
                document.getElementById("typing").innerHTML = txt.substring(0, i);
                i--;
            }
            else {
                toggle = true;
                yield wait();
            }
        }
        setTimeout(typing, speed);
    });
}
function wait() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            setTimeout(() => resolve(true), 3000);
        });
    });
}
