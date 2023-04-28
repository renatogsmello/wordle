const loadWords = async () => {
	return fetch("./words.json")
		.then((res) => res.json())
		.then((res) => console.log(res))
		.catch((err) => console.log(err))
}

console.log(loadWords())
