import React from 'react';

import { StyledInput } from './NumericInput.styled';

interface NumericInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumericInput = ({
  onChange,
  placeholder = '',
  ...props
}: NumericInputProps): JSX.Element => {
  return (
    <StyledInput
      placeholder={placeholder}
      type="number"
      onChange={onChange}
      {...props}
    />
  );
};
