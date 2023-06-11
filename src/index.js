import { createStore } from 'redux';

const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const number = document.querySelector('span');

const initialCount = 0;
number.innerHTML = initialCount;

const reducer = (count = initialCount, action) => {
  switch (action.type) {
    case 'PLUS':
      return count + 1;
    case 'MINUS':
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(reducer);

const onChange = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

plusButton.addEventListener('click', () =>
  countStore.dispatch({ type: 'PLUS' })
);
minusButton.addEventListener('click', () =>
  countStore.dispatch({ type: 'MINUS' })
);

// let count = 0;
// number.innerHTML = count;

// const updateNumber = () => {
//   number.innerHTML = count;
// };

// const handlePlus = () => {
//   count++;
//   updateNumber();
// };
// const handleMinus = () => {
//   count--;
//   updateNumber();
// };

// plusButton.addEventListener('click', handlePlus);
// minusButton.addEventListener('click', handleMinus);
