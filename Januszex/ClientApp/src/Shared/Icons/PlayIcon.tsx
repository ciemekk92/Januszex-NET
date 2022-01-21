import React from 'react';
import { IconProps } from 'Types/utils';

export const PlayIcon = ({ size }: IconProps): JSX.Element => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={size || 32}
      height={size || 32}
      viewBox="0 0 32 32"
    >
      <title>play3</title>
      <path d="M6 4l20 12-20 12z"></path>
    </svg>
  );
};
