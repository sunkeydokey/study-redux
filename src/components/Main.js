import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToDo, deleteToDo } from '../store';

import TodoList from './TodoList';

const Main = () => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const onCreate = (text) => dispatch(addToDo(text));
  const onDelete = (id) => dispatch(deleteToDo(id));

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    onCreate(text);
    setText('');
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>등록</button>
      </form>
      <TodoList todos={todos} onDelete={onDelete} />
    </>
  );
};

export default Main;
