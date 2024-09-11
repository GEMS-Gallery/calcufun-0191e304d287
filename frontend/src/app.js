import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.textContent);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || ['+', '-', '*', '/'].includes(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Escape') {
        handleInput('C');
    }
});

function handleInput(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        currentInput += value;
        display.value = currentInput;
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            currentInput = '';
            operator = value;
        }
    } else if (value === '=') {
        if (firstOperand !== null && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            calculateResult(firstOperand, secondOperand, operator);
        }
    } else if (value === 'C') {
        clear();
    }
}

async function calculateResult(a, b, op) {
    let result;
    switch (op) {
        case '+':
            result = await backend.add(a, b);
            break;
        case '-':
            result = await backend.subtract(a, b);
            break;
        case '*':
            result = await backend.multiply(a, b);
            break;
        case '/':
            const divisionResult = await backend.divide(a, b);
            result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
            break;
    }
    display.value = result;
    firstOperand = result;
    currentInput = '';
    operator = '';
}

function clear() {
    display.value = '';
    currentInput = '';
    firstOperand = null;
    operator = '';
}
