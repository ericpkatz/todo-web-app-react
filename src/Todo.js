import React from 'react';
import { useSelector } from 'react-redux';

const Todo = ()=> {
  const { id, todos, categories } = useSelector(state => state);

  const todo = todos.find( todo => todo.id === id*1);
  //be defensive!!
  if(!todo){
    return null;
  }

  const category = categories.find(category => category.id === todo.categoryId);

  return (
    <div>
      { todo.name }
      <a href='#'>Back</a>
      ({ category ? category.name: 'none'})
    </div>
  );
};

export default Todo;
