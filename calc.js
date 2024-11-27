
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
    return oper(val1, val2);
}

// DOM manipulation 
/* --- below --- */

const btnContainer = document.getElementById("buttons");

for (i=0; i<3; i++) {
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("rowOfButtons");
    for (j=0; j<4; j++){
        const btn = document.createElement("div");
        btn.classList.add("button");
        if (j==3) btn.classList.add("end");
        buttonRow.appendChild(btn);
    }
    btnContainer.appendChild(buttonRow);
    console.log("row appended!");
}