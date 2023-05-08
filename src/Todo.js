import React from 'react';

const Todo = ({ todos, id, categories })=> {

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
