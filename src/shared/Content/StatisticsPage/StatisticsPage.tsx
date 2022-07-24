import React from 'react';
import './statisticspage.css';
import { StatisticsTitle } from './StatisticsTitle';
import { WrapChart } from './WrapChart';
import { WrapInfo } from './WrapInfo';

export function StatisticsPage() {
  return (
    <div className="content__statistics-page statistics-page">
      <StatisticsTitle />
      <WrapChart />
      <WrapInfo />
    </div>
  );
}
