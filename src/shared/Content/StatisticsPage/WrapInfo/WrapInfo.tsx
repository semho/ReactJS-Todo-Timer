import React from 'react';
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
  //константа времени на одну помидорку в секундах
  const TIME_TASK = 25 * 60;
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
          background="beige"
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
