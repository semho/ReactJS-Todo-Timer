import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooksStore';
import { getNumberDay } from '../../../../utils/removeSymbols';
import { selectStatistics } from '../../../store/slices/statistics';
import { Chart } from './Chart';
import { CountTomato } from './CountTomato';
import { DayWeek } from './DayWeek';

import './wrapchart.css';

interface IWrapProps {
  week: string;
  updateDay: (obj?: DayStatisticsState) => void;
}

interface DayStatisticsState {
  id: string;
  numberDayWeek: number;
  allTimeSpentWork: number;
  amountTimeSpentPause: number;
  countFinishedTomato: number;
  countStop: number;
}

export function WrapChart({ week, updateDay }: IWrapProps) {
  //стейт под день недели
  const [idDay, setIdDay] = useState('day0');
  //функция через которую обновляем день недели из компонента Chart
  function updateDayWeek(value: string) {
    setIdDay(value);
  }
  //достаем статистику из store
  const statistics = useAppSelector(selectStatistics);
  //получаем статистику за выбранную неделю
  const statisticsWeek = getStatistics(statistics, week);
  //выбераем статистику за выбранный день
  const dayWeek = statisticsWeek.find((item) => {
    if (item.numberDayWeek === Number(getNumberDay(idDay))) {
      return item;
    }
  });
  //выберем только нужные данные для баров графика и поместим все в объект
  const objectForBars = statisticsWeek.reduce(
    (obj, item) =>
      Object.assign(obj, { [item.numberDayWeek]: item.allTimeSpentWork }),
    {}
  );

  useEffect(() => {
    //передаем родителю стейт
    updateDay(dayWeek);
  }, [dayWeek, updateDay]);

  return (
    <div className="statistics-page__wrap-chart wrap-chart">
      <div className="wrap-chart__chart">
        <Chart updateDayWeek={updateDayWeek} objectForBars={objectForBars} />
      </div>
      <div className="wrap-chart__day_week">
        <DayWeek day={getDayWeek(idDay)} time={dayWeek?.allTimeSpentWork} />
      </div>
      <div className="wrap-chart__count">
        <CountTomato count={dayWeek?.countFinishedTomato} />
      </div>
    </div>
  );
}
/**
 * Функция для получения дня недели
 * @param idDay - id дня недели
 * @returns - возвращает строку с днем недели
 */
function getDayWeek(idDay: string): string {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  const numberDay = getNumberDay(idDay);

  return days[numberDay];
}

/**
 * функция возвращает массив обектов статистики в зависимости от переданной недели
 * @param statistics - весь массив статистики
 * @param week - строка с неделей
 * @returns - возвращает массив объектов определенной недели
 */
function getStatistics(statistics: DayStatisticsState[], week: string) {
  const currentWeek = getStatisticsForWeek(statistics);
  const lastWeek = getStatisticsForWeek(statistics, 7);
  const twoWeeksAgo = getStatisticsForWeek(statistics, 14);
  if (week === '2lastWeek') {
    return twoWeeksAgo;
  } else if (week === 'lastWeek') {
    return lastWeek;
  }
  return currentWeek;
}
/**
 * Функция фильтрует массив объектов по id(дате), возвращая объекты только одной недели
 * @param statistics - весь массив объектов со статистикой
 * @param daysAgo - сколько дней отступить от начала текущей недели
 * @returns возвращает массив объектов выбранной недели
 */
function getStatisticsForWeek(statistics: DayStatisticsState[], daysAgo = 0) {
  const curr = new Date(new Date().setHours(0, 0, 0, 0));

  const first =
    curr.getDate() - ((curr.getDay() === 0 ? 7 : curr.getDay()) + daysAgo) + 1;

  const firstday = new Date(curr.setDate(first));

  const lastday = new Date(curr.setDate(curr.getDate() + 6));

  const week = statistics.filter((item) => {
    const date = new Date(item.id);
    if (
      date.getTime() >= firstday.getTime() &&
      date.getTime() <= lastday.getTime()
    ) {
      return item;
    }
  });

  return week;
}
