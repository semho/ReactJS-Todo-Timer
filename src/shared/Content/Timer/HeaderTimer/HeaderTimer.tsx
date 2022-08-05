import React, { useEffect, useState } from 'react';
import './headertimer.css';

type TStatus = 'stop' | 'run' | 'rest';

interface IHeaderProps {
  status?: TStatus;
  task?: string;
  count?: number;
  isRest?: boolean;
}

export function HeaderTimer({
  status,
  task,
  count,
  isRest = false,
}: IHeaderProps) {
  const [isBreak, setIsBreak] = useState(isRest);

  useEffect(() => {
    setIsBreak(isRest);
  }, [isRest]);

  return (
    <div className={`timer__header timer__header--${status}`}>
      <span className="timer__header-task">{task}</span>
      <span className="timer__header-count">{`${
        isBreak ? 'Перерыв' : 'Помидор ' + count
      }`}</span>
    </div>
  );
}
