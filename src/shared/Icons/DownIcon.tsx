import React from 'react';

type TSizes = 50 | 40 | 30 | 24 | 20 | 16 | 15 | 12 | 8;

type TColor = '#DC3E22' | '#A8B64F' | '#B7280F' | '#C4C4C4';

interface IIconProps {
  size?: TSizes;
  color?: TColor;
}

export function DownIcon({ size = 16, color = '#C4C4C4' }: IIconProps) {
  const viewBoxString = `0 0 ${size} ${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBoxString}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.5C3.8675 0.5 0.5 3.8675 0.5 8C0.5 12.1325 3.8675 15.5 8 15.5C12.1325 15.5 15.5 12.1325 15.5 8C15.5 3.8675 12.1325 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z"
        fill={color}
      />
      <path
        d="M4.25 7.25H7.25H8.75H11.75V8.75H8.75H7.25H4.25V7.25Z"
        fill={color}
      />
    </svg>
  );
}
