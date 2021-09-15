import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Auth/userSlice';
import timerSlice from './Timer/timerSlice';
import tasksSlice from './Tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    timer: timerSlice,
    tasks: tasksSlice,
  },
});
