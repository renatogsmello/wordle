const wordLength = 5
const keyboard = document.querySelector("[data-keyboard]")
const FLIP_ANIMATION_DURATION = 500

const loadWords = async () => {
	return fetch("./words.json")
		.then((res) => res.json())
		.then((res) => res)
		.catch((err) => console.log(err))
}

function chooseWord(words) {
	const wordIndex = Math.floor(Math.random() * words.length)
	const word = words.at(wordIndex)
	return word
}

const isEnviroment = () => {
	return typeof process !== "undefined" && process.env.NODE_ENV === "test"
}

const start = () => {
	if (isEnviroment()) {
		module.exports = {
			chooseWord,
			isEnviroment,
			loadWords,
		}

		return
	}

	window.onload = async () => {
		const database = await loadWords()
		const word = chooseWord(database)
	}
}

start()

startInterations()
function startInterations() {
	document.addEventListener("click", mouseClickEvent)
	document.addEventListener("keydown", keyPressEvent)
}

function stopInterations() {
	document.removeEventListener("click", mouseClickEvent)
	document.removeEventListener("keydown", keyPressEvent)
}

function mouseClickEvent(e) {
	if (e.target.matches("[data-key]")) {
		pressKey(e.target.dataset.key)
		return
	}

	if (e.target.matches("[data-enter]")) {
		submitGuess()
		return
	}
	if (e.target.matches("[data-delete]")) {
		deleteKey()
		return
	}
}

function keyPressEvent(e) {
	if (e.key === "Enter") {
		submitGuess()
		return
	}
	if (e.key === "Backspace" || e.key === "Delete") {
		deleteKey()
		return
	}
	if (e.key.match(/^[a-z]$/)) {
		pressKey(e.key)
	}
}

function pressKey(key) {
	const activeTiles = getActiveTiles()
	if (activeTiles.length >= wordLength) return
	const grid = document.getElementById("guess-grid")
	const nextTile = grid.querySelector(":not([data-letter])")
	nextTile.dataset.letter = key.toLowerCase()
	nextTile.textContent = key
	nextTile.classList.replace("border-neutral-600", "border-neutral-400")

	nextTile.dataset.state = "active"
}

function deleteKey() {
	const activeTiles = getActiveTiles()
	const lastTile = activeTiles[activeTiles.length - 1]
	if (lastTile == null) return
	lastTile.textContent = ""

	lastTile.classList.replace("border-neutral-400", "border-neutral-600")
	delete lastTile.dataset.letter
	delete lastTile.dataset.state
}

function getActiveTiles() {
	const grid = document.getElementById("guess-grid")
	return grid.querySelectorAll('[data-state="active"]')
}

function submitGuess() {
	const activeTiles = [...getActiveTiles()]
	if (activeTiles.length !== wordLength) {
		showMessage("Preencha todas as letras", "error")
		shakeTiles(activeTiles)
	}
	const guess = activeTiles.reduce((word, tile) => {
		return word + tile.dataset.letter
	}, "")

	checkWord(guess)
}

function showMessage(text, type) {
	const messageContainer = document.getElementById("message")
	const message = document.createElement("div")
	message.classList.add("rounded-xl", "pointer-events-none", "opacity-100", "transition-opacity", "duration-500", "px-3", "py-1")
	message.innerText = text
	if (type === "error") {
		message.classList.add("bg-red-500", "text-red-900")
	}
	messageContainer.prepend(message)

	setTimeout(() => {
		message.classList.replace("opacity-100", "opacity-0")
		message.addEventListener("transitionend", () => {
			message.remove()
		})
	}, 1000)
}

function shakeTiles(tiles) {
	tiles.map((tile) => {
		tile.classList.add("animate-shake")
		tile.addEventListener(
			"animationend",
			() => {
				tile.classList.remove("animate-shake")
			},
			{ once: true }
		)
	})
}

const checkWord = async (word) => {
	const dictionary = await loadWords()
	const activeTiles = [...getActiveTiles()]
	console.log(!dictionary.find((w) => w == word))
	if (!dictionary.find((w) => w == word)) {
		showMessage("Palavra não encontrada", "error")
		shakeTiles(activeTiles)
		return
	}

	stopInterations()
	activeTiles.forEach((...params) => flipTiles(...params, guess))
}

function flipTiles(tile, index, array, guess) {
	const letter = tile.dataset.letter
	const key = keyboard.querySelector(`[data-key="${letter}"]`)

	setTimeout(() => {
		tile.classList.add("tramsition")
	}, (index * FLIP_ANIMATION_DURATION) / 2)
}
