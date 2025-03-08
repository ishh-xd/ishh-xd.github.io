document.querySelector('.close-btn').addEventListener('click', function() {
  const alertBox = document.querySelector('.alert-box');
  alertBox.classList.add('hide');
  setTimeout(() => alertBox.style.display = 'none', 500);
});

const descriptions = [
    "I love programming.",
    "I like cats.",
    "I enjoy learning new things."
];

let index = 0;
let charIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetween = 2000;

function typeEffect() {
    const descriptionElement = document.querySelector(".description");

    if (charIndex < descriptions[index].length) {
        descriptionElement.textContent += descriptions[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } else {
        setTimeout(deleteEffect, delayBetween);
    }
}

function deleteEffect() {
    const descriptionElement = document.querySelector(".description");

    if (charIndex > 0) {
        descriptionElement.textContent = descriptions[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteEffect, deletingSpeed);
    } else {
        index = (index + 1) % descriptions.length;
        setTimeout(typeEffect, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

const tracks = [
    { name: 'Reflections', artist: 'The Neighbourhood', src: 'https://ishh.is-a.dev/v1/music/Reflections.mp3' },
    { name: 'Sweater Weather', artist: 'The Neighbourhood', src: 'https://ishh.is-a.dev/v1/music/SweaterWeather.mp3' },
    { name: 'Call Out My Name', artist: 'The Weeknd', src: 'https://ishh.is-a.dev/v1/music/CallOutMyName.mp3' },
    { name: 'Die For You', artist: 'The Weeknd', src: 'https://ishh.is-a.dev/v1/music/DieForYou.mp3' },
    { name: 'Diet Mountain Dew', artist: 'Lana Del Rey', src: 'https://ishh.is-a.dev/v1/music/DietMountainDew.mp3' },
    { name: 'Lovers Rock', artist: 'TV Girl', src: 'https://ishh.is-a.dev/v1/music/LoversRock.mp3' },
    { name: 'One Of The Girls', artist: 'The Weeknd, JENNIE (...)', src: 'https://ishh.is-a.dev/v1/music/OneOfTheGirls.mp3' },
    { name: 'Shootout', artist: 'Izzamuzzic & Julien Marchal', src: 'https://ishh.is-a.dev/v1/music/Shootout.mp3' },
    { name: 'Softcore', artist: 'The Neighbourhood', src: 'https://ishh.is-a.dev/v1/music/Softcore.mp3' },
    { name: 'Starboy', artist: 'The Weeknd', src: 'https://ishh.is-a.dev/v1/music/Starboy.mp3' },
];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = new Audio(tracks[currentTrackIndex].src);
const disc = document.getElementById('disc');
const playPauseBtn = document.getElementById('playPauseBtn');
const trackName = document.getElementById('songTitle');
const trackArtist = document.getElementById('songArtist');

function loadTrack(index) {
    audio.src = tracks[index].src;
    trackName.textContent = tracks[index].name;
    trackArtist.textContent = tracks[index].artist;
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        startRotation();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        stopRotation();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    isPlaying = !isPlaying;
}

function startRotation() {
    disc.style.animation = "spin 3s linear infinite";
}

function stopRotation() {
    disc.style.animation = "none";
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    startRotation();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    startRotation();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

audio.addEventListener('ended', nextTrack);
document.addEventListener('DOMContentLoaded', () => {
    loadTrack(currentTrackIndex);
});

function enterVault() {
   const alertBox = document.querySelector('.alert-box');
  alertBox.classList.add('hide');
  setTimeout(() => alertBox.style.display = 'none', 1000);
  
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    document.getElementById("enter-screen").style.display = "none";
    togglePlayPause();
    Storm.start().catch(console.error);
}

window.onload = () => {
    setInterval(window.Storm.start.bind(window.Storm), 4000);
};
