import React from 'react';
import './button.css';

type TColor = 'green' | 'gray' | 'red';
type TType = 'submit' | 'button';

interface IButtonProps {
  variant: TColor;
  type: TType;
  title: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}

export function Button({
  variant,
  type,
  title,
  className,
  onClick,
  disabled,
}: IButtonProps) {
  const colorBtn = `btn-task btn-task--${variant} ${className}`;

  return (
    <button
      type={type}
      className={colorBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
