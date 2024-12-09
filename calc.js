// Create round function 
function roundDisplay(value){
    const MAX_VALUE = 999999999;
    const MIN_VALUE = -99999999;

    // Keep value within intended range, 
    // display max/min value if outside
    // Return value is inside range and not decimal
    if (value > MAX_VALUE) return MAX_VALUE;
    else if (value < MIN_VALUE) return MIN_VALUE;
    else if (!(value.toString()).includes(".")) return value;

    // Numbers up to 9 digits
    // but decimal takes length of 1
    let MAXLENGTH = 8;
    // Split into integer and decimal halves
    const [integerPart, decimalPart = ""] = value.toString().split(".");

    if (integerPart.length >= MAXLENGTH) {
        return parseInt(integerPart.substring(0, MAXLENGTH)); // No decimals allowed
    }
    
    // Calculate remaining length for after decimal point
    const maxDecimalLength = MAXLENGTH - integerPart.length;
    // More efficient use in slice method over substring
    const roundedDecimal = decimalPart.slice(0, Math.max(0, maxDecimalLength));

    // Reconstruct the rounded number
    return parseFloat(integerPart + (roundedDecimal ? `.${roundedDecimal}` : ""));

}

function calculate(val1, val2, operation){
    // Ensure all inputs are numbers
    if (typeof val1 !== "number" || typeof val2 !== "number") return "Error";
    // Handle division by zero
    if (operation == "/" && val2 === 0 ) return "Jokeman."

    // Perform operation
    const result = {
        "+": val1 + val2,
        "-": val1 - val2,
        "*": val1 * val2,
        "/": val1 / val2,
    }[operation];

    return roundDisplay(result);
}

const add = (a, b) => calculate(a, b, "+");
const subtract = (a, b) => calculate(a, b, "-");
const multiply = (a, b) => calculate(a, b, "*");
const divide = (a, b) => calculate(a, b, "/");

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
    // Operator-function mapping
    const operations = {
        "+": add, 
        "-": subtract, 
        "\xD7": multiply, 
        "*": multiply, 
        "\xf7": divide, 
        "/": divide,
    };

    const operation = operations[oper];
    if(!operation) return "Error"; // InVALID operator

    return operation(parseFloat(val1), parseFloat(val2));
}

const btnContainer = document.getElementById("buttons");
const display = document.getElementById("display");

function numberHandler(number){
    // console.log(`Previous input: ${number}`);
    // // First digit
    // if (afterOper){
    //     if (number == ".") display.textContent = "0.";
    //     else{
    //         display.textContent = number;
    //         afterOper = false;
    //         afterEquals = false;
    //     }
    // }
    // else{
    //     // Prevent overflow
    //     if (!(display.textContent.length >= 9)){
    //         if (display.textContent == "0" && number != 0){
    //             if (number == "."){
    //                 display.textContent += number;
    //             }
    //             else display.textContent = number;
    //         } // Succeeding digits, preventing preceding zeros
    //         else if (display.textContent != "0"){
    //             if(display.textContent.includes(".") && number == "."){
    //                 afterOper = false;
    //                 afterEquals = false;
    //                 return;
    //             }
    //             display.textContent += number;
    //         }
    //     afterOper = false;
    //     afterEquals = false;
    //     }
    // }
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
    console.log(`current state: ${num1}, ${operator}, ${num2}`)
}

function altHandler(button){
    // Case handler
    console.log(`Previous input: ${button}`);
    if (button == "c"){
        button = "C";
    }
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
            result = operate(num1, operator, display.textContent);
            display.textContent = result;
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
            currVal = display.textContent;
            display.textContent = roundDisplay(currVal/100);
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
    let numbers = ["0","1","2","3","4","5","6","7","8","9","."];
    let operators = ["+", "-", "*", "/"];
    let alts = ["=", "%", "C", "c"];
    if (numbers.includes(key)) numberHandler(key);
    else if (operators.includes(key)) operatorHandler(key);
    else if (alts.includes(key)) altHandler(key);

});