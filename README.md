# Calculator

An excercise to create a scalable calculator, which accepts two operands.

## Description

This is a Binary Calculator by default, which supports only addition and subtraction. 
Operands are limited to two.

* The base/radix of the numbers can be configured.
* The number buttons can be configured.
* Operations other than addition and subtraction can also be configured.
* UI button elements for numbers and operators are created dynamically by taking the above configurations.

## Dependencies

* Web Browser

## Executing program

* Download code from [here](https://github.com/suhas-shamasundara/calculator.git)
* Open the calculator.html or calculator_all_minified.html in a Web Browser.
* Use Mouse to click on the buttons OR type from keyboard to calculate 😊

## Configuration
* Calculator() call sets up the binary calculator
* Numbers 0 and 1 are supported by default.
* +, - and = operations are supported by default.
* Numbers and operators can be configured by calling the Calculator function using below format :
``` Calculator(numbersArray, base, operatorsSupported)```
* Examples : 
	* Below call will create a decimal calculator which supports addition, subtraction, multiplication and division.
	```Calculator([2,3,4,5,6,7,8,9],10,['/','*'])```
	* Below call will create a hexadecimal calculator which supports addition, subtraction, multiplication and division.
	```Calculator([2,3,4,5,6,7,8,9,'A','B','C','D','E','F'],16,['/','*']);*/```

## Note

* calculator_all_minified.html consists of HTML, JS and CSS code - minified.
* calculator.html imports calculator.js and calculator.css - which are readable.

## Authors

Suhas Shamasundara
suas02@gmail.com

## Version History

* 1.0.0
    * Initial Release