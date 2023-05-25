import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from './store';

const Register = ()=> {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _register = (ev)=> {
    ev.preventDefault();
    dispatch(register({ username, password }));
  };

  return (
    <form onSubmit={ _register }>
      <input
        value={ username }
        placeholder='username'
        onChange = { ev => setUsername(ev.target.value)}
      />
      <input
        value={ password }
        placeholder='password'
        onChange = { ev => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
