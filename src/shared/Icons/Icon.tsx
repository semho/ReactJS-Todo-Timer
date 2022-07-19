import React from 'react';

export enum EIcons {
  statistics = 'M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z',
}

type TSizes = 50 | 40 | 30 | 24 | 20 | 16 | 15 | 12 | 8;

type TColor = '#DC3E22' | '#A8B64F' | '#B7280F | #C4C4C4'

interface IIconProps {
    size ?: TSizes;
    name ?: EIcons;
    color ?: TColor;
}

export function Icon({name, size = 24, color = '#DC3E22'}: IIconProps) {
    const viewBoxString = `0 0 ${size} ${size}`;

    return(
        <svg width={size} height={size} viewBox={viewBoxString} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={name} fill={color}/>
        </svg>
    );
}
