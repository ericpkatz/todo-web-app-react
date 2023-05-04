import React from 'react';

const Categories = ({ categories })=> {
  return (
    <ul>
      {
        categories.map( category => {
          return (
            <li key={ category.id }>
              { category.name }
            </li>
          );
        })
      }
    </ul>
  );
};

export default Categories;
