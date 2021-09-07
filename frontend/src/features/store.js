import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Auth/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
