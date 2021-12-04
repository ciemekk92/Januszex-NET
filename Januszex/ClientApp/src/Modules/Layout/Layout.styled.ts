import styled from 'styled-components';

export const StyledContainer = styled.div`
  background-color: ${(props) => props.theme.primary};
  min-height: 100vh;

  & .border-bottom {
    border-bottom: none !important;
  }
`;
