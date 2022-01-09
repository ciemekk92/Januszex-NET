import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4rem;
`;

export const StyledRow = styled.div`
  display: flex;

  & h5 {
    margin-top: 2rem;
  }
`;

export const StyledColumn = styled.div`
  padding: 1rem;
  display: flex;
  width: 50%;
  height: max-content;
  flex-direction: column;
`;
