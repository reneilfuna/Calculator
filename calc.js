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
    console.log(`Previous input: ${number}`);   
    const displayVal = display.textContent;

    // Start fresh if a new number is entered after an operation
    if (afterOper) {
        display.textContent = number === "." ? "0." : number;
    }
    else if (displayVal.length < 9){
        // Avoid leading zeros
        if (displayVal === "0" && number !== "."){
            display.textContent = number;
        } // Append valid decimal/digits
        else if (!(displayVal.includes(".") && number === ".")){
            display.textContent += number;
        }
    }

    afterOper = false;
    afterEquals = false;
}

function operatorHandler(oper){
    console.log(`Previous input: ${oper}`);
    
    if ((!num1 && !operator) || afterEquals){
        num1 = display.textContent;
    } 
    else if(num1 && operator && !afterOper){ // i.e. "5" "+" "5" "+" "5" "+" "5"
        num2 = display.textContent;
        display.textContent = operate(num1, operator, num2);
        num1 = display.textContent;
    } 
    operator = oper;
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
                if (display.textContent.includes("-")) display.textContent = display.textContent.replace("-", "");
                else display.textContent = "-" + display.textContent;
            }
            break;
        case "%":
            // Converts the current display value into percentage multiplier
            display.textContent = roundDisplay(display.textContent/100);
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
    if (!isNaN(key) || key === ".") numberHandler(key);
    else if (["+", "-", "*", "/"].includes(key)) operatorHandler(key);
    else if (["=", "%", "C", "c"].includes(key)) altHandler(key);

});