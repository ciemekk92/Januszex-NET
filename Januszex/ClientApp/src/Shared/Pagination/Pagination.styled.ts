import styled from 'styled-components';

interface ButtonProps {
  readonly disabled?: boolean;
  readonly selected?: boolean;
}

export const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
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
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.primary};
  margin: 0 0.5rem;
  cursor: pointer;
`;

export const StyledArrowButton = styled.div`
  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-right: 0.36rem solid rgba(255, 255, 255, 0.87);
    border-top: 0.36rem solid rgba(255, 255, 255, 0.87);
  }
`;

export const StyledPreviousButton = styled(StyledArrowButton)<ButtonProps>`
  transform: translateY(-0.35rem) rotate(-135deg);
`;

export const StyledNextButton = styled(StyledArrowButton)<ButtonProps>`
  transform: rotate(45deg);
`;

export const StyledDotsButton = styled.div``;
