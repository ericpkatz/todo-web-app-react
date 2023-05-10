import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { createTodo, setId, fetchTodos, fetchCategories } from './store';

import Categories from './Categories';
import Todos from './Todos';
import Todo from './Todo';


function App() {
  const {id, todos, categories} = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      dispatch(setId(window.location.hash.slice(1)));
    });
  }, []);

  React.useEffect(()=> {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, []);


  return (
    <div>
      <h1>Acme Todos ({ todos.length })!!</h1>
      <button
        onClick={
          ()=> {
            dispatch(createTodo());
          }
        }>
        Create A New Todo
      </button>
      {
        id ? (
          <Todo />
        ): (
          <Todos />
        )
      }
      <Categories />
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);


