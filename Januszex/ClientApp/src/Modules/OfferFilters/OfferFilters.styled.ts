import styled from 'styled-components';

export const StyledFiltersWrapper = styled.div`
  display: flex;
  position: relative;

  & svg {
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-0.5rem);
    }

    & path {
      fill: ${(props) => props.theme.accent};
    }
  }
`;

export const StyledFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 2rem;
  border-radius: 0.5rem;
  top: 5rem;
  left: 5rem;
  background-color: ${(props) => props.theme.secondary};
  border: 2px solid ${(props) => props.theme.accent};
  z-index: 100;
`;

export const StyledFiltersRow = styled.div`
  display: flex;

  & button {
    margin-top: 1rem;
  }
`;

export const StyledFiltersColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  max-height: 40rem;
  overflow-y: auto;

  & label {
    font-size: 1.4rem;
  }
`;
