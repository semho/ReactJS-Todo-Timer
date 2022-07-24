import React from 'react';
import { FocusIcon } from '../../../../Icons/FocusIcon';
import { StopIcon } from '../../../../Icons/StopIcon';
import { TimeIcon } from '../../../../Icons/TimeIcon';
import './cellstatistics.css';

type TColorBack = 'gray' | 'beige' | 'turquoise' | 'lilac';
type TSVG = 'focus' | 'time' | 'stop';

interface ICellProps {
  background?: TColorBack;
  icon: TSVG;
  title: string;
  text: string;
}

export function CellStatistics({
  background = 'gray',
  icon,
  title,
  text,
}: ICellProps) {
  //получаем иконку
  const component = getIconOrUnit(icon, false, background);
  //получаем единицы измерений
  const unit = getIconOrUnit(icon, true);
  const valueCell = `${text} ${unit}`;

  return (
    <div className={`cell cell--${background}`}>
      <div className="cell__content">
        <div className="cell__title">{title}</div>
        <div className="cell__text">{valueCell}</div>
      </div>
      {component}
    </div>
  );
}
/**
 * Возвращает компонент иконки или единицы измерений ячейки
 * @param icon строка со значение ячейки
 * @param unit флаг системы единиц измерений
 * @param background цвет ячейки
 * @returns
 */
function getIconOrUnit(icon: string, unit: boolean, background?: string) {
  switch (icon) {
    case 'focus':
      if (unit) return '%';
      return <FocusIcon background={background} />;
    case 'time':
      if (unit) return 'м';
      return <TimeIcon background={background} />;
    case 'stop':
      if (unit) return '';
      return <StopIcon background={background} />;
  }
}
