# Redux 정리

redux에 대해 공부한 후 발표할 자료를 정리합니다.

## Redux란?

가장 많이 사용되는 자바스크립트 상태관리 라이브러리이다. Redux를 사용하면 규모가 크고 복잡한 어플리케이션에서 상태를 필요한 컴포넌트에만 전달하여 의미없는 props drilling을 줄일 수 있다.

react뿐만 아니라 vanilla-js 웹, 앵귤러 등에서도 제한없이 사용할 수 있다.

## 주요 개념

### 액션 (Action)

상태가 변화할 때는 액션이 발생한다. 이때 액션은 하나의 객체로 표현된다.

```js
{
  type: 'ACTION_NAME';
  someData;
}
```

type 프로퍼티는 필수적이고 그 외의 데이터들은 필요에 따라 추가할 수 있다.

### 액션 생성함수 (Action Creator)

액션 생성함수는 액션 객체를 반환하는 함수이다. 인자를 통해 추가 데이터를 받을 수 있다.

```js
const addToDo = (text) => ({
  type: ADD,
  text,
});
const deleteToDo = (id) => ({
  type: DELETE,
  id,
});
```

### 스토어 (store)

리덕스에서 상태를 관리하는 저장소라고 할 수 있다. 내장함수를 통해 상태를 관리할 수 있다.

### 리듀서 (Reducer)

변화를 일으키는 store 내장 함수이다. 현재 상태와 액션을 인자로 받는다. 이를 참고해 새 상태를 반환한다.

```js
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};
```

### 디스패치 (dispatch)

액션을 발생시키는 내장함수이다. 인자로 액션을 넣어 호출하면 리듀서에 전달하여 호출한다.

### 구독 (subscribe)

디스패치마다 실행되는 내장함수이다. 특정함수를 전달받아 액션이 디스패치될 때마다 실행할 수 있다.

## vanilla-js에서 사용해보기

### 초기 세팅

react에서도 사용할 것이지만 vanilla-js와 함께 counter를 구현하며 간단하게 기능을 익힐 수 있다.

npm이 아닌 yarn을 사용할 것이다. 설치가 되지 않은 경우 다음과 같은 명령어를 통해 설치할 수 있다.

```terminal
npm install -g yarn
```

편의를 위해 react 앱을 먼저 설치하고 시작한다.

```terminal
yarn create react-app study-redux

cd study-redux

yarn add redux

code .

yarn start
```

main 브랜치는 후에 react와 실습을 해야하니 새로운 branch에서 작업하기로 한다.

```terminal
git checkout -b vanilla
```

src 디렉토리에서 index.js를 제외한 모든 파일을 삭제해준다. 그 후 파일 두 개를 수정한다.

```html
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Vanilla Redux</title>
  </head>
  <body>
    <button id="plus">Plus</button>
    <span></span>
    <button id="minus">Minus</button>
  </body>
</html>
```

```js
// src/index.js

const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const number = document.querySelector('span');

const initialCount = 0;
number.innerHTML = initialCount;

let count = 0;
number.innerHTML = count;

const updateNumber = () => {
  number.innerHTML = count;
};

const handlePlus = () => {
  count++;
  updateNumber();
};
const handleMinus = () => {
  count--;
  updateNumber();
};

plusButton.addEventListener('click', handlePlus);
minusButton.addEventListener('click', handleMinus);
```

버튼을 클릭하면 숫자가 1씩 더하고 빼지는 리덕스가 필요하지도 않을 간단한 기능이 있다. 간단한 기능인 만큼 기초적인 리덕스의 내장함수들을 통해 수정해보도록 한다.

### import

코드 상단에 redux의 createStore를 import해준다.

```js
import { createStore } from 'redux';
```

### 액션

액션 타입의 명칭을 정의한다. 문자열을 매번 작성할 때 실수하지 않는 점, IDE의 자동완성 등을 이용할 수 있는 등의 장점이 있다. 주로 대문자로 작성한다.

```js
import { createStore } from 'redux';

const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const number = document.querySelector('span');

const initialCount = 0;

// 액션 명칭 정의
const PLUS = 'PLUS';
const MINUS = 'MINUS';
```

액션 생성 함수도 정의해보도록 한다.

```js
// 액션 명칭 정의
const PLUS = 'PLUS';
const MINUS = 'MINUS';

// 액션 생성 함수 정의
const plusOne = () => ({ type: PLUS });
const minusOne = () => ({ type: MINUS });
```

### 리듀서

리듀서는 디스패치로부터 액션을 전달받고 현재의 상태와 전달받은 액션을 통해 상태를 업데이트하는 함수다.

```js
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
```

reducer가 처음 호출되는 때의 state는 undefined이다. 그래서 원하는 초기 상태값을 기본 매개변수에 할당해줘야 한다.

그리고 reducer에서도 데이터를 변화시킬 때 불변성을 유지시켜야 한다.

### 스토어

createStore 함수를 사용하고, 인자로는 정의해둔 리듀서 함수를 전달해주면 된다.

```js
const store = createStore(reducer);
```

### getState()

getState는 현재의 상태를 확인할 수 있는 내장함수이다. 이를 통해 render 함수를 만들어본다.

```js
const render = () => {
  number.innerText = countStore.getState();
};

render();
```

