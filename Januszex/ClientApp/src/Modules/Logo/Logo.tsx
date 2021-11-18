import React from 'react';
import logo from 'Assets/januszex.png';

import { StyledLogo } from './Logo.styled';

export const Logo = (): JSX.Element => {
  return <StyledLogo src={logo} alt="Januszex" />;
};
