import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import Categories from './Categories';
import Todos from './Todos';
import Todo from './Todo';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [id, setId] = React.useState(window.location.hash.slice(1));

  const updateTodo = async(todo)=> {
    const response = await axios.put(`/api/todos/${todo.id}`, todo)
    todo = response.data;
    setTodos(todos.map(t => t.id === todo.id ? todo : t));
  };

  const fetchTodos = async()=> {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    setTodos(todos);
  };

  const fetchCategories = async()=> {
    const response = await fetch('/api/categories');
    const categories = await response.json();
    setCategories(categories);
  };

  React.useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setId(window.location.hash.slice(1));
    });
  }, []);

  React.useEffect(()=> {
    fetchTodos();
    fetchCategories();
  }, []);


  return (
    <div>
      <h1>Acme Todos ({ todos.length })!!</h1>
      {
        id ? (
          <Todo todos={ todos } id={ id } categories={ categories }/>
        ): (
          <Todos todos={ todos } categories={ categories } updateTodo={updateTodo }/>
        )
      }
      <Categories categories={ categories } todos={ todos }/>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);


