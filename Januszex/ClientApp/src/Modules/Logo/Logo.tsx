import React from 'react';
import logo from 'Assets/januszex.png';
import logo_dark from 'Assets/januszex_dark.png';

import { StyledLogo } from './Logo.styled';

interface Props {
  selectedTheme: string;
}

export const Logo = ({ selectedTheme }: Props): JSX.Element => {
  return (
    <StyledLogo
      src={selectedTheme === 'dark' ? logo_dark : logo}
      alt="Januszex"
    />
  );
};
