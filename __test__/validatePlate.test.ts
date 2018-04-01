import {map} from "lodash";

import {validatePlate} from "../lib";
import {testTable} from "./test_table";

describe("validatePlate initial tests", () => {
    test("Function is defined", () => {
        expect(validatePlate).toBeDefined();
    });
    test("Throw error if typeof userInput !== \"string\", pass otherwise", () => {
        const t = () => validatePlate(0);
        expect(t).toThrowError(TypeError);
    });
    test("Return false if provided plate first symbol isnt a letter", () => {
        expect(validatePlate("0WY00")).toBe(false);
    });
});

describe("Module is correctly parsing: ", () => {
    map(testTable, (entry) => {
        return test(entry.label, () => {
            expect(validatePlate(entry.plate)).toBe(entry.result);
        });
    });
});
