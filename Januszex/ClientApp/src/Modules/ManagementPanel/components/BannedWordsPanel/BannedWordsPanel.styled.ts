import styled from 'styled-components';
import { StyledDeleteButton } from '../../ManagementPanel.styled';

export const StyledBannedWordButton = styled(StyledDeleteButton)`
  margin-top: 0.5rem;
`;

export const StyledWordPanel = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.secondary};
`;
