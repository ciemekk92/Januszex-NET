import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from 'Stores/Offer';
import { KEYBOARD_KEYS } from 'Shared/constants';

import { StyledInput } from './HomePageSearch.styled';
import { useTranslation } from 'react-i18next';

export const HomePageSearch = (): JSX.Element => {
  const [query, setQuery] = React.useState<string>('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleFetchingOffers = (query: string) => {
    dispatch(actionCreators.getOffers({ query }));
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEYBOARD_KEYS.ENTER) {
      await handleFetchingOffers(query);
    }
  };

  return (
    <StyledInput
      placeholder={t('homePage.searchPlaceholder')}
      value={query}
      onChange={onChange}
      onKeyDown={handleSubmit}
    />
  );
};
