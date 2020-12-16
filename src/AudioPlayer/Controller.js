export function getTime(sec) {
    sec = parseInt(sec);
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(' : ')
}

export function playPauseController(id) {
    let audio = document.getElementById(`audio-${id}`);
    let prevId = localStorage.getItem("prevId");
    if (prevId !== id && prevId !== "0") {
        if (localStorage.getItem("isPlaying") === "true") {
            let prevAudio = document.getElementById(`audio-${prevId}`);
            prevAudio.pause();
            document.getElementById(`play-pause-${prevId}`).innerText = "play_arrow";
            audio.play();
            localStorage.setItem("prevId", id);
            localStorage.setItem("isPlaying", true);
            document.getElementById(`play-pause-${id}`).innerText = "pause";
        } else {
            audio.play();
            localStorage.setItem("prevId", id);
            localStorage.setItem("isPlaying", true);
            document.getElementById(`play-pause-${id}`).innerText = "pause";
        }
    } else {
        if (localStorage.getItem("isPlaying") === "true") {
            audio.pause();
            localStorage.setItem("isPlaying", false);
            document.getElementById(`play-pause-${id}`).innerText = "play_arrow";
        } else {
            audio.play();
            localStorage.setItem("prevId", id);
            localStorage.setItem("isPlaying", true);
            document.getElementById(`play-pause-${id}`).innerText = "pause";
        }
    }
}


export function forward(id) {
    let audio = document.getElementById(`audio-${id}`);
    audio.currentTime += 10;
}

export function rewind(id) {
    let audio = document.getElementById(`audio-${id}`);
    audio.currentTime -= 10;
}


export function volumeController(id, mode) {
    let audio = document.getElementById(`audio-${id}`);
    if (mode === "off") {
        audio.volume = 0;
    } else if (mode === "up" && audio.volume < 0.99) {
        audio.volume += 0.1;
    } else if (mode === "down" && audio.volume > 0.01) {
        audio.volume -= 0.1;
    }
}


export function seekController(perc, id) {
    let audio = document.getElementById(`audio-${id}`);
    audio.currentTime = (perc/100) * audio.duration;
}
