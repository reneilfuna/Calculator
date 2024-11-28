
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
    console.log(`Im operate, i received ${val1} and ${val2} and ${oper}`)
    switch (oper){
        case "+":
            result = add(+val1, +val2);
            console.log(`THe result is... ${result}`)
            return result;
        case "-":
            return subtract(val1, val2);
        case "\xf7":
            return divide(val1, val2);
        case "\xD7":
            return multiply(val1, val2);
    }
}

// DOM manipulation 
/* --- below --- */

const btnContainer = document.getElementById("buttons");

for (i=0; i<5; i++) {
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("rowOfButtons");

    if (i==4){
        for(j=0; j<3; j++){
            const btn = document.createElement("div");
            btn.classList.add("button");
            if (j==0) btn.classList.add("zero");
            if (j==2) btn.classList.add("end");
            buttonRow.appendChild(btn);
        }
    }
    else {
        for (j=0; j<4; j++){
            const btn = document.createElement("div");
            btn.classList.add("button");
            if (j==3) btn.classList.add("end");
            else if (i==0)btn.classList.add("top");
            buttonRow.appendChild(btn);
        }
    }
    btnContainer.appendChild(buttonRow);
    console.log("row appended!");
}

const btnContents = ["C", "+/-", "%", "\xf7",
    "7", "8", "9", "\xD7",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
];

const buttonList = document.querySelectorAll(".button");
for(i=0; i<buttonList.length; i++){
    buttonList[i].textContent = btnContents[i];
    buttonList[i].setAttribute("id", `${btnContents[i]}`)
}


const display = document.getElementById("display");

function inputNum(input){
    // Prevent overflow
    if (!(display.textContent.length == 9)){
        if (input == "0"){
            if (!(display.textContent == "0")) display.textContent += "0";
        }
        // Prevent preceding zeros
        else if (display.textContent == 0) display.textContent = input;
        else display.textContent += input;
    }
}

// Function stores the first value and the operator
function storeOper(input, oper){
    num1 = input;
    operator = oper;
    console.log(`Num1: ${num1} oper: ${operator}`)
    display.textContent = "0";
}

function callOper(input){
    console.log(`num1: ${num1}, oper: ${operator} num2: ${input}`)
    return operate(num1, operator, input);
}

btnContainer.addEventListener("click", (event) => {
    let target = event.target;
    switch (target.textContent){
        case "+":
            console.log("my fav ed sheeran album lol");
            // Store val1 
            // Store operator
            storeOper((display.textContent), "+")
            break;    
        case "-":
            console.log("my fav is proabably jollibee tbh");
            break;
        case "\xf7":
            console.log("DOGGY GAME I NEVER WANTED");
            break;
        case "\xD7":
            console.log("men 97 is a brilliant animated series.");
            break;
        case "=":
            console.log("fight for equality");
            // Store val2
            // Call oper function
            fetch = display.textContent
            result = callOper(fetch);
            console.log(`THe result is ${result}`);
            display.textContent = result;
            break;
        case ".":
            console.log("mr k - is cooking");
            break;
        case "0":
            console.log("reasons to not try");
            inputNum("0");
            break;       
        case "1":
            console.log("obi - kenobi");
            inputNum("1");
            break;
        case "2":
            console.log("much information buddy");
            inputNum("2");
            break;
        case "3":
            console.log("up the mandem even tho they stabbed like 3 guys");
            inputNum("3");
            break;
        case "4":
            console.log("fant - stic");
            inputNum("4");
            break;
        case "5":
            console.log("alive, what happened to that?");
            inputNum("5");
            break;
        case "6":
            console.log("pls dont triple this");
            inputNum("6");
            break;
        case "7":
            console.log("eats nines");
            inputNum("7");
            break;
        case "8":
            console.log("left no crumbs");
            inputNum("8");
            break;
        case "9":
            console.log("is how to say no in german");
            inputNum("9");
            break;
        case "C":
            console.log("CLEAR THE AREA!!!");
            display.textContent = "0";
            break;    
        case "+/-":
            console.log("CHANGE SIGN BRO");
            break;
        case "%":
            console.log("ALL ABOUT THE PERCENTAGES");
            break;    
    }
});                                                               
        