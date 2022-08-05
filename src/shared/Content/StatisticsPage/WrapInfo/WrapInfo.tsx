import React from 'react';
import { useAppSelector } from '../../../../hooks/hooksStore';
import {
  ChangeSettingState,
  selectSettings,
} from '../../../store/slices/settings';
import { CellStatistics } from './CellStatistics';
import './wrapinfo.css';

interface DayStatisticsState {
  id: string;
  numberDayWeek: number;
  allTimeSpentWork: number;
  amountTimeSpentPause: number;
  countFinishedTomato: number;
  countStop: number;
}

interface IInfoProps {
  day: DayStatisticsState;
}

export function WrapInfo({ day }: IInfoProps) {
  const settings: ChangeSettingState[] = useAppSelector(selectSettings);
  const currentTimeTask = settings.find(
    (item) => item.id === 'input-time-tomato'
  );
  //константа времени на одну помидорку в секундах
  const TIME_TASK = (Number(currentTimeTask?.time) || 25) * 60;
  //количество выполненных помидорок на константу времени
  const timeForTomato = TIME_TASK * day.countFinishedTomato;
  //посчитаем фокус (отношение времени работы с таймером ко времени, потраченному на законченные «помидорки»)
  const calculationFocus = Math.round(
    (timeForTomato / (day.allTimeSpentWork + day.amountTimeSpentPause)) * 100
  );
  const focus = calculationFocus > 100 ? 100 : calculationFocus;

  return (
    <div className="statistics-page__wrap-info wrap-info">
      <div className="wrap-info__time-focus">
        <CellStatistics
          icon="focus"
          title="Фокус"
          value={day.countFinishedTomato > 0 ? focus : 0}
          background={day.countFinishedTomato > 0 ? 'beige' : undefined}
        />
      </div>
      <div className="wrap-info__time-pause">
        <CellStatistics
          background={day.amountTimeSpentPause > 60 ? 'lilac' : undefined}
          icon="time"
          title="Время на паузе"
          value={day.amountTimeSpentPause}
          unitUse={false}
        />
      </div>
      <div className="wrap-info__time-stop">
        <CellStatistics
          background={day.countStop > 0 ? 'turquoise' : undefined}
          icon="stop"
          title="Остановки"
          value={day.countStop}
        />
      </div>
    </div>
  );
}
