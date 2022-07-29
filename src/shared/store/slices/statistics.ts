// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
/**
 * интерфейс хранения данных статистики
 * @param id - день месяца с номером месяца и днем недели(формат 1_1_0 - день_месяц_деньНедели)
 * день начинается с 1 до 31, месяц с 0 до 11, день недели с 0(воскресенье) до 6
 * @param allTimeSpentWork - общее потраченное время над задачами(в течении дня)
 * @param amountTimeSpentPause - время на паузе(в течении дня)
 * @param countFinishedTomato - количество выполненых помидор(в течении дня)
 * @param countStop - количесто остановок(в течении дня)
 */
interface DayStatisticsState {
  id: string;
  allTimeSpentWork: number;
  amountTimeSpentPause: number;
  countFinishedTomato: number;
  countStop: number;
}

interface StatisticsState {
  statistics: DayStatisticsState[];
}
//начальное состояние Статистики
const initialState: StatisticsState = {
  statistics: [],
};
/**
 * name - название стейта, будет видно в devTools
 * initialState - передаем начальное состояние в стейт
 * reducers - методы стейта, так же будет видно какой срабатывает в devTools
 */
export const storeStatistics = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    /**
     * сохраняем статистику в store
     * @param state - хранение состояния
     * @param action - экшен который передаем в store
     */
    addDayStatistics: (state, action: PayloadAction<DayStatisticsState>) => {
      //флаг на существования записи
      let isExist = false;
      //перебираем массив с записями
      state.statistics = state.statistics.map((item) => {
        if (item.id === action.payload.id) {
          isExist = true;
          return {
            ...item,
            allTimeSpentWork:
              item.allTimeSpentWork + action.payload.allTimeSpentWork,
            amountTimeSpentPause:
              item.amountTimeSpentPause + action.payload.amountTimeSpentPause,
            countFinishedTomato:
              item.countFinishedTomato + action.payload.countFinishedTomato,
            countStop: item.countStop + action.payload.countStop,
          };
        }
        return item;
      });
      //если записей нет с указанным id, добавляем весь объект в хранилище
      if (!isExist) {
        state.statistics.push(action.payload);
      }
    },
    // addStop: (state, action: PayloadAction<DayStatisticsState>) => {
    //   //флаг на существования записи
    //   let isExist = false;
    //   //перебираем массив с записями
    //   state.statistics = state.statistics.map((item) => {
    //     if (item.id === action.payload.id) {
    //       isExist = true;
    //       return {
    //         ...item,
    //         countStop: item.countStop + action.payload.countStop,
    //       };
    //     }
    //     return item;
    //   });
    //   //если записей нет с указанным id, добавляем весь объект в хранилище
    //   if (!isExist) {
    //     state.statistics.push(action.payload);
    //   }
    // },
  },
});

//экшены задач
export const { addDayStatistics } = storeStatistics.actions;
//стейты задач
export const selectStatistics = (state: RootState) =>
  state.statistics.statistics;
//выгружаем редьюсер для главного стора
export default storeStatistics.reducer;
