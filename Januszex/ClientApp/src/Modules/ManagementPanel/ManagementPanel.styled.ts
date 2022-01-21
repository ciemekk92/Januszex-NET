import styled from 'styled-components';

export const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 5rem;

  @media only screen and (max-width: 850px) {
    & {
      flex-direction: column;
    }
  } ;
`;

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  padding: 1rem;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 0.4rem;
  height: 85vh;
  overflow-y: auto;

  & h5 {
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 850px) {
    & {
      width: 100%;

      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  } ;
`;

export const StyledUsersPanel = styled(StyledPanel)``;

export const StyledCategoriesPanel = styled(StyledPanel)``;
export const StyledBannedWordsPanel = styled(StyledPanel)``;

export const StyledRow = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & input {
    margin-left: auto;
    width: 70%;
  }
`;

export const StyledLabel = styled.strong`
  font-size: 1.6rem;
  margin-right: 0.5rem;
  align-self: center;
`;

export const StyledValue = styled.p`
  font-size: 1.6rem;
  align-self: center;
  margin: 0;
`;

export const StyledDeleteButton = styled.button`
  margin: 0 auto 1rem;
  padding: 0.5rem 2rem;
  font-size: 1.6rem;
  border-radius: 5rem;
  display: block;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.accent};
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${(props) => props.theme.disabled};
    color: ${(props) => props.theme.text};
    transform: unset;
    box-shadow: none;
  }
`;
