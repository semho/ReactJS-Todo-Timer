import React, { useState } from 'react';
import './statisticstitle.css';
import Select from 'react-select';

interface IOption {
  value?: string;
  label?: string;
}

/**
 * настройки стилей для селекта
 *  control - текущее поле
 *  options - каждый отдельный пункт в меню
 *  menu - общий контейнер для выпадающего списка
 *  dropdownIndicator - стрелка в текущем поле
 */
const colourStyles = {
  control: (styles: any) => {
    return {
      ...styles,
      padding: '0 5px',
      backgroundColor: '#F4F4F4',
      height: '55px',
      width: '370px',
      border: 'none',
      borderRadius: 'none',
      boxShadow: 'none',
    };
  },
  option: (styles: any) => ({
    ...styles,
    padding: '15px',
    backgroundColor: '#F4F4F4',
    border: 'none',
    borderTop: '1px solid #DEDEDE',
  }),
  menu: (provided: any) => {
    return {
      ...provided,
      padding: 0,
      margin: 0,
      width: '370px',
      top: '50px',
      backgroundColor: '#F4F4F4',
      borderRadius: 'none',
      border: 0,
      boxShadow: 'none',
    };
  },
  dropdownIndicator: (base: any, { isFocused }: any) => {
    let changes = {
      padding: '10px',
      transform: 'scale(1.2) translateY(2px)',
      svg: {
        fill: '#B7280F',
        transform: isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
      },
    };
    return Object.assign(base, changes);
  },
};

const options = [
  { value: 'current', label: 'Эта неделя' },
  { value: 'lastWeek', label: 'Прошедшая неделя' },
  { value: '2lastWeek', label: '2 недели назад' },
];

export function StatisticsTitle() {
  const [option, setOption] = useState<IOption>({
    value: 'current',
    label: 'Эта неделя',
  });

  return (
    <div className="statistics-page__title-wrap">
      <h4 className="statistics-page__title">Ваша активность</h4>
      <Select
        className="statistics-page__select--custom"
        value={option}
        hideSelectedOptions={true}
        onChange={(value) =>
          setOption({ value: value?.value, label: value?.label })
        }
        styles={colourStyles}
        options={options}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
}
