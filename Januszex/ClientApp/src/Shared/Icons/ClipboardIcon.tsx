import React from 'react';
import { IconProps } from 'Types/utils';

export const ClipboardIcon = ({ size }: IconProps): JSX.Element => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={size || 32}
      height={size || 32}
      viewBox="0 0 32 32"
    >
      <title>clipboard</title>
      <path d="M29 4h-9c0-2.209-1.791-4-4-4s-4 1.791-4 4h-9c-0.552 0-1 0.448-1 1v26c0 0.552 0.448 1 1 1h26c0.552 0 1-0.448 1-1v-26c0-0.552-0.448-1-1-1zM16 2c1.105 0 2 0.895 2 2s-0.895 2-2 2c-1.105 0-2-0.895-2-2s0.895-2 2-2zM28 30h-24v-24h4v3c0 0.552 0.448 1 1 1h14c0.552 0 1-0.448 1-1v-3h4v24z" />
      <path d="M14 26.828l-6.414-7.414 1.828-1.828 4.586 3.586 8.586-7.586 1.829 1.828z" />
    </svg>
  );
};