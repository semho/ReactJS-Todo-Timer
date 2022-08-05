import React from 'react';
import './wraptimer.css';

interface IWrapTimerProps {
  children?: React.ReactNode;
}

export function WrapTimer({ children }: IWrapTimerProps) {
  return <div className="container__timer">{children}</div>;
}
