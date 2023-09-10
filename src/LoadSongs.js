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
function loadSongs() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./json/songs.json");
        const song_data = yield response.json();
        // Independent
        yield loadIndependentSongs(song_data);
        // Projects
        const ownProjects = document.getElementById("own_projects_songs");
        const externalProjects = document.getElementById("external_project_songs");
        yield loadProjects(song_data.own_projects, ownProjects);
        yield loadProjects(song_data.external_projects, externalProjects);
        playMusic();
    });
}
;
// Load independent songs
function loadIndependentSongs(song_data) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = document.getElementById("independent_songs");
        let independent_songs = song_data.independent_songs;
        independent_songs.forEach((song) => {
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
            content === null || content === void 0 ? void 0 : content.appendChild(section);
        });
    });
}
// Load songs from own and external projects
function loadProjects(projects, content) {
    return __awaiter(this, void 0, void 0, function* () {
        let index = 0;
        projects.forEach((project) => {
            let headline = document.createElement("h4");
            let link = document.createElement("a");
            link.innerText = `${project.project_name}`;
            link.href = project.href;
            headline.appendChild(link);
            content === null || content === void 0 ? void 0 : content.appendChild(headline);
            project.songs.forEach((song) => __awaiter(this, void 0, void 0, function* () {
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
                content === null || content === void 0 ? void 0 : content.appendChild(section);
            }));
        });
    });
}
// Creating the audio element
function createAudio(_src, _vol) {
    let audio = new Audio(_src);
    audio.controls = true;
    audio.volume = _vol;
    audio.classList.add("song");
    audio.setAttribute('controlsList', 'nodownload');
    audio.setAttribute('loop', 'true');
    return audio;
}
// Creating the p element for the song name
function createSongName(_name) {
    let text = document.createElement("p");
    text.classList.add("songname");
    text.innerText = `${_name}`;
    return text;
}
// Create img element
function createImg(_src) {
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
    var _a;
    // Click on Button
    let btns = document.getElementsByClassName("btn");
    for (let btn of btns) {
        btn.addEventListener("click", function (e) {
            let btntemp = btn;
            let audio = btn.previousElementSibling;
            let progress = audio.nextElementSibling.nextElementSibling;
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
            }
            else {
                btntemp.src = "../images/icons/play.svg";
                stopMusic(progress);
            }
        });
    }
    // Click on Progressbar
    let progressbars = document.getElementsByClassName("progress");
    for (let element of progressbars) {
        let progressbar = element;
        let audio = (_a = progressbar.previousElementSibling) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
        progressbar.onchange = function () {
            audio.currentTime = parseInt(progressbar.value);
        };
    }
}
// Stops all music and reset play buttons
function stopMusic(_progress) {
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
