import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 80%;
  height: 4.8rem;
  font-size: 3rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #ccc;
  }
`;
