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
		console.log(word)
	}
}

start()
