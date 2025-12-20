let currentInput = '0';
let previousInput = '';
let operator = '';

function updateDisplay() {
    document.getElementById('display').textContent = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator && currentInput !== '0') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
}

function calculate() {
    if (!operator || previousInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}


document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    } 
    else if (key === '.') {
        appendNumber('.');
    } 
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } 
    else if (key === 'Enter' || key === '=') {
        calculate();
    } 
    else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
        updateDisplay();
    } 
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});

function startCalculating() {
    document.getElementById('landing-page').classList.add('hide');
    setTimeout(() => {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('calculator-container').classList.add('show');
    }, 500);
}

function goBack() {
    document.getElementById('calculator-container').classList.remove('show');
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('landing-page').classList.remove('hide');
    clearDisplay();
}
