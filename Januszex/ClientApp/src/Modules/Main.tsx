import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from 'Themes';
import { MainLayout } from './MainLayout';

export const Main = (): JSX.Element => {
  const [theme, setTheme] = React.useState<string>('dark');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <MainLayout />
    </ThemeProvider>
  );
};
