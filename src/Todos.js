import React from 'react';

const Todos = ({ todos, categories })=> {
  //const todos = props.todos;
  //const { todos } = props;
  return (
    <ul>
      {
        todos.map( todo => {
          const category = categories.find(category => category.id === todo.categoryId);
          return (
            <li key={ todo.id }>
              <a href={`#${ todo.id }`}>
                { todo.name }
              </a>
              ({ category ? category.name : 'none'})
            </li>
          );
        })
      }
    </ul>
  )
};

export default Todos;

