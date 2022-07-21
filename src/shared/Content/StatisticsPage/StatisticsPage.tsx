import React from 'react';
import { CellStatistics } from './CellStatistics';
import { CountTomato } from './CountTomato';
import { DayWeek } from './DayWeek';
import './statisticspage.css';

export function StatisticsPage() {
  return (
    <div className="content__statistics-page statistics-page">
      <h4 className="statistics-page__title">Ваша активность</h4>
      <div className="statistics-page__wrap-chart wrap-chart">
        <div className="wrap-chart__chart">График</div>
        <div className="wrap-chart__day_week">
          <DayWeek day="Суббота" time="51 минуты" />
        </div>
        <div className="wrap-chart__count">
          <CountTomato count={2} />
        </div>
      </div>
      <div className="statistics-page__wrap-info wrap-info">
        <div className="wrap-info__time-focus">
          <CellStatistics
            icon="focus"
            title="Фокус"
            text="35"
            background="beige"
          />
        </div>
        <div className="wrap-info__time-pause">
          <CellStatistics
            background="lilac"
            icon="time"
            title="Время на паузе"
            text="35"
          />
        </div>
        <div className="wrap-info__time-stop">
          <CellStatistics
            background="turquoise"
            icon="stop"
            title="Остановки"
            text="3"
          />
        </div>
      </div>
    </div>
  );
}
