import React from 'react';
import { CellStatistics } from './CellStatistics';
import './wrapinfo.css';

export function WrapInfo() {
  return (
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
  );
}
