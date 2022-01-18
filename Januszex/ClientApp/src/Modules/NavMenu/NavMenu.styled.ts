import styled from 'styled-components';

export const NavItem = styled.li`
  margin-top: 1rem;
  font-family: 'Lato', sans-serif;
  padding: 0.2rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    transform: translateY(-0.2rem);
    background-color: ${(props) => props.theme.secondary};
  }

  & a {
    color: ${(props) => props.theme.text} !important;
    display: flex;
    flex-direction: column;
    align-items: center;

    & svg {
      margin-bottom: 0.5rem;
    }

    &:hover {
      color: ${(props) => props.theme.text} !important;
    }

    &:focus {
      outline: none;
      color: ${(props) => props.theme.text} !important;
    }
  }

  & path {
    stroke: ${(props) => props.theme.text};
    fill: ${(props) => props.theme.text};
  }
`;
