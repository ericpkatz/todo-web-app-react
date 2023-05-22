import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Search = ()=> {
  const navigate = useNavigate();
  const { term } = useParams();
  const search = (ev)=> {
    if(ev.target.value.trim()){
      navigate(`/search/${ev.target.value}`);
    }
    else {
      navigate('/');
    }
  };

  return (
    <div>
      <input value={ term ? term : '' } placeholder='filter' onChange={ search }/>
    </div>
  );
};

export default Search;
