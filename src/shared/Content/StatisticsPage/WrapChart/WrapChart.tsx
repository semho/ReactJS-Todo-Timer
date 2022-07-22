import React from 'react';
import { Chart } from './Chart';
import { CountTomato } from './CountTomato';
import { DayWeek } from './DayWeek';
import './wrapchart.css';

export function WrapChart() {
  return (
    <div className="statistics-page__wrap-chart wrap-chart">
      <div className="wrap-chart__chart">
        <Chart />
      </div>
      <div className="wrap-chart__day_week">
        <DayWeek day="Суббота" time="51 минуты" />
      </div>
      <div className="wrap-chart__count">
        <CountTomato count={2} />
      </div>
    </div>
  );
}
