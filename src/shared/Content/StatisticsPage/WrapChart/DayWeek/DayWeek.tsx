import React from 'react';
import './dayweek.css';

interface IDayProps {
  day: string;
  time?: string | null;
}

export function DayWeek({ day, time = null }: IDayProps) {
  let component: any = 'Нет данных';

  if (time !== null) {
    component = getFullTime(time);
  }

  return (
    <div className="day-week">
      <h4 className="day-week__title">{day}</h4>
      <div className="day-week__text">{component}</div>
    </div>
  );
}

function getFullTime(time: string) {
  return (
    <div>
      Вы работали над задачей в течение <span>{time}</span>
    </div>
  );
}
