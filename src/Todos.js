import React from 'react';

const Todos = ({ todos, categories, updateTodo })=> {
  console.log(updateTodo);
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
              <select
                value={ todo.categoryId }
                onChange = {
                  ev => {
                    const updatedTodo = {...todo, categoryId: ev.target.value * 1};
                    updateTodo(updatedTodo);
                  }
                }
              >
                {
                  categories.map( category => {
                    return (
                      <option value={ category.id } key={ category.id }>{ category.name }</option>
                    );
                  })
                }
              </select>
            </li>
          );
        })
      }
    </ul>
  )
};

export default Todos;

