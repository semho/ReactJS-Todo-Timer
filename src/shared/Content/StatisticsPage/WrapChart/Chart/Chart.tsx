import React, { useState } from 'react';
import { getNumberDay } from '../../../../../utils/removeSymbols';
import { Bar } from './Bar';
import './chart.css';

interface IChartProps {
  updateDayWeek: (value: string) => void;
  objectForBars: {
    [id: string]: number;
  };
}

export function Chart({ updateDayWeek, objectForBars }: IChartProps) {
  //константа на одну помидорку
  const TIME_TASK = 25;
  //примем за максимальное значение и полный бар - время потраченное на 5 помидорок
  const MAX_TIME = TIME_TASK * 5 * 60;

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    //убираем активный класс у всех дней недели
    const days = Array.from(document.querySelectorAll('.chart__days'));
    for (const element of days) {
      element.classList.remove('active');
    }
    //убираем активный класс у всех баров недели
    const bars = Array.from(document.querySelectorAll('.chart__graphs'));
    for (const element of bars) {
      element.classList.remove('active');
    }

    const day = (event.target as HTMLElement).closest('.chart__days');
    if (!day) return;
    //вешаем на один по которому нажали
    day.classList.add('active');
    updateDayWeek(day.id);
    //делаем активным бар
    for (const element of bars) {
      if (element.classList.contains(`graph${getNumberDay(day.id)}`)) {
        element.classList.add('active');
      }
    }
  }

  return (
    <div className="chart-container chart" onClick={handleClick}>
      <div className="level2 chart__levels"></div>
      <div className="level3 chart__levels"></div>
      <div className="level4 chart__levels"></div>
      <div className="level5 chart__levels"></div>
      <div className="empty"></div>
      <div className="unit1 chart__units">25 мин</div>
      <div className="unit5 chart__units"></div>
      <div className="unit4 chart__units">1 ч 40 мин</div>
      <div className="unit3 chart__units">1 ч 15 мин</div>
      <div className="unit2 chart__units">50 мин</div>
      <div className="graph1 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[1])} />
      </div>
      <div className="graph2 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[2])} />
      </div>
      <div className="graph3 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[3])} />
      </div>
      <div className="graph4 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[4])} />
      </div>
      <div className="graph5 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[5])} />
      </div>
      <div className="graph6 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[6])} />
      </div>
      <div className="graph0 chart__graphs">
        <Bar height={getPercentages(MAX_TIME, objectForBars[0])} />
      </div>
      <div className="day1 chart__days" id="day1">
        Пн
      </div>
      <div className="day2 chart__days" id="day2">
        Вт
      </div>
      <div className="day3 chart__days" id="day3">
        Ср
      </div>
      <div className="day4 chart__days" id="day4">
        Чт
      </div>
      <div className="day5 chart__days" id="day5">
        Пт
      </div>
      <div className="day6 chart__days" id="day6">
        Сб
      </div>
      <div className="day0 chart__days active" id="day0">
        Вс
      </div>
      <div className="footer_empty"></div>
      <div className="footer1"></div>
      <div className="footer2"></div>
      <div className="footer3"></div>
      <div className="footer4"></div>
      <div className="footer5"></div>
      <div className="footer6"></div>
      <div className="footer0"></div>
    </div>
  );
}
/**
 * Преобразуем отношение секунд потраченых на работу к принятому числу за максимальное значение в процентах
 * @param max - число, выражающее максимальное значение, как 100%
 * @param value - число в секундах потраченных на задачи
 * @returns - возвращаем в процентах
 */
function getPercentages(max: number, value: number): number {
  if (value === undefined) {
    return 1;
  }
  const ratio = Math.round((value / max) * 100);
  if (ratio > 100) return 100;
  if (ratio < 1) return 1;

  return ratio;
}
