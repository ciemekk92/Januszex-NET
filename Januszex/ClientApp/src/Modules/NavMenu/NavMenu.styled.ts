import styled from 'styled-components';

export const NavItem = styled.li`
  font-family: 'Lato', sans-serif;
  font-size: 1.8rem;
  transition: all 0.5s ease;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    transform: translateY(0.2rem);
  }
`;
