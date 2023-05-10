import { createAsyncThunk, configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const updateTodo = createAsyncThunk(
  'updateTodo',
  async (todo)=> {
    const response = await axios.put(`/api/todos/${todo.id}`, todo)
    return response.data;
  }
);

const createTodo = createAsyncThunk(
  'createTodo',
  async ()=> {
    const response = await axios.post('/api/todos')
    return response.data;
  }
);

const fetchTodos = createAsyncThunk(
  'fetchTodos',
  async ()=> {
    const response = await axios.get('/api/todos');
    return response.data;
  }
);

const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async ()=> {
    const response = await axios.get('/api/categories');
    return response.data;
  }
);


const idSlice = createSlice({
  name: 'id',
  initialState: window.location.hash.slice(1),
  reducers: {
    setId: (state, action)=> {
      return action.payload;
    }
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setTodos: (state, action)=> {
      return action.payload;
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
      return [...state, action.payload];
      //state.push(action.payload);
    })
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories: (state, action)=> {
      return action.payload;
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(fetchCategories.fulfilled, (state, action)=> {
      return action.payload;
    })
  }
});

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    categories: categoriesSlice.reducer,
    id: idSlice.reducer
  }
});

export default store;

export const { setTodos } = todosSlice.actions;
export const { setCategories } = categoriesSlice.actions;
export const { setId } = idSlice.actions;
export { createTodo, updateTodo, fetchTodos, fetchCategories };
