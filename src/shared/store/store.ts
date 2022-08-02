// eslint-disable-next-line import/named
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks';
import statisticsReducer from './slices/statistics';

//MIDDLEWARE
//тут в localStore
const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem('app', JSON.stringify(getState()));
    return result;
  };
};
//тут извлекаем из localStore
const reHydrateStore = () => {
  if (localStorage.getItem('app') !== null) {
    return JSON.parse(localStorage.getItem('app') || '{}'); // re-hydrate the store
  }
};

export const store = configureStore({
  //подключаем все редьюсеры
  reducer: {
    tasks: tasksReducer,
    statistics: statisticsReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
