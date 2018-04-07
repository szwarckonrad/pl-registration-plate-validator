import {find, includes} from "lodash";

import {
    IInvalidPlate,
    IJSONRegularPlate,
    IJSONVanityPlate,
    IPlate,
    IValidationResult,
    IValidRegularPlate,
    IValidVanityPlate
} from "./interfaces";
import {isVanityPlate, parseSymbols, standardizeUserInput, userInputError} from "./utilities";

const regularPlatesJSON: IJSONRegularPlate[] = require("../data/polish_registration_plates.json");
const vanityPlatesJSON: IJSONVanityPlate[] = require("../data/polish_vanity_plates.json");

/**
 * Constants
 */

const invalidPlate: IInvalidPlate = {
    valid: false
};

/**
 * Main
 */

export const validatePlate = (userInput: string): IValidationResult => {
    // User input validation, userInput may be a string only.
    if (typeof userInput !== "string") {
        userInputError(userInput);
    }

    // Strip userInput of all but letters and numbers. Also, return upperCased.
    const cleanPlate = standardizeUserInput(userInput);

    // No need to continue if first symbol isn't a letter
    if (!(/[A-Z]/g).test(cleanPlate[0])) {
        return invalidPlate;
    }

    // Parse provided plate to form of ["W", "X", 2, 0, 0, 0, 0]
    const deconstructedPlate = cleanPlate.split("");
    const typeAwarePlate = parseSymbols(deconstructedPlate);

    // Check if plate is of vanity type and validate.
    if (isVanityPlate(typeAwarePlate)) {
        return isValidVanityPlate(typeAwarePlate);
    }

    // Perform validation on the regular plate
    return isValidPlate(typeAwarePlate);
};

/**
 * Validators
 */

const isValidVanityPlate = (plate: IPlate): IValidVanityPlate | IInvalidPlate => {
    // Only two last symbols might be a number
    const [, , ...suffix] = plate; // Skip voivodeship prefix (e.q W0);

    switch (suffix.length) {
        case 3:
            if (typeof suffix[0] !== "string") {
                return invalidPlate;
            }
            break;
        case 4:
            if (typeof suffix[0] !== "string" || typeof suffix[1] !== "string") {
                return invalidPlate;
            }
            break;
        default: // case 5
            if (typeof suffix[0] !== "string" || typeof suffix[1] !== "string" || typeof suffix[2] !== "string") {
                return invalidPlate;
            }
            break;
    }
    const vanityPrefix = `${plate[0]}${plate[1]}`;
    // Everything seems ok! Lets check our voivodeship prefix against valid ones
    const foundVanityPlate = find(vanityPlatesJSON,
        (element: IJSONVanityPlate) => includes(element.prefix, vanityPrefix));

    if (foundVanityPlate) {
        return {
            type: "vanity",
            valid: true,
            voivodeship: foundVanityPlate.voivodeship
        };
    }

    return invalidPlate;
};

const isValidPlate = (plate: IPlate): IValidRegularPlate | IInvalidPlate => {
    if (plate.length !== 7 && plate.length !== 8) {
        return invalidPlate;
    }
    const isThreeLettersPlate = typeof plate[2] === "string";
    const twoLettersPlate = `${plate[0]}${plate[1]}`;
    const threeLettersPlate = `${plate[0]}${plate[1]}${plate[2]}`;
    const finalPrefix = isThreeLettersPlate ? threeLettersPlate : twoLettersPlate;

    if (!isThreeLettersPlate && plate.length === 8) {
        return invalidPlate;
    }
    const foundPlate = find(regularPlatesJSON, (element: IJSONRegularPlate) => element.prefix === finalPrefix);

    if (foundPlate) {
        return {
            city: foundPlate.city,
            county: foundPlate.county,
            type: "regular",
            valid: true,
            voivodeship: foundPlate.voivodeship,
        };
    }

    return invalidPlate;
};
