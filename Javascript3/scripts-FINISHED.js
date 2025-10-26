/* -------------------------------------------------
   Nichelle Barton
   Countdown Timer 
   October 8, 2025
-------------------------------------------------- */

let countdown;
let isPaused = false;
let remainingTime = 0;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const pauseBtn = document.getElementById('pauseBtn');
const timesUpMessage = document.getElementById('timesUpMessage');

// ✅ Added sound for when timer reaches zero
const endSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_bbe8c20896.mp3?filename=notification-110855.mp3');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  remainingTime = seconds;

  // ✅ Hide “Time’s Up!” message when a new timer starts
  timesUpMessage.classList.remove('times-up-active');

  countdown = setInterval(() => {
    if (!isPaused) {
      remainingTime--;
      if (remainingTime < 0) {
        clearInterval(countdown);
        endSound.play();

        // ✅ Show “Time’s Up!” message and animation
        timesUpMessage.classList.add('times-up-active');
        timerDisplay.textContent = "00:00";
        return;
      }
      displayTimeLeft(remainingTime);
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

// ✅ Pause/Resume logic toggle
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
});

buttons.forEach(button => button.addEventListener('click', startTimer));

const customForm = document.getElementById('custom');

//updated nonworking function//
customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
