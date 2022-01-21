import styled from 'styled-components';

interface ListImageProps {
  readonly selected?: boolean;
}

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;

  & h4 {
    margin-bottom: 3rem;
  }

  & img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const StyledPanelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.secondary};
  min-height: 75vh;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
`;

export const StyledDetailsPanel = styled(StyledPanel)`
  width: 35%;
`;

export const StyledRow = styled.div`
  display: flex;
`;

export const StyledLabel = styled.strong`
  font-size: 1.8rem;
  margin-right: 0.5rem;
`;

export const StyledValue = styled.p`
  font-size: 1.8rem;
`;

export const StyledImagesPanel = styled(StyledPanel)`
  width: 60%;
  align-items: center;
  justify-content: space-between;
`;

export const StyledMainImage = styled.div`
  width: 95%;
  height: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const StyledContentContainer = styled.div`
  font-size: 1.6rem;
  padding: 1rem;
`;

export const StyledImagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  padding: 1rem 2rem 0;
`;

export const StyledListImage = styled.div<ListImageProps>`
  width: 15rem;
  height: 10rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primary};
  transition: all 0.6s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.3rem);
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
