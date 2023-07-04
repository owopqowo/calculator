const inputHistory = document.querySelector('.history');
const inputCalc = document.querySelector('.calculating');
const btns = document.querySelector('.btns');

let operator = null;

btns.addEventListener('click', (e) => {
  if(e.target.tagName !== 'BUTTON') return;
  if(e.target.dataset.type === 'reset') {
    operator = null;
    inputCalc.value = 0;
    inputHistory.value = '';
  } else if(e.target.dataset.type === 'equal') {
    if(!operator) return;
    let resulte = inputCalc.value.split(operator);
    if (Number(resulte[1])) {
      inputCalc.value = calculate(Number(resulte[0]), Number(resulte[1]), operator);
      inputHistory.value += '=';
    } else {
      inputCalc.value = calculate(Number(resulte[0]), Number(resulte[0]), operator);
      inputHistory.value += `${Number(resulte[0])}=`;
    }
    operator = null;
  } else {
    if(inputCalc.value == 0 && e.target.classList.contains('btn-operator')) return;
    if(inputCalc.value == 0) inputCalc.value = '';
    if(e.target.classList.contains('btn-operator')) {
      if(operator) {
        inputCalc.value = inputCalc.value.replace(operator, e.target.dataset.type);
        operator = e.target.dataset.type;
        inputHistory.value = inputCalc.value;
        return false;
      }
      operator = e.target.dataset.type;
    } 
    inputCalc.value += e.target.dataset.type;
    if(operator) {
      inputHistory.value = inputCalc.value;
    }
  }
});

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