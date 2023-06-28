const inputHistory = document.querySelector('.history');
const inputCalc = document.querySelector('.calculating');
const btns = document.querySelector('.btns');

let operator = null;

btns.addEventListener('click', (e) => {
  if(e.target.tagName !== 'BUTTON') return;
  if(e.target.dataset.type === 'reset') {
    inputCalc.value = 0;
    inputHistory.value = '';
  } else if(e.target.dataset.type === 'equal') {
    if(inputCalc.value == 0) return;
    let resulte = inputCalc.value.split(operator);
    inputCalc.value = calculate(Number(resulte[0]), Number(resulte[1]), operator);
    inputHistory.value += '='
  } else {
    if(inputCalc.value == 0 && e.target.classList.contains('btn-operator')) return;
    if(inputCalc.value == 0) inputCalc.value = '';
    inputCalc.value += e.target.dataset.type;
    if(e.target.classList.contains('btn-operator')) {
      operator = e.target.dataset.type;
    } 
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