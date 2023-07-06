const inputHistory = document.querySelector('.history');
const inputCalc = document.querySelector('.calculating');
const btns = document.querySelector('.btns');

let operator = null;
const getMapKey = {
  reset: () => {
    resetCalculator();
  },
  equal: () => {
    if(!operator) return;
    let resulte = inputCalc.value.split(operator);
    inputCalc.value = calculate(Number(resulte[0]), Number(resulte[1]) ?  Number(resulte[1]) :  Number(resulte[0]), operator);
    inputHistory.value += `${Number(resulte[1]) ?  '' :  Number(resulte[0])}=`;
    operator = null;
  },
  operator: (target) => {
    if(inputCalc.value == 0) return;
    operator ? inputCalc.value = inputCalc.value.replace(operator, target.dataset.operator) : inputCalc.value += target.dataset.operator;
    inputHistory.value = inputCalc.value;
    operator = target.dataset.operator;
  },
  number: (target) => {
    if(inputCalc.value == 0) inputCalc.value = '';
    inputCalc.value += target.dataset.number;
    if(operator) {
      inputHistory.value = inputCalc.value;
    }
  }
}

function resetCalculator() {
  operator = null;
  inputCalc.value = 0;
  inputHistory.value = '';
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
  const target = e.target;
  const targetType = target.dataset.type;
  if(target.tagName !== 'BUTTON') return;

  getMapKey[targetType](target);
});

