const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');

const tracks = [
  { name: 'Sweater Weather', artist: 'The Neighbourhood', src: 'music/SweaterWeather.mp3' },
  { name: 'Call Out My Name', artist: 'The Weeknd', src: 'music/CallOutMyName.mp3' },
  { name: 'Die For You', artist: 'The Weeknd', src: 'music/DieForYou.mp3' },
  { name: 'Diet Mountain Dew', artist: 'Lana Del Rey', src: 'music/DietMountainDew.mp3' },
  { name: 'Lovers Rock', artist: 'TV Girl', src: 'music/LoversRock.mp3' },
  { name: 'One Of The Girls', artist: 'The Weeknd, JENNIE, Lily-Rose Depp', src: 'music/OneOfTheGirls.mp3' },
  { name: 'Reflections', artist: 'The Neighbourhood', src: 'music/Reflections.mp3' },
  { name: 'Shootout', artist: 'Izzamuzzic & Julien Marchal', src: 'music/Shootout.mp3' },
  { name: 'Softcore', artist: 'The Neighbourhood', src: 'music/Softcore.mp3' },
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
audio.addEventListener('ended', nextTrack); // (Play Next)
// Load the first track initially
loadTrack(trackIndex);




// Time Battery 

const timeElement = document.getElementById("time");

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.innerHTML = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);
updateTime(); 

const bt = document.getElementById('battery');  
function updateBatteryStatus(battery) {  
  bt.innerHTML = `${Math.floor(battery.level * 100)}%`; 
  if (battery.charging) {    
    bt.innerHTML += ' (Charging)';  
  }    }  
function batteryUpdate() {   
  navigator.getBattery().then(battery => {     
    updateBatteryStatus(battery);    
    battery.addEventListener('levelchange', () => updateBatteryStatus(battery));      
    battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));    
  });   
}    
document.addEventListener('DOMContentLoaded', batteryUpdate);



function updateDateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}`;
    document.querySelector('.current-time').textContent = timeString;

    const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
    const dateString = now.toLocaleDateString('en-GB', options).replace(/,/g, '');
    document.querySelector('.current-date').textContent = dateString;
}


setInterval(updateDateTime, 1000);
updateDateTime(); 
