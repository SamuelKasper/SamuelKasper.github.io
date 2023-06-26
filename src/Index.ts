window.onload = typing;

let i: number = 0;
let txt: string = 'Student | Entwickler | Musiker';
let speed: number = 140;
let toggle: boolean = true;

async function typing() {
    if (toggle) {
        if (i < txt.length) {
            document.getElementById("typing")!.innerHTML += txt.charAt(i);
            i++;
        } else {
            toggle = false;
            await wait();
        }
    } else {
        if (i >= 0) {
            document.getElementById("typing")!.innerHTML = txt.substring(0, i);
            i--;
        } else {
            toggle = true;
            await wait();
        }
    }
    setTimeout(typing, speed);
}

async function wait(){
    await new Promise((resolve)=>{
        setTimeout(() => resolve(true), 3000);
    })
}