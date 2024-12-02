
// Create add function
function add(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else return (val1 + val2);
}

// Create subtract function
function subtract(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else return (val1 - val2);
}
// Create multiply function
function multiply(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else return (val1 * val2);
}

// Create divide function
function divide(val1, val2){
    if (typeof(val1) != "number" || typeof(val2) != "number")
        return "Error";
    else if (val2 == 0) return "jokeman";
    else return (val1 / val2);
}

// Calculator function consists of a number, an operator and 
// another number

let num1;
let operator;
let num2;

// Operate function takes an operator, two numbers and calls the 
// operator on the two numbers

function operate(val1, oper, val2){
    switch (oper){
        case "+":
            return add(+val1, +val2);
        case "-":
            return subtract(+val1, +val2);
        case "\xf7":
            return divide(+val1, +val2);
        case "\xD7":
            return multiply(+val1, +val2);
    }
}

// DOM manipulation 
/* --- below --- */

const btnContainer = document.getElementById("buttons");

const display = document.getElementById("display");

function numberHandler(number){
    // Prevent overflow
    if (!(display.textContent.length == 9)){
        // First digit 
        if (display.textContent == "0" && number != 0){
            display.textContent = number;
        } // Succeeding digits
        else {
            display.textContent += number;
        }
        
    }
}

function operatorHandler(operator){

    // Case 1: no operator stored
    // store operator
    // store current display in num1
    
    // Case 2: operator called in chain of calculations
    // i.e. "5" "+" "5" "+" "5" "+" "5"

    // Case 3: operator called after single calculation
    // i.e. "5" "+" "5" "=" "+" "7" "="
    return;
}

function altHandler(button){
    // Case handler
    // "C"
    // "="
    // "%"
    // "+/-"
    return;
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
        