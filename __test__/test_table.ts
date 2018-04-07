import {IValidRegularPlate} from "../lib/interfaces";
import {IInvalidPlate} from "../lib/interfaces";

export interface ITestTableEntry {
    plate: string;
    result: IValidRegularPlate | IInvalidPlate | any;
    label: string;
}

const invalidPlate: IInvalidPlate = {
    valid: false
};

export const testTable: ITestTableEntry[] = [
    {label: "non letter first symbol", plate: "0WY00", result: invalidPlate},
    {label: "not found regular prefix", plate: "VW 12345", result: invalidPlate},
    {label: "too short regular suffix", plate: "WU 12", result: invalidPlate},
    {label: "not found vanity prefix", plate: "H1 TEST", result: invalidPlate},
    {label: "too short vanity suffix", plate: "W0 A", result: invalidPlate},
    {label: "too long vanity suffix", plate: "W0 AAAAAAAAAAAAAA", result: invalidPlate},
    {label: "vanity suffix with two first chars being numbers", plate: "W0 12BCD", result: invalidPlate},
    {label: "3 chars vanity suffix with first char being a number", plate: "E9 1AB", result: invalidPlate},
    {label: "too long suffix for 2 letter prefix", plate: "WU 123456", result: invalidPlate},
    {label: "4 chars vanity suffix with not last two chars being a number", plate: "W0 A12D", result: invalidPlate},
    {label: "5 chars vanity suffix with not  last two chars being a number", plate: "W0 123AB", result: invalidPlate},
    {
        label: "specials", plate: "W&U()(*12345", result: {
            city: "Warszawa", county: "Ochota", type: "regular", valid: true, voivodeship: "mazowieckie"
        }
    },
    {
        label: "valid regular plate, 2 letter prefix", plate: "WY 12345", result: {
            city: "Warszawa", county: "Wola", type: "regular", valid: true, voivodeship: "mazowieckie"
        }
    },
    {
        label: "valid regular plate, 3 letter prefix", plate: "WWL 1234", result: {
            city: "Wołomin", county: "wołomiński", type: "regular", valid: true, voivodeship: "mazowieckie"
        }
    },

    {
        label: "vanity suffix with two last chars being numbers", plate: "W0 ABC01", result: {
            type: "vanity", valid: true, voivodeship: "mazowieckie"
        }
    },
    {
        label: "3 chars vanity suffix with second char being a number", plate: "E7 A1B", result: {
            type: "vanity", valid: true, voivodeship: "łódzkie"
        }
    },
    {
        label: "3 chars vanity suffix with last two chars being a number", plate: "W0 A12", result: {
            type: "vanity", valid: true, voivodeship: "mazowieckie"
        }
    },
    {
        label: "3 chars vanity suffix with last one chars being a number", plate: "W0 AB2", result: {
            type: "vanity", valid: true, voivodeship: "mazowieckie"
        }
    },
    {
        label: "4 chars vanity suffix with last two chars being a number", plate: "W0 AD12", result: {
            type: "vanity", valid: true, voivodeship: "mazowieckie"
        }
    },
];
