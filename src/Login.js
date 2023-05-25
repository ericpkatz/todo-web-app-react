import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store';

const Login = ()=> {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = (ev)=> {
    ev.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <form onSubmit={ _login }>
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
      <button>Login</button>
    </form>
  );
};

export default Login;
