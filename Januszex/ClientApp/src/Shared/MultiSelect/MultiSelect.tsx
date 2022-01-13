import React from 'react';
import { OptionNode } from 'Types/utils';

import {
  StyledCheckbox,
  StyledContainer,
  StyledLabel,
  StyledRow
} from './MultiSelect.styled';

interface Props {
  onChange: (values: string[]) => void;
  options: OptionNode[];
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

  const renderChildren = (children?: OptionNode[]) => {
    if (children) {
      return children.map((option: OptionNode) => (
        <React.Fragment key={option.value}>
          <StyledRow depth={option.depth}>
            <StyledCheckbox
              checked={selectedOptions.includes(option.value)}
              onChange={handleSelectingValue(option.value)}
              type="checkbox"
            />
            <StyledLabel htmlFor={option.label}>{option.label}</StyledLabel>
          </StyledRow>
          {renderChildren(option.children)}
        </React.Fragment>
      ));
    }

    return;
  };

  return <StyledContainer>{renderChildren(options)}</StyledContainer>;
};
