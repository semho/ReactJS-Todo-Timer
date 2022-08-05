import React, { useState } from 'react';
import './statisticspage.css';
import { StatisticsTitle } from './StatisticsTitle';
import { WrapChart } from './WrapChart';
import { WrapInfo } from './WrapInfo';

interface DayStatisticsState {
  id: string;
  numberDayWeek: number;
  allTimeSpentWork: number;
  amountTimeSpentPause: number;
  countFinishedTomato: number;
  countStop: number;
}

const initial: DayStatisticsState = {
  id: '',
  numberDayWeek: 0,
  allTimeSpentWork: 0,
  amountTimeSpentPause: 0,
  countFinishedTomato: 0,
  countStop: 0,
};

export function StatisticsPage() {
  //стейт под неделю
  const [weekSelect, setWeekSelect] = useState('current');
  //функция через которую обновляем неделю из селекта компонента StatisticsTitle
  function updateWeek(value?: string) {
    if (value) setWeekSelect(value);
  }

  //стейт под день недели
  const [dayWeekSelect, setDayWeekSelect] =
    useState<DayStatisticsState>(initial);
  //функция через которую обновляем объект дня недели из компонента WrapChart
  function updateDay(obj?: DayStatisticsState) {
    if (obj) {
      setDayWeekSelect(obj);
    } else {
      setDayWeekSelect(initial);
    }
  }

  return (
    <div className="content__statistics-page statistics-page">
      <StatisticsTitle updateWeek={updateWeek} />
      <WrapChart week={weekSelect} updateDay={updateDay} />
      <WrapInfo day={dayWeekSelect} />
    </div>
  );
}
