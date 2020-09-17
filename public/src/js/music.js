function musicButton(year, composer, index, music_name) {
    audio.src = "/music/" + year + "/" + composer + "/" + (index + 1) + "_" + music_name + "/" + music_name + ".mp3";
    audio.onloadedmetadata = () => {
        element = document.getElementById("music-player");
        element.innerHTML = (
            `<div id="mp-info">
                <div id="mp-info-name">` + music_name + `</div>
                <div id="mp-info-composer-year">` + composer + `,&nbsp;` + year + `</div>
            </div>
            <div id="mp-controls">
                <img id="mp-controls-backward" src="/src/img/backward.png" onclick="audio.currentTime-=5">
                <img id="mp-controls-play" src="/src/img/play.png" onclick="playPauseMusic(document.getElementById('mp-controls-volume').value)">
                <img id="mp-controls-forward" src="/src/img/forward.png" onclick="audio.currentTime+=5">
                <img id="mp-controls-audio" src="/src/img/volume.png">
                <input id="mp-controls-volume" type="range" min="0" max="1" step="0.01" value="1"/>
            </div>
            <div id="mp-progress">
                <div id="mp-progress-time">
                    <span id="mp-progress-current"></span>
                    <span> / </span>
                    <span id="mp-progress-duration">` + secToMin(Math.round(audio.duration)) + `</span>
                </div>
            </div>
            <div id="mp-slider"></div>`
        );
        document.getElementById("mp-slider").style["width"] = "0%";
        document.getElementById("mp-controls-volume").value = volume;
        setInterval(update, 50);
        playPauseMusic();
    }
}

function playPauseMusic(volume) {
    if (audio.paused) {
        // change to pause icon
        document.getElementById("mp-controls-play").src = "/src/img/pause.png";
        // play the music
        audio.play();
    } else {
        // change to play icon
        document.getElementById("mp-controls-play").src = "/src/img/play.png";
        // play the music
        audio.pause();
    }
}

function update() {
    volume = document.getElementById("mp-controls-volume").value
    audio.volume = volume;
    ct = audio.currentTime;
    document.getElementById("mp-progress-current").innerHTML = secToMin(Math.round(ct));
    document.getElementById("mp-slider").style["width"] = (100 * audio.currentTime / audio.duration + "%");
}

function secToMin(sec) {
    var _min = Math.floor(sec / 60);
    var _sec = sec % 60;
    return _min + ":" + (_sec < 10 ? "0" + _sec : _sec);
}
