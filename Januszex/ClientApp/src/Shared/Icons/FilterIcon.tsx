import React from 'react';
import { IconProps } from 'Types/utils';

interface Props extends IconProps {
  onClick?: VoidFunctionNoArgs;
}

export const FilterIcon = ({ size, onClick }: Props): JSX.Element => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={size || 32}
      height={size || 32}
      viewBox="0 0 32 32"
      onClick={onClick}
    >
      <title>filter</title>
      <path d="M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z" />
    </svg>
  );
};
