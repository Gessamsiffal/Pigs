'use strict'
// Выбираем элементы
const score0Element = document.querySelector('#score--0')
const score1Element = document.getElementById('score--1')
const diceElement = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const current0Element = document.getElementById('current--0')
const current1Element = document.getElementById('current--1')
const player0Element = document.querySelector('.player--0')
const player1Element = document.querySelector('.player--1')
//Отдельные значения
let currentScore, activePlayer, totalScore, isPlaying

const initGame = function () {
	currentScore = 0
	activePlayer = 0
	totalScore = [0, 0]
	isPlaying = true
	//Стартовые значения
	score0Element.textContent = 0
	score1Element.textContent = 0
	score0Element.textContent = 0
	score1Element.textContent = 0
	current0Element.textContent = 0
	current1Element.textContent = 0
	player0Element.classList.remove('player--winner')
	player1Element.classList.remove('player--winner')
	player0Element.classList.remove('player--active')
	player1Element.classList.remove('player--active')
	player0Element.classList.add('player--active')
	diceElement.classList.add('hidden')
}

//Переключить игрока
const switchActivePlayer = function () {
	currentScore = 0
	document.getElementById(`current--${activePlayer}`).textContent = currentScore
	activePlayer = activePlayer == 0 ? 1 : 0 //меняем игрока
	player0Element.classList.toggle('player--active')
	player1Element.classList.toggle('player--active')
}
//Бросок кубика
btnRoll.addEventListener('click', function () {
	if (isPlaying) {
		//1. Генерация случайного числа
		const diceNumber = Math.trunc(Math.random() * 6) + 1
		console.log(diceNumber)
		//2. Отображение числа
		diceElement.classList.remove('hidden')
		diceElement.src = `./files/dice${diceNumber}.png`

		//3.Если число = 1, меняем игрока
		if (diceNumber !== 1) {
			currentScore += diceNumber
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore
		} else {
			switchActivePlayer()
		}
	}
})

btnHold.addEventListener('click', function () {
	if (isPlaying) {
		//1 Добавляем текущие очки к активному игроку
		totalScore[activePlayer] += currentScore
		document.getElementById(`score--${activePlayer}`).textContent =
			totalScore[activePlayer]
		//2 Если общий счёт актив игрока больше 100, активный игрок выиграл, если нет то меняем активного игрока

		if (totalScore[activePlayer] >= 20) {
			isPlaying = false
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner')
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active')
			diceElement.classList.add('hidden')
		} else {
			switchActivePlayer()
		}
	}
})

btnNew.addEventListener('click', initGame)
