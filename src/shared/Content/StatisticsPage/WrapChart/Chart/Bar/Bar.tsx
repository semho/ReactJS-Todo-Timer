import React from 'react';
import './bar.css';

interface IBarProps {
  height?: number;
}

export function Bar({ height = 1 }: IBarProps) {
  let color = 'gray';
  if (height > 1) {
    color = 'red';
  }
  return (
    <div
      className={`chart__graphs-value chart__graphs-value--${color}`}
      style={{ height: `${height}%` }}
    ></div>
  );
}
