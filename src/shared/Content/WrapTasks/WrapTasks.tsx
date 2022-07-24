import React from 'react';
import './wraptasks.css';

interface IWrapProps {
  children?: React.ReactNode;
}

export function WrapTasks({ children }: IWrapProps) {
  return (
    <div className="container__wrap-tasks wrap-tasks">
      {children}
    </div>
  );
}