첫 렌더링에서는 initialCount인 0이 렌더링될 것이다.

### 이벤트리스너 수정

```js
const render = () => {
  number.innerText = countStore.getState();
};

render();

plusButton.addEventListener('click', () => countStore.dispatch(plusOne()));
minusButton.addEventListener('click', () => countStore.dispatch(minusOne()));
```

클릭이벤트가 발생할 때마다 dispatch가 reducer에 PLUS 혹은 MINUS 액션을 전달한다. 하지만 상태만 변경되었을 뿐 우리가 보는 화면에는 별다른 변화가 보이지 않는다.

### 구독 (subscribe)

이는 상태의 변화 이후 설정한 효과가 없기 때문이다. render함수는 최초 자바스크립트 실행시에 단 한번 호출되므로 상태변화에 관심이 없다.

subscribe함수에 render함수를 인자로 전달하면 상태 변화마다 render함수가 실행되도록 구독할 수 있다.

```js
const countStore = createStore(reducer);

const render = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(render);

render();

plusButton.addEventListener('click', () => countStore.dispatch(plusOne()));
minusButton.addEventListener('click', () => countStore.dispatch(minusOne()));
```

전체 코드는 다음과 같다. 단 한개의 상태만을 관리하고 있어 기존 vanilla js 코드보다 뛰어나다거나 효율적이라 볼 수는 없다. 실제로 이 정도의 상황에서는 리덕스를 쓸 필요가 없을 뿐더러, 기존 코드가 더 짧다.

```js
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
```

리액트에서 redux를 사용해야 하므로 main 브랜치로 돌아가도록 하자.

## react에서의 redux

react로는 redux를 이용해 정말 간단한 ToDoList앱을 만들어 보도록 한다.
react에서 redux를 사용하는 경우, 추가로 react-redux 모듈이 필요하다.

### 설치

react에서는 redux와 react-redux 모듈이 필요하다.

```term
yarn add redux react-redux
```

### store.js

src폴더에 store.js 파일을 만들어 준다.

```js
// src/store.js

import { createStore } from 'redux';

// 액션 정의
const ADD = 'ADD';
const DELETE = 'DELETE';

// 액션 생성함수
export const addToDo = (text) => ({
  type: ADD,
  text,
});
export const deleteToDo = (id) => ({
  type: DELETE,
  id,
});

// 리듀서
const reducer = (state = [], action) => {
  switch (action.type) {
    // ADD 액션인 경우
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    // DELETE 액션인 경우
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
  // 배열을 수정하는 것이 아닌 spread 문법과 filter등으로 새 배열을 생성하면서 불변성을 지킬 수 있다.
};

// 정의한 reducer를 가진 store 생성
const store = createStore(reducer);

export default store;
```

### index.js

```js
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* App 컴포넌트를 Provider로 감싸면서 전역적으로 상태를 관리할 수 있다. */}
    {/* store.js 에서 불러온 store는 Provider에 props로 넣어준다. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### ToDo 컴포넌트 작성

components 디렉토리를 만들어준다.

#### ToDo Main

```js
// src/components/Main.js

import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addToDo, deleteToDo } from '../store';

import ToDoList from './TodoList';

const Main = () => {
  // useSelector는 스토어의 상태를 조회하는 Hook이다.
  // state의 값은 store.getState() 함수를 호출했을 때의 return과 같다.
  const todos = useSelector((state) => state);
  // todos에는 todos 배열이 할당될 것
  const dispatch = useDispatch();

  const onCreate = (text) => dispatch(addToDo(text));
  const onDelete = (id) => dispatch(deleteToDo(id));

  // 모든 상태를 redux가 관리할 필요는 없다.
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    onCreate(text);
    setText('');
  };

  // redux store에서 가져온 todos, onDelete를 ToDoList 컴포넌트에 전달한다.
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>등록</button>
      </form>
      <ToDoList todos={todos} onDelete={onDelete} />
    </>
  );
};

export default Main;
```

#### ToDoList

```js
// src/components/ToDoList.js

import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({ todos, onDelete }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ToDoList;
```

#### ToDo

```js
// src/components/ToDo.js

import React from 'react';

const ToDo = ({ todo, onDelete }) => {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default ToDo;
```

## 완성

```js
// src/App.js
import React from 'react';
import Main from './components/Main';

const App = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

export default App;
```

## 추가적으로 알아야 할 것들

- 비동기 처리 등을 위해 redux-thunk, redux-saga 등의 리덕스 미들웨어가 존재한다.
- redux에서는 redux의 주요 기능을 포함한 redux toolkit (rtk) 사용을 권장한다. rtk 사용 시 코드량이 줄고, 내부의 immer가 더 쉽게 불변성을 지켜주므로 추가적인 학습이 필요하다.
- 기초적인 학습을 위해 ToDoList같은 간단한 앱을 사용할 수 없었으나, 대규모 서비스가 아닌 이런 작은 앱에서는 useState와 props를 통해 상태를 다루어도 무방하다. 오히려 전역상태관리를 써보겠다고 쓰는 것이 오버엔지니어링으로 보인다.
- redux 말고도 mob X, recoil, zustant, jotai 등의 상태관리 라이브러리들이 있다.
