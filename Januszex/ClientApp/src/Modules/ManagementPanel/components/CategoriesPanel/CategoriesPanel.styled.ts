import styled from 'styled-components';
import { StyledDeleteButton } from '../../ManagementPanel.styled';

interface ListItemProps {
  readonly depth?: number;
}

export const StyledCategoriesContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const StyledCategoryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.disabled};
  }
`;

export const StyledCategoryButton = styled(StyledDeleteButton)`
  margin-top: 0.5rem;
`;

export const StyledUnorderedList = styled.ul``;

export const StyledListItem = styled.li<ListItemProps>`
  margin-left: ${(props) => ((props.depth ? props.depth : 0) + 1) * 2}rem;

  & svg {
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      transform: translateY(-0.2rem);
    }

    & path {
      fill: ${(props) => props.theme.accent};
    }
  }

  &::marker {
    color: ${(props) => props.theme.accent};
    font-size: 2rem;
  }
`;
