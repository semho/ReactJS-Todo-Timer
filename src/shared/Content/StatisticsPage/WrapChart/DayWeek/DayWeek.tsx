import React from 'react';
import { getDeclensionWordFromNumber } from '../../../../../utils/declension';
import './dayweek.css';

interface IDayProps {
  day: string;
  time?: number;
}

export function DayWeek({ day, time }: IDayProps) {
  let component: any = 'Нет данных';

  if (time) {
    component = getFullTime(time);
  }

  return (
    <div className="day-week">
      <h4 className="day-week__title">{day}</h4>
      <div className="day-week__text">{component}</div>
    </div>
  );
}

function getFullTime(time: number) {
  return (
    <div>
      Вы работали над задачей в течение <span>{getTime(time)}</span>
    </div>
  );
}

/**
 * Функция преобразовывает число в секундах в строку со временем
 * @param sec - принимает число секунд всего
 * @returns - возвращает строку со временем
 */
function getTime(sec: number): string {
  const hours = Math.trunc(sec / 60 / 60);
  const minutes = Math.trunc(sec / 60) % 60;
  const seconds = sec % 60;

  const arrHours: [string, string, string] = ['часа', 'часов', 'часов'];
  const arrMinutes: [string, string, string] = ['минуты', 'минут', 'минут'];
  const arrSeconds: [string, string, string] = ['секунды', 'секунд', 'секунд'];

  if (hours !== 0) {
    return `${hours} ${getDeclensionWordFromNumber(
      hours,
      arrHours
    )} ${minutes} ${getDeclensionWordFromNumber(minutes, arrMinutes)}`;
  } else if (minutes !== 0 && seconds !== 0) {
    return `${minutes} ${getDeclensionWordFromNumber(
      minutes,
      arrMinutes
    )} ${seconds} ${getDeclensionWordFromNumber(seconds, arrSeconds)}`;
  } else if (minutes !== 0) {
    return `${minutes} ${getDeclensionWordFromNumber(minutes, arrMinutes)}`;
  } else {
    return `${seconds} ${getDeclensionWordFromNumber(seconds, arrSeconds)}`;
  }
}
