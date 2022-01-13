import styled from 'styled-components';

export const StyledImageInput = styled.input.attrs(() => ({
  type: 'file'
}))`
  display: none;
`;

export const StyledLabel = styled.label`
  width: 12rem;
  text-align: center;
  font-size: 1.6rem;
  border-radius: 5rem;
  background-color: ${(props) => props.theme.accent};
  padding: 0.4rem;
  margin: 2rem 0;
  cursor: pointer;
`;
