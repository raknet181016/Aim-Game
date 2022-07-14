const startButton = document.querySelector("#start");
const timeSpan = document.querySelector("#time");
const board = document.querySelector("#board");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#timeList");
let time = 1;
let point = 0;

startButton.addEventListener("click", (event) => {
    event.preventDefault();
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"));
        startGame();
        screens[1].classList.add("up");
    }
});

board.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
        point++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame(time) {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    timeSpan.innerHTML = `00:${time}`;
}

function decreaseTime() {
    let current = --time;
    if (current === 0) {
        finishGame();
    } else if (current < 10) {
        timeSpan.innerHTML = `00:0${time}`;
    } else {
        timeSpan.innerHTML = `00:${time}`;
    }
}

function finishGame() {
    board.innerHTML = `<h1>Счёт: ${point}</h1>`;
    timeSpan.parentNode.remove();
}

function createRandomCircle() {
    const circle = document.createElement("div");
    const size = getRandomNumber(10, 30);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}