// eslint-disable-next-line import/named
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from '../store/slices/tasks';

export const store = configureStore({
  //подключаем все редьюсеры
  reducer: {
    tasks: tasksReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
