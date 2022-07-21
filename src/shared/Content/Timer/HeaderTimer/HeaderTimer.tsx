import React from 'react';
import './headertimer.css';

type TStatus = 'stop' | 'run' | 'pause';

interface IHeaderProps {
  status: TStatus;
  task: string;
  count: number;
}

export function HeaderTimer({ status, task, count }: IHeaderProps) {
  return (
    <div className={`timer__header timer__header--${status}`}>
      <span className="timer__header-task">{task}</span>
      <span className="timer__header-count">Помидор {count}</span>
    </div>
  );
}
