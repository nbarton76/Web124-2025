/* -----------------------------------
   Nichelle Barton
   Countdown Timer Script
   October 8, 2025
----------------------------------- */

/* form handling + pause/resume + times-up
*/

let countdown = null;
let isPaused = false;
let remainingSeconds = 0;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const pauseButton = document.getElementById('pauseResume');

// safer selection for form + input
const customForm = document.querySelector('#custom'); // id="custom" on form
const minutesInput = document.querySelector('#custom input[name="minutes"]'); // input inside the form

// sound (non-blocking)
const timeUpSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_17c42b8c06.mp3');
timeUpSound.preload = 'auto';

// ---- Utility / debug helpers ----
function log(...args) {
  // plain wrapper so you can disable later if desired
  console.log('[timer]', ...args);
}

// immediate sanity checks (will show in console on load)
log('scripts.js loaded.');
log('customForm:', customForm);
log('minutesInput:', minutesInput);

// ---- Timer logic ----
function timer(seconds) {
  clearInterval(countdown);
  isPaused = false;
  const now = Date.now();
  const then = now + seconds * 1000;
  remainingSeconds = seconds;

  // remove any previous flash state
  timerDisplay.classList.remove('flash');

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    if (isPaused) return;

    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      remainingSeconds = 0;
      displayTimeLeft(0);
      timeUp();
      return;
    }
    remainingSeconds = secondsLeft;
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  if (timerDisplay) timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  if (!endTime) return;
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function timeUp() {
  // visual
  if (timerDisplay) timerDisplay.classList.add('flash');

  // audio (play may be blocked silently by browser if not initiated by user)
  timeUpSound.play().catch(err => log('Audio play prevented:', err));
}

// ---- Controls ----
function startTimerFromButton() {
  const seconds = parseInt(this.dataset.time, 10);
  if (!isFinite(seconds) || seconds <= 0) {
    log('Invalid data-time on button:', this.dataset.time);
    return;
  }
  log('Starting timer from button:', seconds);
  timer(seconds);
}

function togglePause() {
  // if no timer started, ignore
  if (!countdown && remainingSeconds === 0) {
    log('No timer running to pause/resume.');
    return;
  }
  isPaused = !isPaused;
  if (pauseButton) pauseButton.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
  log('Pause toggled. isPaused=', isPaused);
}

// ---- Attach event listeners safely ----
buttons.forEach(btn => btn.addEventListener('click', startTimerFromButton));

// Defensive form handling — ensures we have the elements we need
if (customForm && minutesInput) {
  customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const raw = minutesInput.value;
    const mins = parseFloat(String(raw).trim());
    if (!isFinite(mins) || mins <= 0) {
      alert('Please enter a positive number of minutes.');
      minutesInput.focus();
      return;
    }
    log('Starting timer from form input (minutes):', mins);
    timer(Math.round(mins * 60));
    customForm.reset();
  });
} else {
  log('customForm or minutesInput not found. Check that your form has id="custom" and the input has name="minutes".');
}

// pause button
if (pauseButton) {
  pauseButton.addEventListener('click', togglePause);
} else {
  log('Pause button (#pauseResume) not found. If you want pause, add one to the HTML with that id.');
}

// keyboard shortcut (Space to toggle pause) — avoids triggering scroll when active element is not an input
document.addEventListener('keydown', (e) => {
  // ignore when typing in inputs
  const active = document.activeElement;
  const isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
  if (isTyping) return;
  if (e.code === 'Space') {
    e.preventDefault();
    togglePause();
  }
});
