// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
/**
 * интерфейс хранения данных настроек
 * @param id - строка с id input на странице настроек
 * @param time - число в котором передаем минуты
 */
export interface ChangeSettingState {
  id: string;
  time?: number | string;
}

interface SettingsState {
  settings: ChangeSettingState[];
}
//начальное состояние настроек
const initialState: SettingsState = {
  settings: localStorage.getItem('settings')
    ? JSON.parse(localStorage.getItem('settings') || '{}')
    : [],
};
/**
 * name - название стейта, будет видно в devTools
 * initialState - передаем начальное состояние в стейт
 * reducers - методы стейта, так же будет видно какой срабатывает в devTools
 */
export const storeSettings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * сохраняем настройки в store
     * @param state - хранение состояния
     * @param action - экшен который передаем в store
     */
    changeTimeSettings: (state, action: PayloadAction<ChangeSettingState>) => {
      let isExist = false;
      state.settings = state.settings.map((item) => {
        if (item.id === action.payload.id) {
          isExist = true;
          return {
            ...item,
            time: action.payload.time,
          };
        }
        return item;
      });

      if (!isExist) {
        state.settings.push(action.payload);
      }
    },
  },
});

//экшены задач
export const { changeTimeSettings } = storeSettings.actions;
//стейты задач
export const selectSettings = (state: RootState) => state.settings.settings;
//выгружаем редьюсер для главного стора
export default storeSettings.reducer;
