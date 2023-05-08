import React from 'react';
import { useSelector } from 'react-redux';

const Categories = ()=> {
  const { categories, todos } = useSelector(state => state);
  return (
    <ul>
      {
        categories.map( category => {
          const filtered = todos.filter(todo => todo.categoryId === category.id);
          return (
            <li key={ category.id }>
              { category.name }
              ({ filtered.length })
            </li>
          );
        })
      }
    </ul>
  );
};

export default Categories;
