import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Todo = ()=> {
  const { todos, categories } = useSelector(state => state);
  const { id } = useParams();

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
