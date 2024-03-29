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
let texts = ['Student | Entwickler | Künstler', 'TypeScript | Java | Python', 'HTML | Bootstrap | CSS', 'Fotografie | Musik | Zeichnen'];
let speed = 140;
let toggle = true;
let counter = 0;
function typing() {
    return __awaiter(this, void 0, void 0, function* () {
        if (counter >= texts.length) {
            counter = 0;
        }
        if (toggle) {
            if (i < texts[counter].length) {
                document.getElementById("typing").innerHTML += texts[counter].charAt(i);
                i++;
            }
            else {
                toggle = false;
                yield wait(2500);
            }
        }
        else {
            if (i >= 0) {
                document.getElementById("typing").innerHTML = texts[counter].substring(0, i);
                i--;
            }
            else {
                toggle = true;
                yield wait(1000);
                counter++;
            }
        }
        setTimeout(typing, speed);
    });
}
function wait(waiting) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            setTimeout(() => resolve(true), waiting);
        });
    });
}
