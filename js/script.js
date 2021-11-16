const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeElem = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['red', 'yellow', 'blue', 'pink', 'green', '#2ecc71', '#e74c3c', '#e7e71d', ' #1de7aa'];
let time = 0;
let score = 0;

startButton.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
})

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
})

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	}
	else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timeElem.innerHTML = `00:${value}`;
}

function finishGame() {
	timeElem.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(10, 60);
	const { width, height } = board.getBoundingClientRect();
	const x = getRandomNumber(size, width - size);
	const y = getRandomNumber(size, height - size);
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.backgroundColor = colors[getRandomNumber(0, colors.length - 1)];
	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}