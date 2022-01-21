import React from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from 'Stores/store';
import { Container } from 'Hooks/useLoading';
import { BannedWordsPanel, CategoriesPanel, UsersPanel } from './components';

import {
  StyledBannedWordsPanel,
  StyledCategoriesPanel,
  StyledPageWrapper,
  StyledUsersPanel
} from './ManagementPanel.styled';

export const ManagementPanel = (): JSX.Element => {
  const areUsersLoading = useSelector((state: ApplicationState) =>
    state.user ? state.user.isLoading : false
  );

  const areCategoriesLoading = useSelector((state: ApplicationState) =>
    state.category ? state.category.isLoading : false
  );

  const isLoading = areUsersLoading || areCategoriesLoading;

  return (
    <StyledPageWrapper>
      <Container isLoading={isLoading} />
      <StyledUsersPanel>
        <UsersPanel />
      </StyledUsersPanel>
      <StyledCategoriesPanel>
        <CategoriesPanel />
      </StyledCategoriesPanel>
      <StyledBannedWordsPanel>
        <BannedWordsPanel />
      </StyledBannedWordsPanel>
    </StyledPageWrapper>
  );
};
