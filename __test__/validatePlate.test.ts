import {validatePlate} from "../lib";

describe("validatePlate initial tests", () => {
    test("Function is defined", () => {
        expect(validatePlate).toBeDefined();
    });
    test("Throw error if typeof userInput !== \"string\", pass otherwise", () => {
        expect(() => validatePlate(0).toThrowError(TypeError));
    });
    test("Return false if provided plate first symbol isnt a letter", () => {
        expect(validatePlate("0WY00")).toBe(false);
    });
});

describe("validatePlate return tests", () => {
    test("Providing valid vanity plate should return gloabl true", () => {
        expect(validatePlate("W0 TEST")).toBe(true);
    });
});
