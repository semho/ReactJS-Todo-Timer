import React from 'react';
import './cellsetting.css';

interface ICellProps {
  title: string;
  idInput: string;
  type?: string;
}

export function CellSetting({ title, idInput, type = 'number' }: ICellProps) {
  return (
    <>
      <h4 className="cell__title">{title}</h4>

      <input
        placeholder="в минутах"
        name={idInput}
        type={type}
        id={idInput}
        className="form-control"
      />
    </>
  );
}
