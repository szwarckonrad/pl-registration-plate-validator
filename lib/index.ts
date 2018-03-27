import {flatten, isNaN, map, reverse} from "lodash";

const regularPlatesJSON: IRegularPlate[] = require("../data/polish_registration_plates.json");
const vanityPlatesJSON: IVanityPlate[] = require("../data/polish_vanity_plates.json");

interface IVanityPlate {
    prefix: string[];
    voivodeship: string;
}

interface IRegularPlate {
    prefix: string;
    voivodeship: string;
    county: string;
    city: string;
}

/**
 * Main
 */

export const validatePlate = (userInput: string): boolean => {
    // User input validation, userInput may be a string only.
    if (typeof userInput !== "string") {
        throw userInputError(userInput);
    }

    // Strip userInput of all but letters and numbers. Also, return upperCased.
    const cleanPlate = standardizeUserInput(userInput);

    // No need to continue if first symbol isn't a letter
    if (!(/[A-Z]/g).test(cleanPlate[0])) {
        return false;
    }

    // Parse provided plate to form of ["W", "X", 2, 0, 0, 0, 0]
    const deconstructedPlate = cleanPlate.split("");
    const typeAwarePlate = parseSymbols(deconstructedPlate);

    // Check if plate is of vanity type and validate.
    if (isValidVanityPlate(typeAwarePlate)) {
        return true;
    }
    return false;

};

/**
 * Validators
 */

const isValidVanityPlate = (plate: Array<string | number>): boolean => {
    const matchRegexp = (/[A-Z]/g);
    // Tests made on the base of https://pl.wikipedia.org/wiki/Tablice_rejestracyjne_w_Polsce#Tablice_indywidualne
    if (typeof plate[1] !== "number" || !matchRegexp.test(plate[2] as string)) {
        // Start with broadest test
        return false;
    } else if (plate.length < 5 || plate.length > 7) {
        // Check the length of all symbols
        return false;
    }
    // Only two last symbols might be a number
    const [, , ...suffix] = plate; // Skip voivodeship prefix (e.q W0);
    const [, , ...suffixBase] = reverse(suffix); // Can't use ...rest as first element so we reverse the array :>
    map(suffixBase, (element) => {
        if (typeof element !==  "string" || !matchRegexp.test(element)) {
            return false;
        }
    });
    // Everything seems ok! Lets check our voivodeship prefix against valid ones
    const flatVanityPlatesArray = flatten(map(vanityPlatesJSON, (element: IVanityPlate) => element.prefix));
    return flatVanityPlatesArray.indexOf(`${plate[0]}${plate[1]}`) !== -1;
};

/**
 * Utils
 */

const standardizeUserInput = (input: string) => {
    const noSpecialsInput = input.replace(/[^A-Za-z0-9]/g, "");
    return noSpecialsInput.toUpperCase();
};

// Need proper typeof of plate array elements
const parseSymbols = (plate: string[]) => {
    return map(plate, (symbol) => {
        if (isNaN(parseInt(symbol, 10))) {
            return symbol;
        }
        return parseInt(symbol, 10);
    });
};

/**
 * Helpers
 */

const userInputError = (input: string): TypeError => {
    throw new TypeError(`Input has to be a string. ${typeof input} is not a "string"`);
};
