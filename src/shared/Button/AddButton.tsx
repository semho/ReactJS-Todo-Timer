import React from 'react';
import './button.css';

type TColor = 'green' | 'gray';

interface IButtonProps {
  variant?: TColor;
  onClick?: () => void;
  disabled?: boolean;
  className: string;
}

export function AddButton({
  variant = 'gray',
  onClick,
  disabled,
  className,
}: IButtonProps) {
  const colorBtn = `btn-add-time btn-add-time--${variant} ${className}`;
  let fill = '#C4C4C4';

  if (variant == 'green') {
    fill = '#899441';
  }

  return (
    <button className={colorBtn} onClick={onClick} disabled={disabled}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="25" r="25" fill={fill} />
        <path
          d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
