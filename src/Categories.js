import React from 'react';

const Categories = ({ categories, todos })=> {
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
