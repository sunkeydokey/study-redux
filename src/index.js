import { createStore } from 'redux';

const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const number = document.querySelector('span');

const initialCount = 0;

// 액션 명칭 정의
const PLUS = 'PLUS';
const MINUS = 'MINUS';
// 액션 생성 함수 정의
const plusOne = () => ({ type: PLUS });
const minusOne = () => ({ type: MINUS });
// 리듀서
const reducer = (state = initialCount, action) => {
  switch (action.type) {
    // 디스패치가 전달한 액션의 type이 PLUS인 경우
    case PLUS:
      return state + 1;
    // 디스패치가 전달한 액션의 type이 MINUS인 경우
    case MINUS:
      return state - 1;
    default:
      return state;
  }
};

const countStore = createStore(reducer);

const render = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(render);

render();

plusButton.addEventListener('click', () => countStore.dispatch(plusOne()));
minusButton.addEventListener('click', () => countStore.dispatch(minusOne()));
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
