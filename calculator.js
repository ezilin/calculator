function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (isNaN(a) || isNaN(b))
        return "ERR";
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERR";
    }
}

let powerButton = document.querySelector(".power");
let displayMath = document.querySelector(".text");
let isOn = false;

powerButton.addEventListener("click", () => {
    if (!isOn) {
        displayMath.setAttribute("style", "color: white;");
        isOn = true;
    }
    else {
        displayMath.setAttribute("style", "color: black");
        displayMath.textContent = "Wassup homies";
        isOn = false;
    }
});

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let clear = document.querySelector(".clear");

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (displayMath.textContent == "Wassup homies" && isOn == true) {
            displayMath.textContent = "";
        }
        if (isOn)
            displayMath.textContent += e.target.textContent;
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (displayMath.textContent == "Wassup homies" && isOn == true) {
            displayMath.textContent = "";
        }
        if (isOn)
            displayMath.textContent += e.target.textContent;
    });
});

clear.addEventListener("click", () => {
    if (isOn) {
        displayMath.textContent = "";
    }
})

let equal = document.querySelector(".equals");

equal.addEventListener("click", () => {
    let equation = displayMath.textContent;
    let multiPattern = /(\d+)\*(\d+)/;
    let divPattern = /(\d+)\/(\d+)/;
    let addPattern = /(\d+)\+(\d+)/;
    let subPattern = /(\d+)-(\d+)/;
    while (multiPattern.test(equation)) {
        let match = equation.match(multiPattern);
        let rst = operate("*", match[1], match[2]);
        if (rst == "ERR") 
            equation = rst;
        else
            equation = equation.replace(multiPattern, rst);
    }
    while (divPattern.test(equation)) {
        let match = equation.match(divPattern);
        let rst = operate("/", match[1], match[2]);
        if (rst == "ERR") 
            equation = rst;
        else
            equation = equation.replace(divPattern, rst);
    }
    while (addPattern.test(equation)) {
        let match = equation.match(addPattern);
        let rst = operate("+", match[1], match[2]);
        if (rst == "ERR") 
            equation = rst;
        else
            equation = equation.replace(addPattern, rst);
    }
    while (subPattern.test(equation)) {
        let match = equation.match(subPattern);
        let rst = operate("-", match[1], match[2]);
        if (rst == "ERR") 
            equation = rst;
        else
            equation = equation.replace(subPattern, rst);
    }
    displayMath.textContent = equation;
})