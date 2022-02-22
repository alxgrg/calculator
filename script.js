const display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let displayValue = '';
let operator = '';
let finalValues = { num1: '', num2: '', op: '' };
let result = '';
let prevResult = '';

let { num1, num2, op } = finalValues;

// Set button event listeners
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    handleButtonClick(btn);
    console.log({
      num1: num1,
      num2: num2,
      op: op,
      result: result,
      prevResult: prevResult,
      displayValue: displayValue,
    });
  });
});

function clearHelper() {
  displayValue = '0';
  num1 = '';
  num2 = '';
  op = '';
  operator = '';
  result = '';
  prevResult = '';
}

function opHelper(enteredOp, btn) {
  if (result.length > 0) {
    num1 = '' + result;
    num2 = '';
  } else if (num2.length > 0) {
    num1 = '' + operate(operator, parseFloat(num1), parseFloat(num2));
    num2 = '';
  }
  result = '';
  prevResult = '';
  op = btn.value;
  displayValue += btn.value;
  operator = enteredOp;
}

function handleButtonClick(btn) {
  switch (btn.id) {
    case 'add':
      opHelper(add, btn);
      break;

    case 'subtract':
      opHelper(subtract, btn);
      break;

    case 'multiply':
      opHelper(multiply, btn);
      break;

    case 'divide':
      opHelper(divide, btn);
      break;

    case 'evaluate':
      evaluate();
      break;

    case 'backspace':
      backspace();
      break;

    case 'clear':
      clearHelper();
      break;

    default:
      numberPress(btn);
      break;
  }

  if (result.length > 0) {
    displayValue = result;
    prevResult = result;
  }

  display.textContent = displayValue;
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function evaluate() {
  if (prevResult.length > 0) {
    result = '' + operate(operator, parseFloat(prevResult), parseFloat(num2));
  } else {
    result = '' + operate(operator, parseFloat(num1), parseFloat(num2));
  }
}

function numberPress(btn) {
  if (result.length > 0 && num1.length > 0 && num2.length > 0) {
    clearHelper();
  }
  if (op.length > 0) {
    if (btn.value === '.' && num2.includes('.')) {
      btn.value = '';
    }
    num2 += btn.value;
  } else {
    if (btn.value === '.' && num1.includes('.')) {
      btn.value = '';
    }
    num1 += btn.value;
  }
  if (displayValue === '0') {
    displayValue = '';
  }
  displayValue += btn.value;
}

function backspace() {
  if (result.length > 0) {
    clearHelper();
  }
  if (num2.length > 0) {
    num2 = num2.substring(0, num2.length - 1);
  } else if (operator.length > 0) {
    operator = '';
  } else if (num1.length > 0) {
    num1 = num1.substring(0, num1.length - 1);
  }
  if (displayValue.length > 0) {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    if (displayValue.length === 0) {
      displayValue = '0';
    }
  }
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}
