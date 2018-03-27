# pl-registration-plate-validator

NPM package for validating user provided Polish registration plate. Works with registration plates issued after 2000 both regular (e.q. WZ 20000) and vanity (WO SIEMA).

## Installation

`npm i "pl-registration-plate-validator"`

## Usage
### ES6 / TypeScript

```
import {validatePlate} from "pl-registration-plate-validator";

const userInput = "WY 52322"; 
const isPlateValid = validatePlate(userInput);
```

### ES5

```
var validePlate = require("pl-registration-plate-validator");
var isPlateValid = validatePlate("WY23003");
```

## Dev
1. `git pull https://github.com/szwarckonrad/pl-registration-plate-validator.git`
2. `npm i -D`
3. Scripts:
    * `npm run build` Builds with TSC to ES5 .js module
    * `npm run test` Fire ups Jest test 