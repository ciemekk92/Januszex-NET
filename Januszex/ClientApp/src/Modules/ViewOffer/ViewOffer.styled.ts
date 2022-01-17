import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5rem;
`;

export const StyledContentContainer = styled.div`
  font-size: 1.6rem;
  padding: 1rem;
`;

export const StyledImageContainer = styled.div`
  width: 60%;
  align-self: center;

  & img {
    max-width: 100%;
    max-height: 100%;
  }
`;
