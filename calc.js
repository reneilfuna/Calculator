
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
            return divide(+val1, +val2);
        case "\xD7":
            return multiply(+val1, +val2);
    }
}

const btnContainer = document.getElementById("buttons");

const display = document.getElementById("display");

function numberHandler(number){
    console.log(`Previous input: ${number}`);
    // Prevent overflow
    if (!(display.textContent.length == 9)){
        // First digit 
        if ((display.textContent == "0" || afterOper) && number != 0){
            display.textContent = number;
        } // Succeeding digits, preventing preceding zeros
        else if (display.textContent != "0"){
            display.textContent += number;
        }
        afterOper = false;
        afterEquals = false;
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
    }
    
    // "%"
    // "+/-"
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
        