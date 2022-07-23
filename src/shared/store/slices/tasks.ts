// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
//интерфейс хранения данных задачи
interface TaskState {
  text?: string;
  id: string;
  time: number;
  count: number;
}
//начальное состояние задачи
interface TasksState {
  tasks: TaskState[];
}

const initialState: TasksState = {
  tasks: [],
};
/**
 * name - название стейта, будет видно в devTools
 * initialState - передаем начальное состояние в стейт
 * reducers - методы стейта, так же будет видно какой срабатывает в devTools
 */
export const storeTasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /**
     * сохраняем задачу в стейт
     * @param state - хранение состояния
     * @param action  - экшен который передаем в стейт
     */
    saveTask: (state, action: PayloadAction<TaskState>) => {
      // state.value += action.payload;
      state.tasks = [
        ...state.tasks,
        {
          text: action.payload.text,
          id: action.payload.id,
          time: action.payload.time,
          count: action.payload.count,
        },
      ];
    },
  },
});

//экшены задач
export const { saveTask } = storeTasks.actions;
//стейты задач
export const selectTask = (state: RootState) => state.tasks.tasks;
//выгружаем редьюсер для главного стора
export default storeTasks.reducer;
