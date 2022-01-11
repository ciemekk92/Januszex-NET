import React from 'react';

import {
  StyledCheckbox,
  StyledContainer,
  StyledLabel,
  StyledRow
} from './MultiSelect.styled';

interface Option {
  label: string;
  value: string;
}

interface Props {
  onChange: (values: string[]) => void;
  options: Option[];
  selectedOptions: string[];
}

export const MultiSelect = ({
  onChange,
  options,
  selectedOptions
}: Props): JSX.Element => {
  const handleSelectingValue =
    (value: string) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.checked) {
        onChange([...selectedOptions, value]);
      } else {
        onChange(selectedOptions.filter((el: string) => el !== value));
      }
    };

  return (
    <StyledContainer>
      {options.map((option: Option) => (
        <StyledRow key={option.value}>
          <StyledCheckbox
            checked={selectedOptions.includes(option.value)}
            onChange={handleSelectingValue(option.value)}
            type="checkbox"
          />
          <StyledLabel htmlFor={option.label}>{option.label}</StyledLabel>
        </StyledRow>
      ))}
    </StyledContainer>
  );
};
