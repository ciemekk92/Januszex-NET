import styled from 'styled-components';

export const StyledWrapper = styled.div`
  & h5 {
    margin-left: 5rem;
  }
`;

export const StyledOffersContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 2rem 5rem;
`;

export const StyledOfferPanel = styled.div`
  display: flex;
  width: 48%;
  height: 15rem;
  background-color: ${(props) => props.theme.secondary};
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const StyledImageContainer = styled.div`
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s ease;

  &:hover {
    transform: translateY(-0.3rem);
  }

  & img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
  }
`;

export const StyledTextDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
`;

export const StyledTextRow = styled.div`
  display: flex;
`;

export const StyledLabel = styled.strong`
  font-size: 1.2rem;
  margin-right: 0.4rem;
`;

export const StyledValue = styled.p`
  font-size: 1.2rem;
`;

export const StyledCategoriesRow = styled(StyledTextRow)`
  margin-top: auto;
`;

export const StyledCategoryChip = styled.div`
  background-color: ${(props) => props.theme.primary};
  border-radius: 0.3rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.3rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: auto;
`;

export const StyledButton = styled.div`
  background-color: ${(props) => props.theme.primary};
  height: 5.6rem;
  width: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.3rem;
  transition: all 0.6s ease;

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.4);
    background-color: ${(props) => props.theme.disabled};
  }

  & path {
    stroke: ${(props) => props.theme.text};
    fill: ${(props) => props.theme.text};
  }
`;
