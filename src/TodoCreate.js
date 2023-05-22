import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTodo } from './store';
import { useNavigate } from 'react-router-dom';

const TodoCreate = ()=> {
  const { categories } = useSelector(state => state);
  const [error, setError] = useState({});
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async(ev)=> {
    ev.preventDefault();
    const todo = {
      name,
      categoryId
    };
    const response = await dispatch(createTodo(todo));
    if(!response.error){
      navigate('/');
    }
    else {
      setError(response.payload);
    }
  };

  return (
    <form onSubmit={ create }>
      {
        Object.keys(error).length ? (
          <pre className='error'>
            { JSON.stringify(error, null, 2) }
          </pre>
        ): (null)
      }
      <input value={ name } onChange={ ev => setName(ev.target.value)}/>
      <select value={ categoryId } onChange={ ev => setCategoryId(ev.target.value)}>
        <option value=''>-- choose a category</option>
        {
          categories.map( category => {
            return (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            );
          })
        }
      </select>
      <button disabled={ name === '' || categoryId === ''}>Create</button>
    </form>
  );
};

export default TodoCreate;
