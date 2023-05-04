import React from 'react';

const Todos = ({ todos })=> {
  //const todos = props.todos;
  //const { todos } = props;
  return (
    <ul>
      {
        todos.map( todo => {
          return (
            <li key={ todo.id }>
              <a href={`#${ todo.id }`}>
                { todo.name }
              </a>
            </li>
          );
        })
      }
    </ul>
  )
};

export default Todos;

