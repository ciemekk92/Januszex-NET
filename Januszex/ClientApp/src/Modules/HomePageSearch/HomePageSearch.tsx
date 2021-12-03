import React from 'react';
import { StyledContainer, StyledInput } from './HomePageSearch.styled';

interface Props {
  handleSearch: (query: string) => void;
}

export const HomePageSearch = ({ handleSearch }: Props): JSX.Element => {
  const [query, setQuery] = React.useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSearch(query);
    }
  };

  return (
    <StyledContainer>
      <StyledInput value={query} onChange={onChange} onKeyDown={handleSubmit} />
    </StyledContainer>
  );
};
