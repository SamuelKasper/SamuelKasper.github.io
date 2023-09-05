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
};

// Load independent songs
async function loadIndependentSongs(song_data: any) {
    const content = document.getElementById("independent_songs");
    let independent_songs = song_data.independent_songs;

    independent_songs.forEach((song: { name: string; year: string; img: string; src: string; volume: number; }) => {
        let section = document.createElement("section");
        section.classList.add("song-section");
        section.appendChild(createImg(song.img));
        section.appendChild(createSongName(song.name));
        section.appendChild(createAudio(song.src, song.volume));
        content?.appendChild(section);
    });
}

// Load songs from own and external projects
async function loadProjects(projects: any, content: HTMLElement | null) {
    projects.forEach((project: any) => {
        let headline = document.createElement("h4");
        let link = document.createElement("a");
        link.innerText = `${project.project_name}`;
        link.href = project.href;
        headline.appendChild(link);
        content?.appendChild(headline);

        project.songs.forEach(async (song: { name: string; year: string; src: string; img: string; volume: number; }) => {
            let section = document.createElement("section");
            section.classList.add("song-section");
            section.appendChild(createImg(song.img));
            section.appendChild(createSongName(song.name));
            section.appendChild(createAudio(song.src, song.volume));
            content?.appendChild(section);
        });
    });
}

// Creating the audio element
function createAudio(_src: string, _vol: number): HTMLAudioElement {
    let audio = new Audio(_src);
    audio.controls = true;
    audio.volume = _vol;
    audio.classList.add("audio-control");
    audio.setAttribute('controlsList', 'nodownload');
    return audio;
}

// Creating the p element for the song name
function createSongName(_name: string): HTMLParagraphElement {
    let text = document.createElement("p");
    text.innerText = `${_name}`;
    return text;
}

// Create img element
function createImg(_src: string): HTMLImageElement {
    let image = document.createElement("img");
    image.src = _src;
    return image;
}

window.onload = loadSongs;