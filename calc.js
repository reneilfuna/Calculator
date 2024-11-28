
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

btnContainer.addEventListener("click", (event) => {
    let target = event.target;
    switch (target.textContent){
        case "+":
            console.log("my fav ed sheeran album lol");
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
            break;
        case ".":
            console.log("mr k - is cooking");
            break;
        case "0":
            console.log("reasons to not try");
            break;       
        case "1":
            console.log("obi - kenobi");
            
            break;
        case "2":
            console.log("much information buddy");
            break;
        case "3":
            console.log("up the mandem even tho they stabbed like 3 guys");
            break;
        case "4":
            console.log("fant - stic");
            break;
        case "5":
            console.log("alive, what happened to that?");
            break;
        case "6":
            console.log("pls dont triple this");
            break;
        case "7":
            console.log("eats nines");
            break;
        case "8":
            console.log("left no crumbs");
            break;
        case "9":
            console.log("is how to say no in german");
            break;
        case "C":
            console.log("CLEAR THE AREA!!!");
            break;    
        case "+/-":
            console.log("CHANGE SIGN BRO");
            break;
        case "%":
            console.log("ALL ABOUT THE PERCENTAGES");
            break;    
    }
});                                                               
        