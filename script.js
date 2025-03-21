let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTime = 0;

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function formatTime(time) {
    let milliseconds = time % 1000;
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / (1000 * 60)) % 60;
    let hours = Math.floor(time / (1000 * 60 * 60));
    
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    startStopBtn.textContent = "Pause";
    startStopBtn.classList.remove("start");
    startStopBtn.classList.add("reset");
    lapBtn.disabled = false;
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timer);
    startStopBtn.textContent = "Resume";
    startStopBtn.classList.remove("reset");
    startStopBtn.classList.add("start");
    lapBtn.disabled = true;
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("reset", "start");
    startStopBtn.classList.add("start");
    lapBtn.disabled = true;
    lapList.innerHTML = "";
    elapsedTime = 0;
    timeDisplay.textContent = formatTime(elapsedTime);
    isRunning = false;
}

function recordLap() {
    lapTime = elapsedTime;
    const lapItem = document.createElement("li");
    lapItem.textContent = "Lap " + (lapList.children.length + 1) + ": " + formatTime(lapTime);
    lapList.appendChild(lapItem);
}

startStopBtn.addEventListener("click", function() {
    if (isRunning) {
        stopStopwatch();
    } else {
        if (elapsedTime === 0) {
            startStopwatch();
        } else {
            startStopwatch();
        }
    }
});

resetBtn.addEventListener("click", function() {
    resetStopwatch();
});

lapBtn.addEventListener("click", function() {
    recordLap();
});