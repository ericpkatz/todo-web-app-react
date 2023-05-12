import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo } from './store';
import { useNavigate, useParams } from 'react-router-dom';

const TodoUpdate = ()=> {
  const { categories, todos } = useSelector(state => state);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(()=> {
    const todo = todos.find(todo => todo.id === id*1);
    if(todo){
      setName(todo.name);
      setCategoryId(todo.categoryId);
    }
  }, [todos, id]);

  const update = async(ev)=> {
    ev.preventDefault();
    const todo = {
      id,
      name,
      categoryId: categoryId*1
    };
    await dispatch(updateTodo(todo));
    navigate('/');
  };

  return (
    <form onSubmit={ update }>
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
      <button disabled={ name === '' || categoryId === ''}>Update</button>
    </form>
  );
};

export default TodoUpdate;
