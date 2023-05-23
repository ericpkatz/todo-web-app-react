import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from './store';

const CategoryCreate = ()=> {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const create = (ev)=> {
    ev.preventDefault();
    dispatch(createCategory({ name }));
  };

  return (
    <form onSubmit={ create }>
      <input name='name' value={ name } onChange={ ev => setName(ev.target.value)}/>
      <button disabled={ !name }>Create Category</button>
    </form>
  );
};

export default CategoryCreate;
