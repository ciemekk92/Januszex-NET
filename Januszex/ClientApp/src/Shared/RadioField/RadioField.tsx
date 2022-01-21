import React from 'react';
import {
  StyledCheck,
  StyledContainer,
  StyledLabel,
  StyledRadio
} from './RadioField.styled';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioField = ({
  id,
  label,
  checked,
  onChange
}: Props): JSX.Element => {
  return (
    <StyledContainer>
      <StyledRadio type="radio" id={id} checked={checked} onChange={onChange} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledCheck />
    </StyledContainer>
  );
};
