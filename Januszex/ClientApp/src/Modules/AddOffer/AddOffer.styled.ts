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

  & h5 {
    margin-bottom: 2rem;
  }
`;

export const StyledImagesRow = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const StyledImageContainer = styled.div`
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid ${(props) => props.theme.accent};

  &:not(:first-child) {
    margin-left: 2rem;
  }

  & img {
    max-width: 100%;
    max-height: 100%;
  }
`;
