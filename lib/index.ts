import {flatten, includes, isNaN, map} from "lodash";

const regularPlatesJSON: IRegularPlate[] = require("../data/polish_registration_plates.json");
const vanityPlatesJSON: IVanityPlate[] = require("../data/polish_vanity_plates.json");

/**
 * Types
 */

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

type IPlate = Array<string|number>;

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
    if (isVanityPlate(typeAwarePlate)) {
        return isValidVanityPlate(typeAwarePlate);
    }

    // Perform validation on the plate
    return isValidPlate(typeAwarePlate);
};

/**
 * Validators
 */

const isValidVanityPlate = (plate: IPlate): boolean => {
    // Only two last symbols might be a number
    const [, , ...suffix] = plate; // Skip voivodeship prefix (e.q W0);
    console.log(suffix);

    switch (suffix.length) {
        case 3:
            console.log("3 letter suffix");
            if (typeof suffix[0] !== "string") {
                return false;
            }
            break;
        case 4:
            if (typeof suffix[0] !== "string" || typeof suffix[1] !== "string") {
                return false;
            }
            break;
        case 5:
            if (typeof suffix[0] !== "string" || typeof suffix[1] !== "string" && typeof suffix[2] !== "string") {
                return false;
            }
            break;
        default:
            break;
    }

    // Everything seems ok! Lets check our voivodeship prefix against valid ones
    const flatVanityPlatesArray = flatten(map(vanityPlatesJSON, (element: IVanityPlate) => element.prefix));
    return flatVanityPlatesArray.indexOf(`${plate[0]}${plate[1]}`) !== -1;
};

const isValidPlate = (plate: IPlate): boolean => {
    if (plate.length !== 7 && plate.length !== 8) {
        return false;
    }
    const isThreeLettersPlate = typeof plate[2] === "string";
    const twoLettersPlate = `${plate[0]}${plate[1]}`;
    const threeLettersPlate = `${plate[0]}${plate[1]}${plate[2]}`;
    if (!isThreeLettersPlate && plate.length === 8) {
        return false;
    }
    const flatPlatesArray = flatten(map(regularPlatesJSON, (element: IRegularPlate) => element.prefix));

    return includes(flatPlatesArray, isThreeLettersPlate ? threeLettersPlate : twoLettersPlate);
};

/**
 * Utils
 */

const isVanityPlate = (plate: IPlate): boolean => {
    const matchRegexp = (/[A-Z]/g);
    // Tests made on the base of https://pl.wikipedia.org/wiki/Tablice_rejestracyjne_w_Polsce#Tablice_indywidualne
    if (typeof plate[1] !== "number" || !matchRegexp.test(plate[2] as string)) {
        return false;
    } else if (plate.length < 5 || plate.length > 7) {
        return false;
    }
    return true;
};

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
 * Errors
 */

const userInputError = (input: string): TypeError => {
    throw new TypeError(`Input has to be a string. ${typeof input} is not a "string"`);
};
