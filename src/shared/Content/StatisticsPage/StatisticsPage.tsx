import React, { useState } from 'react';
import './statisticspage.css';
import { StatisticsTitle } from './StatisticsTitle';
import { WrapChart } from './WrapChart';
import { WrapInfo } from './WrapInfo';

export function StatisticsPage() {
  //стейт под неделю
  const [weekSelect, setWeekSelect] = useState('current');
  //функция через которую обновляем неделю из селекта компонента StatisticsTitle
  function updateWeek(value?: string) {
    if (value) setWeekSelect(value);
  }

  return (
    <div className="content__statistics-page statistics-page">
      <StatisticsTitle updateWeek={updateWeek} />
      <WrapChart week={weekSelect} />
      <WrapInfo />
    </div>
  );
}
