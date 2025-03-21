document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");

    // 🎵 Music Controller Container
    const musicContainer = document.createElement("div");
    musicContainer.classList.add("music-container");

    const playButton = document.createElement("button");
    playButton.innerHTML = `<i class="fa-solid fa-volume-high"></i> Music On`;
    playButton.classList.add("music-btn");

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttonsDiv");

    const volumeUp = document.createElement("button");
    volumeUp.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    volumeUp.classList.add("volume-btn");

    const volumeDown = document.createElement("button");
    volumeDown.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    volumeDown.classList.add("volume-btn");

    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "1";
    volumeSlider.step = "0.1";
    volumeSlider.classList.add("volume-slider");

    // 🏗️ Append Elements
    musicContainer.appendChild(playButton);
    musicContainer.appendChild(buttonsDiv);
    buttonsDiv.appendChild(volumeDown);
    buttonsDiv.appendChild(volumeSlider);
    buttonsDiv.appendChild(volumeUp);
    // musicContainer.appendChild(volumeDown);
    // musicContainer.appendChild(volumeSlider);
    // musicContainer.appendChild(volumeUp);

    document.body.appendChild(musicContainer);

    let isPlaying = localStorage.getItem("musicPlaying") === "true";
    let savedVolume = localStorage.getItem("musicVolume") || "0.5";

    bgMusic.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;

    // 🔊 Autoplay (if allowed)
    if (isPlaying) {
        bgMusic.play().catch(() => console.warn("Autoplay blocked!"));
    }

    // 🎵 Play/Pause
    playButton.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            playButton.innerHTML = `<i class="fa-solid fa-volume-high"></i> Music On`;
        } else {
            bgMusic.pause();
            playButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> Music Off`;
        }
        isPlaying = !bgMusic.paused;
        localStorage.setItem("musicPlaying", isPlaying);
    });

    // 🔼 Volume Increase
    volumeUp.addEventListener("click", () => {
        if (bgMusic.volume < 1) {
            bgMusic.volume = Math.min(1, bgMusic.volume + 0.1);
            volumeSlider.value = bgMusic.volume;
            localStorage.setItem("musicVolume", bgMusic.volume);
        }
    });

    // 🔽 Volume Decrease
    volumeDown.addEventListener("click", () => {
        if (bgMusic.volume > 0) {
            bgMusic.volume = Math.max(0, bgMusic.volume - 0.1);
            volumeSlider.value = bgMusic.volume;
            localStorage.setItem("musicVolume", bgMusic.volume);
        }
    });

    // 🎚️ Slider Volume Control
    volumeSlider.addEventListener("input", () => {
        bgMusic.volume = volumeSlider.value;
        localStorage.setItem("musicVolume", bgMusic.volume);
    });
});


function toggleMusicMenu() {
    let musicMenu = document.querySelector(".music-container");
    musicMenu.classList.toggle("show");
}
