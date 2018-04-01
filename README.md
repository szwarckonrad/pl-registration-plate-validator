# pl-registration-plate-validator
[![Build Status](https://travis-ci.org/szwarckonrad/pl-registration-plate-validator.svg?branch=master)](https://travis-ci.org/szwarckonrad/pl-registration-plate-validator)
[![Coverage Status](https://coveralls.io/repos/github/szwarckonrad/pl-registration-plate-validator/badge.svg?branch=master)](https://coveralls.io/github/szwarckonrad/pl-registration-plate-validator?branch=master)

NPM package for validating user provided Polish registration plate. Works with registration plates issued after 2000 both regular (e.q. WZ 20000) and vanity (WO SIEMA).

In current version package exports a function of boolean return that takes a string as an argument.

## Installation

`npm i "pl-registration-plate-validator"`

## Usage
### ES6 / TypeScript

```
import {validatePlate} from "pl-registration-plate-validator";

const userInput = "WY 52322"; 
const isPlateValid = validatePlate(userInput); // True
```

### ES5

```
var validePlate = require("pl-registration-plate-validator");
var isPlateValid = validatePlate("WY23003"); // True
```

## Under the hood

Package runs a series of tests to determine whether a plate is valid or not. Currently, following conditions are taken into consideration:
  * Start with stripping non letter/digit chars that might be provided alongside prefix, suffix pair (such as input of WU-12345)
  * Return false at the very beginning if first char is not of A-Z (upperCased)
  * Vanity or regular (Second char being a number while third a letter)
  * Length of both types (regular 7-8, vanity 5-7)
  * Prefix existence in provided JSON data files(both XY and XYZ prefixes)
  * Vanity plate suffix can contain of no more than 2 digits, placed in two last chars.
   

## Dev
1. `git pull https://github.com/szwarckonrad/pl-registration-plate-validator.git`
2. `npm i -D`
3. Scripts:
    * `npm run build` Builds with TSC to ES5 .js module
    * `npm run test` Fire ups Jest tests
    
## TODO
1. Add description of tests module runs to determine whether the plate is valid or not.
2. Add verbose mode that will return an object with detailed info on the plate.