let timerInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const millisecondsElem = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('lap-btn').addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = Lap ${lapCounter++}: ${lapTime};
        lapList.appendChild(lapItem);
    }
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    const [hours, minutes, seconds, milliseconds] = time.split(':');
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
    millisecondsElem.textContent = milliseconds;
}

function formatTime(ms) {
    const totalMilliseconds = Math.floor(ms % 1000);
    const totalSeconds = Math.floor(ms / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const formattedHours = String(totalHours).padStart(2, '0');
    const formattedMinutes = String(totalMinutes % 60).padStart(2, '0');
    const formattedSeconds = String(totalSeconds % 60).padStart(2, '0');
    const formattedMilliseconds = String(Math.floor(totalMilliseconds / 10)).padStart(2, '0');

    return ${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds};
}
