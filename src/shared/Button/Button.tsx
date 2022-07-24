import React from 'react';
import './button.css';

type TColor = 'green' | 'gray' | 'red';
type TType = 'submit' | 'button';

interface IButtonProps {
  variant: TColor;
  type: TType;
  title: string;
}

export function Button({ variant, type, title }: IButtonProps) {
  const colorBtn = `btn-task btn-task--${variant}`;

  return (
    <button type={type} className={colorBtn}>
      {title}
    </button>
  );
}
