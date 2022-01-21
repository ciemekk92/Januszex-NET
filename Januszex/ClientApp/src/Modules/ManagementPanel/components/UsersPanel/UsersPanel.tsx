import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Heading5 } from 'Shared/Typography';
import { actionCreators } from 'Stores/User';
import { ApplicationState } from 'Stores/store';
import { Accordion } from 'Shared/Accordion/Accordion';
import { IUser } from 'Types/stores';
import {
  StyledDeleteButton,
  StyledLabel,
  StyledRow,
  StyledValue
} from '../../ManagementPanel.styled';
import { Api } from '../../../../Utils/Api';

export const UsersPanel = (): JSX.Element => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const users = useSelector(
    (state: ApplicationState) => (state.user ? state.user.users : []),
    shallowEqual
  );

  const currentUser = useSelector(
    (state: ApplicationState) => (state.user ? state.user.currentUser : null),
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(actionCreators.getUsers());
  }, []);

  const handleDeletingUserFactory = (id: Id) => async () => {
    const result = await Api.delete(`api/User/${id}`);

    if (result.status === 204) {
      dispatch(actionCreators.getUsers());
    }
  };

  const renderTabContent = (user: IUser) => (
    <React.Fragment>
      <StyledRow>
        <StyledLabel>{t('manage.users.id')}</StyledLabel>
        <StyledValue>{user.id}</StyledValue>
      </StyledRow>
      <StyledRow>
        <StyledLabel>{t('manage.users.email')}</StyledLabel>
        <StyledValue>{user.email}</StyledValue>
      </StyledRow>
      <StyledRow>
        <StyledLabel>{t('manage.users.offerCount')}</StyledLabel>
        <StyledValue>{user.offerCount}</StyledValue>
      </StyledRow>
      <StyledDeleteButton
        disabled={(currentUser && currentUser.user.id === user.id) || false}
        onClick={handleDeletingUserFactory(user.id)}
      >
        {t('manage.users.delete')}
      </StyledDeleteButton>
    </React.Fragment>
  );

  const renderUserTab = (user: IUser) => {
    return (
      <Accordion
        key={user.id}
        name={user.userName}
        component={renderTabContent(user)}
      />
    );
  };

  return (
    <React.Fragment>
      <Heading5>{t('manage.users.title')}</Heading5>
      {users.map(renderUserTab)}
    </React.Fragment>
  );
};
