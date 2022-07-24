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
//изменяемая задача
interface changeTaskState {
  text?: string;
  id: string;
}
interface TasksState {
  tasks: TaskState[];
}
//начальное состояние задачи
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
     * сохраняем задачу в store
     * @param state - хранение состояния
     * @param action  - экшен который передаем в store(в данном случае задача)
     */
    addTask: (state, action: PayloadAction<TaskState>) => {
      state.tasks.push(action.payload);
    },
    /**
     * удаляем задачу из store по ее id
     * @param state - хранение состояния
     * @param action  - экшен который передаем в store(в данном случае задача)
     */
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(({ id }) => id !== action.payload);
    },
    /**
     * добавляем время к задаче по ее id
     */
    addTimeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count: item.count + 1,
            time: item.time + 25,
          };
        }
        return item;
      });
    },
    /**
     * убавляем время у задачи по ее id
     */
    downTimeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count: item.count - 1,
            time: item.time - 25,
          };
        }
        return item;
      });
    },
    /**
     * меняем название задачи по ее id
     */
    // changeTask: (state, action: PayloadAction<string>) => {
    //   state.tasks = state.tasks.map((item) => {
    //     if (item.id === action.payload) {
    //       return {
    //         ...item,
    //         text: 'новый текст',
    //       };
    //     }
    //     return item;
    //   });
    // },
    changeTask: (state, action: PayloadAction<changeTaskState>) => {
      state.tasks = state.tasks.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text,
          };
        }
        return item;
      });
    },
  },
});

//экшены задач
export const { addTask, removeTask, addTimeTask, downTimeTask, changeTask } =
  storeTasks.actions;
//стейты задач
export const selectTask = (state: RootState) => state.tasks.tasks;
//выгружаем редьюсер для главного стора
export default storeTasks.reducer;
