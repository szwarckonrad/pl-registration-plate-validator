import {map} from "lodash";

import {IPlate} from "./interfaces";

/**
 * Utils
 */

export const isVanityPlate = (plate: IPlate): boolean => {
    // Tests made on the base of https://pl.wikipedia.org/wiki/Tablice_rejestracyjne_w_Polsce#Tablice_indywidualne
    if (typeof plate[1] !== "number") {
        return false;
    } else if (plate.length < 5 || plate.length > 7) {
        return false;
    }
    return true;
};
export const standardizeUserInput = (input: string) => {
    const noSpecialsInput = input.replace(/[^A-Za-z0-9]/g, "");
    return noSpecialsInput.toUpperCase();
};
export const parseSymbols = (plate: string[]) => {
    return map(plate, (symbol) => {
        if (isNaN(parseInt(symbol, 10))) {
            return symbol;
        }
        return parseInt(symbol, 10);
    });
};

/**
 * Errors
 */

export const userInputError = (input: any): TypeError => {
    throw new TypeError(`Input has to be a string. ${typeof input} is not a "string"`);
};
