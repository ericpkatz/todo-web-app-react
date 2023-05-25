import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const updateTodo = createAsyncThunk(
  'updateTodo',
  async (todo)=> {
    const response = await axios.put(`/api/todos/${todo.id}`, todo)
    return response.data;
  }
);

const destroyTodo = createAsyncThunk(
  'destroyTodo',
  async (todo)=> {
    await axios.delete(`/api/todos/${todo.id}`)
    return todo;
    //return response.data;
  }
);

const createTodo = createAsyncThunk(
  'createTodo',
  async (todo, { rejectWithValue })=> {
    try {
      const response = await axios.post('/api/todos', todo)
      return response.data;
    }
    catch(ex){
      return rejectWithValue(ex.response.data);
    }
  }
);

const fetchTodos = createAsyncThunk(
  'fetchTodos',
  async ()=> {
    const response = await axios.get('/api/todos');
    return response.data;
  }
);


const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    TODO_UPDATE: (state, action)=> {
      return state.map( todo => todo.id === action.payload.id ? action.payload: todo);
    },
    TODO_CREATE: (state, action)=> {
      if(!state.find(todo => todo.id === action.payload.id)){
        return [...state, action.payload];
      }
      return state;
    },
    TODO_DESTROY: (state, action)=> {
      return state.filter(todo => todo.id !== action.payload.id);
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(fetchTodos.fulfilled, (state, action)=> {
      return action.payload;
    })
    builder.addCase(updateTodo.fulfilled, (state, action)=> {
      return state.map( todo => todo.id === action.payload.id ? action.payload: todo);
    })
    builder.addCase(createTodo.fulfilled, (state, action)=> {
      if(!state.find(todo => todo.id === action.payload.id)){
        return [...state, action.payload];
      }
      return state;
    })
    builder.addCase(destroyTodo.fulfilled, (state, action)=> {
      return state.filter(todo => todo.id !== action.payload.id);
    })
  }
});


export default todosSlice;

export {
  destroyTodo,
  createTodo,
  updateTodo,
  fetchTodos
};
