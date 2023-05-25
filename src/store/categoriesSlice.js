import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export default categoriesSlice;

export {
  fetchCategories,
  createCategory,
  destroyCategory
};
