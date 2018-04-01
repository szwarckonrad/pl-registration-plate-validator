export interface ITestTableEntry {
    plate: string;
    result: boolean;
    label: string;
}

export const testTable: ITestTableEntry[] = [
    {label: "specials", plate: "W&U()(*12345", result: true},
    {label: "not found regular prefix", plate: "VW 12345", result: false},
    {label: "too short regular suffix", plate: "WU 12", result: false},
    {label: "too long regular suffix", plate: "WU 1234567", result: false},
    {label: "valid regular plate, 2 letter prefix", plate: "WY 12345", result: true},
    {label: "valid regular plate, 3 letter prefix", plate: "WWL 1234", result: true},
    {label: "not found vanity prefix", plate: "H1 TEST", result: false},
    {label: "too short vanity suffix", plate: "W0 A", result: false},
    {label: "too long vanity suffix", plate: "W0 AAAAAAAAAAAAAA", result: false},
    {label: "vanity suffix with two last chars being numbers", plate: "W0 ABC01", result: true},
    {label: "vanity suffix with two first chars being numbers", plate: "W0 12BCD", result: false},
    {label: "3 chars vanity suffix with first char being a number", plate: "W0 1AB", result: false},
    {label: "3 chars vanity suffix with second char being a number", plate: "E7 A1B", result: true},
    {label: "3 chars vanity suffix with last two chars being a number", plate: "W0 A12", result: true},
    {label: "3 chars vanity suffix with last one chars being a number", plate: "W0 AB2", result: true},
    {label: "4 chars vanity suffix with not last two chars being a number", plate: "W0 A12D", result: false},
    {label: "4 chars vanity suffix with last two chars being a number", plate: "W0 AD12", result: true},
];
