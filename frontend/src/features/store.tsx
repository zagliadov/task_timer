import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;