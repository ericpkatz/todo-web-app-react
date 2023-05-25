import { createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './categoriesSlice';
import todosSlice from './todosSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    categories: categoriesSlice.reducer
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger) 
});


const socketActions = {...categoriesSlice.actions, ...todosSlice.actions };
console.log(socketActions);

export default store;
export * from './categoriesSlice';
export * from './todosSlice';

export {
  socketActions,
};
