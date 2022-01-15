import styled from 'styled-components';

export const StyledTileContainer = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 23%;
  border-radius: 0.8rem;
  background-color: ${(props) => props.theme.secondary};
  margin: 1rem;
  padding: 1rem;
  transition: all 0.6s ease;
  cursor: pointer;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-0.5rem);
  }
`;

export const StyledTileRow = styled.div`
  display: flex;
`;

export const StyledImage = styled.div`
  width: 100%;
  height: 20rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
  }
`;

export const TileLabel = styled.p`
  margin-right: 0.5rem;
  font-weight: 600;
`;

export const TileValue = styled.p``;
