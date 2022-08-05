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
  value: number;
  unitUse?: boolean;
}

export function CellStatistics({
  background = 'gray',
  icon,
  title,
  value,
  unitUse = true,
}: ICellProps) {
  //получаем иконку
  const component = getIconOrUnit(icon, false, background);
  //получаем единицы измерений
  const unit = getIconOrUnit(icon, true);

  return (
    <div className={`cell cell--${background}`}>
      <div className="cell__content">
        <div className="cell__title">{title}</div>
        <div className="cell__text">
          {unit === 'm' ? getTimeFromMinutes(value) : value}
          {unitUse ? unit : ''}
        </div>
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
      if (unit) return 'm';
      return <TimeIcon background={background} />;
    case 'stop':
      if (unit) return '';
      return <StopIcon background={background} />;
  }
}

/**
 * Функция преобразовывает число в минутах в строку в формате "ХХ час ХХ мин"
 * @param min - принимает число минут всего
 * @returns - возвращает строку вида (часы минуты)
 */
function getTimeFromMinutes(min: number): string {
  const hours = Math.trunc(min / 60 / 60);
  const minutes = Math.trunc(min / 60) % 60;
  if (hours === 0) {
    return minutes + 'м';
  }
  return hours + 'ч ' + minutes + 'м';
}
