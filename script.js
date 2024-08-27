let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const normalBtn = document.querySelectorAll('.normalBtn');
const operatorBtn = document.querySelectorAll('#operatorBtn');
const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalBtn = document.getElementById('equalBtn');
const pointBtn = document.getElementById('pointBtn');

window.addEventListener('keydown', handleKeyboardInput);
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteDisplay);
pointBtn.addEventListener('click', appendPoint);

normalBtn.forEach((button) =>
    button.addEventListener('click', () => appendToDisplay(button.textContent))
)

operatorBtn.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function appendToDisplay(number) {
    if(currentOperationScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    } 
    currentOperationScreen.textContent += number;
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

function clearDisplay () {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
      currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
  }

function deleteDisplay () {
    currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
  }

function evaluate () {
    if(currentOperation === null || shouldResetScreen) return
    if(currentOperation === '÷' && currentOperationScreen.textContent === '0'){
        alert("You can't divide by 0");
        clearDisplay();
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        calculate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
    currentOperation = null;
}

function roundResult (number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendToDisplay(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteDisplay()
    if (e.key === 'Escape') clearDisplay()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }
  

function convertOperator (keyboardOperator) {
    if(keyboardOperator === '/') return '÷';
    if(keyboardOperator === '*') return '×';
    if(keyboardOperator === '-') return '-';
    if(keyboardOperator === '+') return '+';

}

function add (a,b){
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}


function calculate (operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '×':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
    }
}

