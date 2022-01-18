import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { Layout } from 'Modules/Layout/Layout';
import { Home } from 'Modules/Home';
import ApiAuthorizationRoutes from 'Modules/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from 'Modules/api-authorization/ApiAuthorizationConstants';
import authService from './Modules/api-authorization/AuthorizeService';

import { darkTheme, GlobalStyles, lightTheme } from 'Themes';
import { Routes } from './Routes/Routes';
import { actionCreators } from './Stores/User';
import { ApplicationState } from './Stores/store';
import './custom.css';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);

  const populateAuthenticationState = async () => {
    const isAuthenticated = await authService.isAuthenticated();
    setAuthenticated(isAuthenticated);
  };

  const onAuthenticationChange = async () => {
    setAuthenticated(false);
    await populateAuthenticationState();
  };

  React.useEffect(() => {
    const subscription = authService.subscribe(() => onAuthenticationChange());
    populateAuthenticationState();

    return () => {
      authService.unsubscribe(subscription);
    };
  }, []);

  React.useEffect(() => {
    const loadCurrentUser = async () =>
      await dispatch(actionCreators.getCurrentUser());

    loadCurrentUser();
  }, [authenticated]);

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
      <Layout selectedTheme={getSelectedTheme()}>
        <Route exact path="/" component={Home} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Routes isAuthenticated={Boolean(currentUser?.user.id)} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
