async function loadSongs() {
    const response = await fetch("./json/songs.json");
    const song_data = await response.json();

    await loadIndependentSongs(song_data);
    await chooseProjects(song_data);
};

async function loadIndependentSongs(song_data: any) {
    const content = document.getElementById("independent_songs");
    let independent_songs = song_data.independent_songs;

    independent_songs.forEach((song: { name: string; year: string; src: string; volume: number; }) => {
        let section = document.createElement("section");
        section.classList.add("song-section");

        let text = document.createElement("p");
        text.classList.add("custom-margin-music");
        text.innerText = `${song.name} \n ${song.year}`;

        let audio = new Audio(song.src);
        audio.controls = true;
        audio.volume = song.volume;
        audio.classList.add("audio-control");

        section.appendChild(text);
        section.appendChild(audio);
        content?.appendChild(section);
    });
}

async function chooseProjects(song_data: any) {
    const ownProjects = document.getElementById("own_projects_songs");
    const externalProjects = document.getElementById("external_project_songs");
    await laodProjects(song_data.own_projects, ownProjects);
    await laodProjects(song_data.external_projects, externalProjects);
}

async function laodProjects(projects:any, content: HTMLElement | null){
    projects.forEach((project: any) => {
        let headline = document.createElement("h4");
        let link = document.createElement("a");
        link.innerText = /*project.made_by ? `${project.project_name} von ${project.made_by}` :*/ `${project.project_name}`;
        link.href = project.href;
        headline.appendChild(link);
        content?.appendChild(headline);

        project.songs.forEach((song: { name: string; year: string; src: string; volume: number; }) => {
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
            content?.appendChild(section);
        });
    });
}

window.onload = loadSongs;