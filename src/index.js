import React from 'react';
import ReactDOM from 'react-dom/client';

import Categories from './Categories';
import Todos from './Todos';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [id, setId] = React.useState(window.location.hash.slice(1));

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

  const todo = todos.find( todo => todo.id === id*1);

  return (
    <div>
      <h1>Acme Todos ({ todos.length })!!</h1>
      {
        todo ? (
          <div>
            { todo.name }
            <a href='#'>Back</a>
          </div>
        ): (
          <Todos todos={ todos }/>
        )
      }
      <Categories categories={ categories } />
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);


