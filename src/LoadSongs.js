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
        yield loadIndependentSongs(song_data);
        yield chooseProjects(song_data);
    });
}
;
function loadIndependentSongs(song_data) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = document.getElementById("independent_songs");
        let independent_songs = song_data.independent_songs;
        independent_songs.forEach((song) => {
            let section = document.createElement("section");
            section.classList.add("song-section");
            let text = document.createElement("p");
            text.classList.add("custom-margin-music");
            text.innerText = `${song.name}`;
            let audio = new Audio(song.src);
            audio.controls = true;
            audio.volume = song.volume;
            audio.classList.add("audio-control");
            section.appendChild(text);
            section.appendChild(audio);
            content === null || content === void 0 ? void 0 : content.appendChild(section);
        });
    });
}
function chooseProjects(song_data) {
    return __awaiter(this, void 0, void 0, function* () {
        const ownProjects = document.getElementById("own_projects_songs");
        const externalProjects = document.getElementById("external_project_songs");
        yield laodProjects(song_data.own_projects, ownProjects);
        yield laodProjects(song_data.external_projects, externalProjects);
    });
}
function laodProjects(projects, content) {
    return __awaiter(this, void 0, void 0, function* () {
        projects.forEach((project) => {
            let headline = document.createElement("h4");
            let link = document.createElement("a");
            link.innerText = /*project.made_by ? `${project.project_name} von ${project.made_by}` :*/ `${project.project_name}`;
            link.href = project.href;
            headline.appendChild(link);
            content === null || content === void 0 ? void 0 : content.appendChild(headline);
            project.songs.forEach((song) => {
                let section = document.createElement("section");
                section.classList.add("song-section");
                let text = document.createElement("p");
                text.classList.add("custom-margin-music");
                text.innerText = `${song.name}`;
                let audio = new Audio(song.src);
                audio.controls = true;
                audio.volume = song.volume;
                audio.classList.add("audio-control");
                section.appendChild(text);
                section.appendChild(audio);
                content === null || content === void 0 ? void 0 : content.appendChild(section);
            });
        });
    });
}
window.onload = loadSongs;
