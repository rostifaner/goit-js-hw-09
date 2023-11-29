const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');
const INTERVAL = 1000;
stop.disabled = true;
let timerColor;

start.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;
  changeColorInterval();
});

stop.addEventListener('click', () => {
  clearInterval(timerColor);
  start.disabled = false;
  stop.disabled = true;
});

function changeColorInterval() {
  timerColor = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
