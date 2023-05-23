import { createAsyncThunk, configureStore, createSlice } from '@reduxjs/toolkit';
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

const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async ()=> {
    const response = await axios.get('/api/categories');
    return response.data;
  }
);

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


const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
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
    builder.addCase(destroyTodo.fulfilled, (state, action)=> {
      return state.filter(todo => todo.id !== action.payload.id);
    })
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    CATEGORY_CREATE: (state, action)=> {
      return [...state, action.payload];
    },
    CATEGORY_DESTROY: (state, action)=> {
      return state.filter(category => category.id !== action.payload.id);
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(fetchCategories.fulfilled, (state, action)=> {
      return action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action)=> {
      //state.push(action.payload);
      return [...state, action.payload];
    });
    builder.addCase(destroyCategory.fulfilled, (state, action)=> {
      return state.filter(category => category.id !== action.payload.id);
    })
  }
});

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    categories: categoriesSlice.reducer
  }
});


const socketActions = {...categoriesSlice.actions };

export default store;

export { socketActions, destroyTodo, createTodo, updateTodo, fetchTodos, fetchCategories, createCategory, destroyCategory };
