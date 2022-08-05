import React from 'react';
import { getDeclensionWordFromNumber } from '../../../../../utils/declension';
import { NoTomatoesIcon } from '../../../../Icons/NoTomatoesIcon';
import { TomatoesIcon } from '../../../../Icons/TomatoesIcon';
import './counttomato.css';

interface ICountProps {
  count?: number;
}

export function CountTomato({ count }: ICountProps) {
  //Прописываем склонение слов для помидор
  const arrTomato: [string, string, string] = [
    'помидор',
    'помидора',
    'помидоров',
  ];

  return (
    <div className="count-tomato">
      {count && count > 0 && getTomatoes(count, arrTomato)}
      {!count && <NoTomatoesIcon />}
    </div>
  );
}

function getTomatoes(count: number, arr: [string, string, string]) {
  return (
    <div className="count-tomato__wrap">
      <div className="count-tomato__sum">
        <TomatoesIcon />х {`${count}`}
      </div>
      <div className="count-tomato__footer">
        <span>{`${count} ${getDeclensionWordFromNumber(count, arr)}`}</span>
      </div>
    </div>
  );
}
