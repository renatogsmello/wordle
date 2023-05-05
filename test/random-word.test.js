const app = require("../script")

describe("Get one random word", () => {
	test("should return the first word with 0.1 mock response", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.1)
		expect(app.chooseWord(["allow", "agree"])).toBe("allow")
	})

	test("should return the first word when 0.4 mock response", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.4)
		expect(app.chooseWord(["allow", "agree"])).toBe("allow")
	})

	test("should return the second word when 0.5 mock response", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.5)
		expect(app.chooseWord(["allow", "agree"])).toBe("agree")
	})

	test("should return the second word of list with 2 items", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.6)
		expect(app.chooseWord(["allow", "agree"])).toBe("agree")
	})

	test("should return the last word of list with 4 items", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.6)
		expect(app.chooseWord(["allow", "agree", "candy", "sorry"])).toBe("candy")
	})

	test("should return the last word of list with 4 items", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.7)
		expect(app.chooseWord(["allow", "agree", "candy", "sorry"])).toBe("candy")
	})

	test("should return the last word of list with 4 items", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.8)
		expect(app.chooseWord(["allow", "agree", "candy", "sorry"])).toBe("sorry")
	})

	test("should return the first word of list with 4 items", () => {
		jest.spyOn(global.Math, "random").mockReturnValue(0.1)
		expect(app.chooseWord(["allow", "agree", "candy", "sorry"])).toBe("allow")
	})
})
