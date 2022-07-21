import React from 'react';
import { Button } from '../../Button';
import { AddButton } from '../../Button/AddButton';
import { HeaderTimer } from './HeaderTimer';
import './timer.css';

export function Timer() {
  return (
    <div className="container__timer timer">
      <HeaderTimer count={1} task="Сверстать сайт" status="stop" />
      <div className="timer__content">
        <div className="timer__duration">
          25:00 <AddButton />
        </div>
        <div className="timer__task-current">
          <span>Задача 1 - </span>Сверстать сайт
        </div>
        <div className="timer__wrap-button">
          <Button type="button" variant="green" title="Старт" />
          <Button type="button" variant="gray" title="Стоп" />
        </div>
      </div>
    </div>
  );
}
