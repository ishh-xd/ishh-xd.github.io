const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');

const tracks = [
  { name: 'Starboy', artist: 'The Weeknd', src: 'music/Starboy.mp3' },
  ];

let trackIndex = 0;

function loadTrack(trackIndex) {
  const track = tracks[trackIndex];
  audio.src = track.src;
  trackName.textContent = track.name;
  trackArtist.textContent = track.artist;
}

function playTrack() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';  // Change to pause icon
}

function pauseTrack() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';  // Change to play icon
}

function togglePlayPause() {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function nextTrack() {
  trackIndex = (trackIndex + 1) % tracks.length;  // Loop to first track
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;  // Loop to last track
  loadTrack(trackIndex);
  playTrack();
}

function updateProgressBar() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percentage}%`;
}

playBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgressBar);

// Load the first track initially
loadTrack(trackIndex);
