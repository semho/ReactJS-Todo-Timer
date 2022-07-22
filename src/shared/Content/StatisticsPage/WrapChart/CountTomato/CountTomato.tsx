import React from 'react';
import { NoTomatoesIcon } from '../../../../Icons/NoTomatoesIcon';
import { TomatoesIcon } from '../../../../Icons/TomatoesIcon';
import './counttomato.css';

interface ICountProps {
  count?: number;
}

export function CountTomato({ count }: ICountProps) {
  let component = <NoTomatoesIcon />;

  if (count && count > 0) {
    component = getTomatoes(count);
  }

  return <div className="count-tomato">{component}</div>;
}

function getTomatoes(count: number) {
  return (
    <div className="count-tomato__wrap">
      <div className="count-tomato__sum">
        <TomatoesIcon />х {`${count}`}
      </div>
      <div className="count-tomato__footer">
        <span>{`${count}`} помидора</span>
      </div>
    </div>
  );
}
