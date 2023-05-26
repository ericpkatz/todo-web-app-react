import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async ()=> {
    const response = await axios.get('/api/users');
    return response.data;
  }
);


const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    USER_CREATE: (state, action)=> {
      return [...state, action.payload];
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(fetchUsers.fulfilled, (state, action)=> {
      return action.payload;
    })
  }
});


export default usersSlice;

export {
  fetchUsers
};
