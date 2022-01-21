import styled from 'styled-components';
import { StyledDeleteButton } from '../../ManagementPanel.styled';

export const StyledBannedWordButton = styled(StyledDeleteButton)`
  margin-top: 0.5rem;
`;

export const StyledWordPanel = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primary};
  padding: 1rem 2rem;
  border-radius: 0.3rem;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  & svg {
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-0.3rem);
    }

    &:not(:last-child) {
      margin-right: 1.5rem;
    }

    & path {
      fill: ${(props) => props.theme.accent};
    }
  }
`;
