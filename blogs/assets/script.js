
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
  }
}
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
