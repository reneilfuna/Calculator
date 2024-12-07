// Create round function 
function roundDisplay(value){
    if (value > 999999999) return parseFloat(999999999);
    else if (value < -99999999) return parseFloat(-99999999);
    else if (!(value.toString()).includes(".")) return value;
    else if(!((value.toString()).includes("-"))){
        let valued = value.toString();
        // Positive numbers up to 9 digits
        // but decimal takes length of 1
        let MAXLENGTH = 8;
        integerPart = valued.split(".")[0];
        decimalPart = valued.split(".")[1];
        if (integerPart.length >= MAXLENGTH) {
            return parseInt(integerPart.substring(0, MAXLENGTH)); // No decimals allowed
        }
        else {
            MAXLENGTH -= integerPart.length;
            if (decimalPart.length > MAXLENGTH) {
                decimalPart = decimalPart.substring(0, MAXLENGTH); // Trim decimal part
            }
    
            // Reconstruct the rounded number
            return parseFloat(integerPart + "." + decimalPart);
        }
    }
    else {
        console.log("expected")
        // Negative numbers up to 8 digits
        // - 1 for decimals
        let valued = value.toString();
        let MAXLENGTH = 7;
        integerPart = valued.split(".")[0];
        decimalPart = valued.split(".")[1];
        if (integerPart.length >= MAXLENGTH) {
            console.log("unexpected1")
            return parseInt(integerPart.substring(0, MAXLENGTH)); // No decimals allowed
        }
        else {
            MAXLENGTH -= integerPart.length;
            if (decimalPart.length > MAXLENGTH) {
                decimalPart = decimalPart.substring(0, MAXLENGTH); // Trim decimal part
            }
    
            // Reconstruct the rounded number
            return parseFloat(integerPart + "." + decimalPart);
        }
    }
    return result
}

// Create add function
function add(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else return roundDisplay(parseFloat(val1) + parseFloat(val2));
}

// Create subtract function
function subtract(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else return roundDisplay(parseFloat(val1) - parseFloat(val2));
}
// Create multiply function
function multiply(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else return roundDisplay(parseFloat(val1) * parseFloat(val2));
}

// Create divide function
function divide(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else if (val2 == 0) return "jokeman";
    else return roundDisplay(parseFloat(val1) / parseFloat(val2));
}

// Calculator function consists of a number, an operator and 
// another number

let num1;
let operator;
let num2;
// Boolean value to check whether to clear display
let afterOper;
// Boolean value for edge case
let afterEquals;

// Operate function takes an operator, two numbers and calls the 
// operator on the two numbers

function operate(val1, oper, val2){
    switch (oper){
        case "+":
            return add(+val1, +val2);
        case "-":
            return subtract(+val1, +val2);
        case "\xf7":
            if (val2 == 0) return "jokeman.";
            else return divide(+val1, +val2);
        case "\xD7":
            return multiply(+val1, +val2);
    }
}

const btnContainer = document.getElementById("buttons");

const display = document.getElementById("display");

function numberHandler(number){
    console.log(`Previous input: ${number}`);
    // First digit
    if (afterOper){
        if (number == ".") display.textContent = "0.";
        else{
            display.textContent = number;
            afterOper = false;
            afterEquals = false;
        }
    }
    else{
        // Prevent overflow
        if (!(display.textContent.length >= 9)){
            if (display.textContent == "0" && number != 0){
                if (number == "."){
                    display.textContent += number;
                }
                else display.textContent = number;
            } // Succeeding digits, preventing preceding zeros
            else if (display.textContent != "0"){
                if(display.textContent.includes(".") && number == "."){
                    afterOper = false;
                    afterEquals = false;
                    return;
                }
                display.textContent += number;
            }
        afterOper = false;
        afterEquals = false;
        }
    }
}

function operatorHandler(oper){
    console.log(`Previous input: ${oper}`);
    // Case 1: no operator stored & Case 4: operator called after single calculation
    if ((!num1 && !operator) || afterEquals){
        // store current display in num1
        num1 = display.textContent;
        // store operator
        operator = oper;
    } // Case 2: operator input immediately after operator
    else if(afterOper){
        operator = oper;
    } // Case 3: operator called in chain of calculations
    else if(num1 && operator){ // i.e. "5" "+" "5" "+" "5" "+" "5"
        num2 = display.textContent;
        display.textContent = operate(num1, operator, num2);
        num1 = display.textContent;
        operator = oper;
    } 

    afterOper = true;
    afterEquals = false;
}

function altHandler(button){
    // Case handler
    console.log(`Previous input: ${button}`);
    switch (button){
        case "C":
            // Reset display and clear memory
            display.textContent = "0"
            num1 = undefined;
            num2 = undefined;
            operator = undefined;    
            afterEquals = undefined;
            afterOper = undefined;
            break;
        case "=":
            if (!num2){
                result = operate(num1, operator, display.textContent);
                display.textContent = result;
            }
            else display.textContent = operate(num1, operator, num2);

            afterEquals = true;
            afterOper = false;
            break;
        case "+/-":
            if (display.textContent != 0){
                if (display.textContent.includes("-")){
                    value = display.textContent
                    display.textContent = value.replace("-", "");
                }
                else{
                    value = display.textContent;
                    display.textContent = "-" + value;
                }
            }
            break;
        case "%":
            // Converts the current display value into percentage multiplier
            display.textContent /= 100;
            break;
    }
}

btnContainer.addEventListener("click", (event) => {
    let target = event.target;
    if (target.className.includes("number")){
        numberHandler(target.textContent);
    }
    else if(target.className.includes("operator")){
        operatorHandler(target.textContent);
    }
    else if (target.className.includes("alt")){
        altHandler(target.textContent);
    }
});                                                               

// Keyboard event delegation

window.addEventListener("keydown", (event) => {
    let key = event.key;
    console.log(`You have just pressed ${key}`)
    numbers = ["0","1","2","3","4","5","6","7","8","9","."];
    if (numbers.includes(key)){
        numberHandler(key);
    }
});