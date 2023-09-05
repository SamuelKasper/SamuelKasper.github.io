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
            section.classList.add("song-section");
            section.appendChild(createImg(song.img));
            section.appendChild(createSongName(song.name));
            section.appendChild(createAudio(song.src, song.volume));
            content === null || content === void 0 ? void 0 : content.appendChild(section);
        });
    });
}
// Load songs from own and external projects
function loadProjects(projects, content) {
    return __awaiter(this, void 0, void 0, function* () {
        projects.forEach((project) => {
            let headline = document.createElement("h4");
            let link = document.createElement("a");
            link.innerText = `${project.project_name}`;
            link.href = project.href;
            headline.appendChild(link);
            content === null || content === void 0 ? void 0 : content.appendChild(headline);
            project.songs.forEach((song) => __awaiter(this, void 0, void 0, function* () {
                let section = document.createElement("section");
                section.classList.add("song-section");
                section.appendChild(createImg(song.img));
                section.appendChild(createSongName(song.name));
                section.appendChild(createAudio(song.src, song.volume));
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
    audio.classList.add("audio-control");
    audio.setAttribute('controlsList', 'nodownload');
    return audio;
}
// Creating the p element for the song name
function createSongName(_name) {
    let text = document.createElement("p");
    text.innerText = `${_name}`;
    return text;
}
// Create img element
function createImg(_src) {
    let image = document.createElement("img");
    image.src = _src;
    return image;
}
window.onload = loadSongs;
