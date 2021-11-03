import React from 'react';
import { HashRouter, Route, Router } from 'react-router-dom';

import { history, Routes } from 'Routes';
import { LandingPage } from 'Modules/LandingPage';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';
import { AppHeader, AppMainWindow, AppSidebar } from './components';

export const MainLayout = (): JSX.Element => {
  const [currentUser, setCurrentUser] = React.useState<boolean>(false);

  const handleUserChange = () => setCurrentUser(!currentUser);

  const renderLoggedInView = () => (
    <HashRouter basename={'/'}>
      <Route
        render={(props) => (
          <LayoutWrapper>
            <AppHeader />
            <HorizontalWrapper>
              <AppSidebar />
              <AppMainWindow>
                <Routes {...props} />
              </AppMainWindow>
            </HorizontalWrapper>
          </LayoutWrapper>
        )}
      />
    </HashRouter>
  );

  const renderLoggedOutView = () => (
    <LayoutWrapper>
      <AppHeader />
      <LandingPage handleUserChange={handleUserChange} />
    </LayoutWrapper>
  );

  return (
    <Router history={history}>
      {currentUser ? renderLoggedInView() : renderLoggedOutView()}
    </Router>
  );
};
