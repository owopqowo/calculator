const inputHistory = document.querySelector('.history');
const inputCalc = document.querySelector('.calculating');
const btns = document.querySelector('.btns');

const state = {
  firstNumber: '',
  secondNumber: '',
  operator: null,
};

function resetCalculator() {
  state.firstNumber = '';
  state.secondNumber = '';
  state.operator = null;
  inputCalc.value = 0;
  inputHistory.value = '';
}

function equalCalculator() {
  if (!state.operator) return;

  const hasSecondNumbOrZero = Boolean(state.secondNumber) || state.secondNumber == 0;

  inputCalc.value = calculate(+state.firstNumber, hasSecondNumbOrZero ? +state.secondNumber : +state.firstNumber, state.operator);
  inputHistory.value += hasSecondNumbOrZero ? '=' : `${state.firstNumber}=`;

  state.firstNumber = inputCalc.value;
  state.secondNumber = '';
  state.operator = null;
}

function operatorCalculator(newOperator) {
  if (inputCalc.value == 0) return;
  if (state.operator) {
    inputCalc.value = inputCalc.value.replace(state.operator, newOperator);
  } else {
    inputCalc.value += newOperator;
  }
  inputHistory.value = inputCalc.value;
  state.operator = newOperator;
}

function numberCalculator(number) {
  if (inputCalc.value == 0) inputCalc.value = '';
  if (state.secondNumber === '0' && number == 0) return;
  inputCalc.value += number;
  if (state.operator) {
    inputHistory.value = inputCalc.value;
    state.secondNumber += number;
  } else {
    state.firstNumber += number;
  }
}

function calculate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      break;
  }
}

btns.addEventListener('click', (e) => {
  const button = e.target;
  const buttonType = button.dataset.type;

  if (button.tagName !== 'BUTTON') return;

  const operationMap = {
    reset: resetCalculator,
    equal: equalCalculator,
    operator: () => operatorCalculator(button.dataset.operator),
    number: () => numberCalculator(button.dataset.number),
  };

  const operation = operationMap[buttonType];

  operation();
});
