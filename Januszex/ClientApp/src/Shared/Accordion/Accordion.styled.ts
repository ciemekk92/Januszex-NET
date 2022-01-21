import styled from 'styled-components';

interface ButtonProps {
  readonly isActive?: boolean;
  readonly isIconRotated: boolean;
}

interface ContentProps {
  readonly heightValue: number;
}

export const StyledWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  font-size: 1.6rem;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.primary};
  padding: 0.6rem;
  border: none;
  outline: none;
  transition: all 0.6s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text};
  font-size: 1.6rem;

  &:focus {
    outline: none;
  }

  & svg {
    transition: all 0.4s ease;
    margin-right: 1rem;
    transform: rotate(${(props) => (props.isIconRotated ? 0 : 90)}deg);

    & path {
      fill: ${(props) => props.theme.accent};
      stroke: ${(props) => props.theme.accent};
    }
  }
`;

export const StyledContent = styled.div<ContentProps>`
  max-height: ${(props) => props.heightValue}px;
  background-color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;
  overflow: hidden;
  transition: max-height 0.4s ease;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledChildContainer = styled.div`
  width: 100%;
`;
