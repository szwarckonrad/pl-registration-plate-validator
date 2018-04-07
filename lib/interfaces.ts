export interface IJSONRegularPlate {
    prefix: string;
    voivodeship: string;
    county: string;
    city: string;
}

export interface IJSONVanityPlate {
    prefix: string[];
    voivodeship: string;
}

export interface IInvalidPlate {
    valid: false;
}

export interface IValidVanityPlate {
    valid: boolean;
    type: "regular" | "vanity";
    voivodeship: string;
}

export interface IValidRegularPlate extends IValidVanityPlate {
    county: string;
    city: string;
}

export type IValidationResult = IInvalidPlate | IValidRegularPlate | IValidVanityPlate;
export type IPlate = Array<string | number>;
