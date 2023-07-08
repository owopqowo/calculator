const inputHistory = document.querySelector('.history');
const inputCalc = document.querySelector('.calculating');
const btns = document.querySelector('.btns');

let operator = null;

function resetCalculator() {
  operator = null;
  inputCalc.value = 0;
  inputHistory.value = '';
}

function equalCalculator() {
  if (!operator) return;
  const result = inputCalc.value.split(operator);
  const resultFirst = +result[0];
  const resultSecond = +result[1];
  inputCalc.value = calculate(resultFirst, resultSecond ? resultSecond : resultFirst, operator);
  inputHistory.value += resultSecond ? '=' : `${resultFirst}=`;
  operator = null;
}

function operatorCalculator(newOperator) {
  if (inputCalc.value == 0) return;
  if (operator) {
    inputCalc.value = inputCalc.value.replace(operator, newOperator);
  } else {
    inputCalc.value += newOperator;
  }
  inputHistory.value = inputCalc.value;
  operator = newOperator;
}

function numberCalculator(number) {
  if (inputCalc.value == 0) inputCalc.value = '';
  inputCalc.value += number;
  if (operator) {
    inputHistory.value = inputCalc.value;
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
