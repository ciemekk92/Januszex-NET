import styled from 'styled-components';

interface RowProps {
  readonly depth: number;
}

interface CheckboxProps {
  readonly disabled: boolean;
}

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledRow = styled.div<RowProps>`
  display: flex;
  margin-left: ${(props) => (props.depth + 1) * 2}rem;
`;

export const StyledCheckbox = styled.input<CheckboxProps>`
  margin: 0.6rem 0.6rem 0.6rem;

  &[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: solid 1px #cccccc;
    margin-right: 8px;
    position: relative;

    &:checked::before {
      content: '';
      width: 14px;
      height: 14px;
      background-color: ${(props) =>
        props.disabled ? '#666' : props.theme.accent};
      position: absolute;
      top: 2px;
      left: 2px;
    }
  }
`;

export const StyledLabel = styled.label`
  font-size: 1.6rem;
  margin: 0.3rem 0 0 0;
`;
