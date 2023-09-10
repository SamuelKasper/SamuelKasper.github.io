async function loadSongs() {
    const response = await fetch("./json/songs.json");
    const song_data = await response.json();

    // Independent
    await loadIndependentSongs(song_data);

    // Projects
    const ownProjects = document.getElementById("own_projects_songs");
    const externalProjects = document.getElementById("external_project_songs");
    await loadProjects(song_data.own_projects, ownProjects);
    await loadProjects(song_data.external_projects, externalProjects);

    playMusic();
};

// Load independent songs
async function loadIndependentSongs(song_data: any) {
    const content = document.getElementById("independent_songs");
    let independent_songs = song_data.independent_songs;

    independent_songs.forEach((song: { name: string; year: string; img: string; src: string; volume: number; }) => {
        let section = document.createElement("section");
        section.classList.add("audioplayer");
        // Bildcover
        section.appendChild(createImg(song.img));
        // Songname
        section.appendChild(createSongName(song.name));
        // Audio Element
        section.appendChild(createAudio(song.src, song.volume));
        //Play Button
        section.appendChild(createButton());
        // Progressbar
        section.appendChild(createProgressbar());
        content?.appendChild(section);
    });
}

// Load songs from own and external projects
async function loadProjects(projects: any, content: HTMLElement | null) {
    let index: number = 0;

    projects.forEach((project: any) => {
        let headline = document.createElement("h4");
        let link = document.createElement("a");
        link.innerText = `${project.project_name}`;
        link.href = project.href;
        headline.appendChild(link);
        content?.appendChild(headline);

        project.songs.forEach(async (song: { name: string; year: string; src: string; img: string; volume: number; }) => {
            let section = document.createElement("section");
            section.classList.add("audioplayer");
            // Bildcover
            section.appendChild(createImg(song.img));
            // Songname
            section.appendChild(createSongName(song.name));
            // Audio Element
            section.appendChild(createAudio(song.src, song.volume));
            //Play Button
            section.appendChild(createButton());
            // Progressbar
            section.appendChild(createProgressbar());
            content?.appendChild(section);
        });
    });
}

// Creating the audio element
function createAudio(_src: string, _vol: number): HTMLAudioElement {
    let audio = new Audio(_src);
    audio.controls = true;
    audio.volume = _vol;
    audio.classList.add("song");
    audio.setAttribute('controlsList', 'nodownload');
    audio.setAttribute('loop', 'true');
    return audio;
}

// Creating the p element for the song name
function createSongName(_name: string): HTMLParagraphElement {
    let text = document.createElement("p");
    text.classList.add("songname");
    text.innerText = `${_name}`;
    return text;
}

// Create img element
function createImg(_src: string): HTMLImageElement {
    let image = document.createElement("img");
    image.src = _src;
    return image;
}

// Create progressbar
function createProgressbar() {
    let input = document.createElement("input");
    input.classList.add("progress");
    input.setAttribute("type", "range");
    input.setAttribute("value", "0");
    return input;
}

// Create playbutton
function createButton() {
    let img = document.createElement("img");
    img.classList.add("btn");
    img.src = "images/icons/play.svg";
    return img;
}

// Functionallity of buttons and audio elements
function playMusic() {
    // Click on Button
    let btns = document.getElementsByClassName("btn");
    for (let btn of btns) {
        btn.addEventListener("click", function (e) {
            let btntemp: HTMLImageElement = <HTMLImageElement>btn;
            let audio: HTMLAudioElement = <HTMLAudioElement>btn.previousElementSibling;
            let progress: HTMLInputElement = <HTMLInputElement>audio!.nextElementSibling!.nextElementSibling;

            if (audio.paused) {
                stopMusic(progress);
                audio.play();
                // Move progressbar 
                progress.max = audio.duration.toString();
                setInterval(() => {
                    progress.value = audio.currentTime.toString();
                }, 500);
                // Set pause img
                btntemp.src = "../images/icons/stop.svg";
            } else {
                btntemp.src = "../images/icons/play.svg";
                stopMusic(progress);
            }
        });
    }

    // Click on Progressbar
    let progressbars = document.getElementsByClassName("progress");
    for (let element of progressbars) {
        let progressbar: HTMLInputElement = <HTMLInputElement>element;
        let audio: HTMLAudioElement = <HTMLAudioElement>progressbar.previousElementSibling?.previousElementSibling;
        progressbar.onchange = function () {
            audio.currentTime = parseInt(progressbar.value);
        }
    }
}

// Stops all music and reset play buttons
function stopMusic(_progress: HTMLInputElement) {
    let audioElements = document.getElementsByTagName('audio');
    [...audioElements].forEach((audio) => {
        audio.pause();
        /* audio.currentTime = 0; */
    });

    let imgElements = document.getElementsByTagName('img');
    [...imgElements].forEach((img) => {
        if (img.classList.contains("btn")) {
            img.src = "../images/icons/play.svg";
        }
    });
}

window.onload = loadSongs;