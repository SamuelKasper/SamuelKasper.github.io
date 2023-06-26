window.onload = typing;

let i: number = 0;
let texts: string[] = ['Student | Entwickler | Künstler', 'TypeScript | Java | Python', 'HTML | Bootstrap | CSS', 'Fotografie | Musik | Zeichnen']
let speed: number = 140;
let toggle: boolean = true;
let counter = 0;

async function typing() {
    if(counter >= texts.length){
        counter = 0;
    }

    if (toggle) {
        if (i < texts[counter].length) {
            document.getElementById("typing")!.innerHTML += texts[counter].charAt(i);
            i++;
        } else {
            toggle = false;
            await wait(2500);
        }
    } else {
        if (i >= 0) {
            document.getElementById("typing")!.innerHTML = texts[counter].substring(0, i);
            i--;
        } else {
            toggle = true;
            await wait(1000);
            counter++;
        }
    }
    setTimeout(typing, speed);
}

async function wait(waiting: number) {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), waiting);
    })
}
