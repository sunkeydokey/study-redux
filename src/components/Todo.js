import React from 'react';

const Todo = ({ todo, onDelete }) => {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default Todo;
