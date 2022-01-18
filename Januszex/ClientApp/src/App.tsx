import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { Layout } from 'Modules/Layout/Layout';
import { Home } from 'Modules/Home';
import ApiAuthorizationRoutes from 'Modules/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from 'Modules/api-authorization/ApiAuthorizationConstants';

import { darkTheme, GlobalStyles, lightTheme } from 'Themes';
import { Routes } from './Routes/Routes';
import { actionCreators } from './Stores/User';
import { ApplicationState } from './Stores/store';
import './custom.css';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const loadCurrentUser = async () =>
      await dispatch(actionCreators.getCurrentUser());

    loadCurrentUser();
  }, []);

  const currentUser = useSelector((state: ApplicationState) =>
    state.user ? state.user.currentUser : null
  );

  const getSelectedTheme = (): string => {
    if (currentUser) {
      if (currentUser.user.darkMode) {
        return 'dark';
      }
    }

    return 'light';
  };

  return (
    <ThemeProvider
      theme={getSelectedTheme() === 'dark' ? darkTheme : lightTheme}
    >
      <GlobalStyles themeType={getSelectedTheme()} />
      <Layout>
        <Route exact path="/" component={Home} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Routes />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
