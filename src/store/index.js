import { createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './categoriesSlice';
import todosSlice from './todosSlice';

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    categories: categoriesSlice.reducer
  }
});


const socketActions = {...categoriesSlice.actions };

export default store;
export * from './categoriesSlice';
export * from './todosSlice';

export {
  socketActions,
};
