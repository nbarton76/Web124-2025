/* -----------------------------------
   Nichelle Barton
   Countdown Timer Script
   October 8, 2025
----------------------------------- */

let countdown;
let isPaused = false;
let remainingSeconds = 0;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const customForm = document.getElementById('custom');
const pauseButton = document.getElementById('pauseResume');
const timeUpSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_17c42b8c06.mp3');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
   
// Added pause/resume//
  countdown = setInterval(() => {
    if (!isPaused) {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft <= 0) {
        clearInterval(countdown);
        displayTimeLeft(0);
        timeUp();
        return;
      }
      remainingSeconds = secondsLeft;
      displayTimeLeft(secondsLeft);
    }
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function togglePause() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
}

function timeUp() {
  timeUpSound.play();
  timerDisplay.classList.add('flash');
  setTimeout(() => {
    timerDisplay.classList.remove('flash');
  }, 4000);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

//Fixed input form handling//
//Added sound alert + flashing animation//
customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (!mins || mins <= 0) return;
  timer(mins * 60);
  this.reset();
});

pauseButton.addEventListener('click', togglePause);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') togglePause();
});
