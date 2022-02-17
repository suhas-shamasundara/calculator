/*This is a Binary Calculator by default.
Only addition and subtraction operations are supported. Operands are limited to two.
The base of the numbers and the possible numbers can be configured.
Operations other than addition and subtraction can also be configured.
UI button elements for numbers and operators are created dynamically.*/
function Calculator(supportedNumbers = [], base = 2, supportedOperators = []) {
    const CLEAR_ALL_KEY = "C"
    const CLEAR_CURRENT_KEY = "CE";
    const ENTER_KEY = "ENTER";
    const RADIX = base;
    const TOGGLE_OPERATOR = "1";
    const BUTTON_CLICK_ANIMATION = "buttonClick 0.3s";
    let validNumbers = [0, 1];
    let validOperatorBtns = ['-', '+', '=', CLEAR_ALL_KEY, CLEAR_CURRENT_KEY];
    let validOperators = ['-', '+', '=', CLEAR_ALL_KEY, CLEAR_CURRENT_KEY, ENTER_KEY];

    var operatorSelected = "";
    var firstOperand = "";
    var secondOperand = "";
    var isToggleResult = false;
    var resultShown = false;
    var result = "";

    validNumbers = new Set([...validNumbers, ...supportedNumbers]);
    validNumbers = Array.from(validNumbers).sort();
    validOperatorBtns = new Set([...validOperatorBtns, ...supportedOperators]);
    validOperatorBtns = Array.from(validOperatorBtns).sort();
    validOperators = new Set([...validOperators, ...supportedOperators]);
    validOperators = Array.from(validOperators).sort();

    let numberHolder = document.querySelector("#numbers");
    let controlHolder = document.querySelector("#controls");

    validNumbers.forEach(num => {
        var x = document.createElement("button");
        x.dataset.number = x.innerText = num;
        x.onclick = numberHandler;
        numberHolder.append(x);
    });

    validOperatorBtns.forEach(op => {
        var x = document.createElement("button");
        x.dataset.operator = x.innerText = op;
        x.onclick = operatorHandler;
        controlHolder.append(x);
    });

    function display(value = "") {
        let displayUnit = document.querySelector("#displayUnit");
        displayUnit.innerText = value;
    }

    function operatorHandler(e) {
        animateBtn(e.target);
        let operator = e.target.dataset.operator.toUpperCase();

        if (!firstOperand) {
            return; //If no operand is input, do nothing on operators.
        }
        if (operator == CLEAR_ALL_KEY) {
            clearAll();
            return;
        }
        if (operator == CLEAR_CURRENT_KEY) {
            clearCurrent();
            return;
        }
        if (operator == '=') {
            //Show result or repeat operation or do nothing
            if (firstOperand && operatorSelected && secondOperand) {
                isToggleResult ? display(result) : evaluateResult();
            }
        } else {
            //the operator should change only if the second operand is not yet provided.
            if (!secondOperand) {
                operatorSelected = operator;
                display(operator);
            }
        }
    }

    function numberHandler(e) {
        animateBtn(e.target);
        let numValue = e.target.dataset.number;

        if (resultShown) {
            // If result is shown, either toggle or do nothing.
            if (numValue == TOGGLE_OPERATOR) {
                isToggleResult = true;
                display(`${firstOperand} ${operatorSelected} ${secondOperand}`);
            }
            return;
        }

        if (!operatorSelected) {
            firstOperand += numValue;
            checkNumberSafety(firstOperand, RADIX) ? display(firstOperand) : showError();
        } else {
            secondOperand += numValue;
            checkNumberSafety(secondOperand, RADIX) ? display(secondOperand) : showError();
        }
    }

    function evaluateResult() {
        if (result) {
            firstOperand = result;
        }
        result = eval(parseInt(firstOperand, RADIX) + operatorSelected + parseInt(secondOperand, RADIX));
        if (checkNumberSafety(result)) {
            result = result.toString(RADIX).toUpperCase();
            display(result);
            resultShown = true;
        } else {
            showError();
        }
    }

    function checkNumberSafety(value, base = 10) {
        value = parseInt(value, base);
        return (value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER);
    }

    function showError() {
        clearAll();
        display(`SAFE LIMIT EXCEEDED`);
    }

    function animateBtn(btn) {
        btn.style.animation = BUTTON_CLICK_ANIMATION;
        setTimeout(() => {
            btn.style.animation = "";
        }, 100);
    }

    function clearCurrent() {
        if (resultShown) {
            //If result is shown, clear everything on `CE`. Works like `C`.
            clearAll();
        } else if (!firstOperand) {
            //No need to do anything if no operand is provided.
            return;
        } else if (!operatorSelected) {
            // If operator is not selected, then current value is for firstOperand. Clear it.
            firstOperand = "";
            display();
        } else if (!secondOperand) {
            //if secondOperand has no value, then current value is for operator. Clear it.
            operatorSelected = "";
            display(firstOperand);
        } else {
            //if secondOperand has value, then current value is for secondOperand. Clear it.
            secondOperand = "";
            display(operatorSelected);
        }
    }

    function clearAll() {
        operatorSelected = "";
        firstOperand = "";
        secondOperand = "";
        isToggleResult = false;
        resultShown = false;
        result = "";
        display();
    }

    document.addEventListener('keydown', (e) => {
        let keyValue = e.key;
        let isShiftPressed = e.shiftKey;

        if (isNaN(keyValue) && validOperators.includes(e.key.toUpperCase())) {
            keyValue = e.key.toUpperCase();
            if (keyValue == CLEAR_ALL_KEY && isShiftPressed) {
                keyValue = CLEAR_CURRENT_KEY;
            }
            if (keyValue == ENTER_KEY) {
                e.preventDefault();
                keyValue = "=";
            }
            var btnSelector = `[data-operator='${keyValue}']`
            document.querySelector(btnSelector).click();
        } else if (validNumbers.includes(parseInt(keyValue))) {
            let btnSelector = `[data-number='${keyValue}']`
            document.querySelector(btnSelector).click();
        }
    })
}
window.addEventListener("load", () => {
    Calculator();
});

/*Can also try other bases and operations like below :
Calculator([2,3,4,5,6,7,8,9],10,['/','*']);
Calculator([2,3,4,5,6,7,8,9,'A','B','C','D','E','F'],16,['/','*']);*/