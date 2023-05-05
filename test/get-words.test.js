const app = require("../script")

describe("Loading words from JSON", () => {
	test("should return an array with 2 itens", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(["house", "candy"]),
			})
		)

		expect(await app.loadWords()).toEqual(["house", "candy"])
	})
})
