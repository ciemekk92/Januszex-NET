import styled from 'styled-components';

export const StyledCheck = styled.div`
  display: block;
  position: absolute;
  height: 20px;
  width: 20px;
  border: 3px solid #aaa;
  transition: border 0.25s ease;
  z-index: 5;
  left: 1rem;
  border-radius: 100%;

  &::before {
    display: block;
    position: absolute;
    content: '';
    border-radius: 100%;
    height: 8px;
    width: 8px;
    top: 3px;
    left: 3px;
    margin: auto;
    transition: background 0.25s ease;
  }
`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;

  &:hover label {
    color: ${(props) => props.theme.text};
  }

  &:hover ${StyledCheck} {
    border: 3px solid #ffffff;
  }
`;

export const StyledRadio = styled.input`
  position: absolute;
  visibility: hidden;

  &:checked ~ ${StyledCheck} {
    border: 3px solid ${(props) => props.theme.accent};
  }

  &:checked ~ ${StyledCheck}::before {
    background: ${(props) => props.theme.accent};
  }

  &:checked ~ label {
    color: ${(props) => props.theme.accent};
  }
`;

export const StyledLabel = styled.label`
  display: block;
  position: relative;
  transition: all 0.4s ease;
  height: 3rem;
  z-index: 9;
  margin: 0.5rem 2rem 0 auto;
`;
