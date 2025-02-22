const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.calculator2 button');

let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;

    if (value === 'AC') {
      currentInput = '';
      operator = '';
      firstOperand = null;
      screen.value = '';
    } else if (value === '=') {
      if (firstOperand !== null && operator) {
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
          case '+':
            result = firstOperand + secondOperand;
            break;
          case '-':
            result = firstOperand - secondOperand;
            break;
          case '*':
            result = firstOperand * secondOperand;
            break;
          case '/':
            result = firstOperand / secondOperand;
            break;
          default:
            return;
        }

        screen.value = result;
        currentInput = '';
        operator = '';
        firstOperand = null;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        firstOperand = parseFloat(currentInput);
      }
      operator = value;
      currentInput = '';
    } else {
      if (value === '.') {
        if (!currentInput.includes('.')) {
          currentInput += value;
        }
      } else {
        currentInput += value;
      }
      screen.value = currentInput; 
    }
  });
});
