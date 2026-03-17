const timeEl = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsEl = document.getElementById("laps");

let startTimestamp = 0;
let elapsedMs = 0;
let timerId = null;
let lapCount = 0;

function formatTime(ms) {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  const centiseconds = Math.floor((ms % 1000) / 10)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}.${centiseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const currentMs = elapsedMs + (now - startTimestamp);
  timeEl.textContent = formatTime(currentMs);
}

function startTimer() {
  startTimestamp = Date.now();
  timerId = setInterval(updateDisplay, 30);
  startPauseBtn.textContent = "Pause";
  lapBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  elapsedMs += Date.now() - startTimestamp;
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
}

function addLap() {
  const currentMs = elapsedMs + (Date.now() - startTimestamp);
  lapCount += 1;

  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount}: ${formatTime(currentMs)}`;
  lapsEl.appendChild(li);
}

function resetTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  startTimestamp = 0;
  elapsedMs = 0;
  lapCount = 0;
  timeEl.textContent = "00:00.00";
  lapsEl.innerHTML = "";
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
}

startPauseBtn.addEventListener("click", () => {
  if (timerId) {
    pauseTimer();
  } else {
    startTimer();
  }
});

lapBtn.addEventListener("click", addLap);
resetBtn.addEventListener("click", resetTimer);
