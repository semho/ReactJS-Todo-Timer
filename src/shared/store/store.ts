// eslint-disable-next-line import/named
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks';
import statisticsReducer from './slices/statistics';

export const store = configureStore({
  //подключаем все редьюсеры
  reducer: {
    tasks: tasksReducer,
    statistics: statisticsReducer,
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
