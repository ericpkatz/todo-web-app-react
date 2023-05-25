import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const login = createAsyncThunk(
  'login',
  async (credentials)=> {
    let response = await axios.post('/api/auth/login', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    response = await axios.get('/api/auth', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }
);

const register = createAsyncThunk(
  'register',
  async (credentials)=> {
    let response = await axios.post('/api/auth/register', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    response = await axios.get('/api/auth', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }
);

const logout = createAsyncThunk(
  'logout',
  async ()=> {
    window.localStorage.removeItem('token');
    return {};
  }
);

const loginWithToken = createAsyncThunk(
  'loginWithToken',
  async ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
  }
);
/*

const createCategory = createAsyncThunk(
  'createCategory',
  async (category)=> {
    const response = await axios.post('/api/categories', category);
    return response.data;
  }
);

const destroyCategory = createAsyncThunk(
  'destroyCategory',
  async (category)=> {
    await axios.delete(`/api/categories/${category.id}`);
    return category;
  }
);
*/


const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {

  },
  extraReducers: (builder)=> {
    builder.addCase(login.fulfilled, (state, action)=> {
      return action.payload;
    });
    builder.addCase(register.fulfilled, (state, action)=> {
      return action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action)=> {
      return action.payload;
    });
    builder.addCase(loginWithToken.fulfilled, (state, action)=> {
      return action.payload;
    });

  }
});

export default authSlice;

export { login, loginWithToken, logout, register };
