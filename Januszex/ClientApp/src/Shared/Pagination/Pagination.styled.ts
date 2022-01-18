import styled from 'styled-components';

interface ButtonProps {
  readonly disabled?: boolean;
  readonly selected?: boolean;
}

export const StyledRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const StyledPaginationContainer = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  width: 60rem;
  font-size: 2rem;
  background-color: ${(props) => props.theme.secondary};
`;

export const StyledPaginationLabel = styled.div``;
export const StyledPaginationButtonsContainer = styled.div`
  padding: 1rem;
  display: flex;
  margin-left: 3rem;
`;

export const StyledPaginationButton = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.primary};
  margin: 0 0.5rem;
  cursor: pointer;
`;

export const StyledArrowButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  margin-top: 0.4rem;

  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-right: 0.36rem solid ${(props) => props.theme.textTransparent};
    border-top: 0.36rem solid ${(props) => props.theme.textTransparent};
  }
`;

export const StyledPreviousButton = styled(StyledArrowButton)<ButtonProps>`
  transform: translateY(-0.35rem) rotate(-135deg);
`;

export const StyledNextButton = styled(StyledArrowButton)<ButtonProps>`
  transform: rotate(45deg);
`;

export const StyledDotsButton = styled.div``;
