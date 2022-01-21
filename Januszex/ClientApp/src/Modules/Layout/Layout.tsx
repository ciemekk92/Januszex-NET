import React from 'react';
import { NavMenu } from 'Modules/NavMenu';
import { ICurrentUser } from 'Types/stores';

import { StyledContainer } from './Layout.styled';

interface Props {
  selectedTheme: string;
  currentUser: Nullable<ICurrentUser>;
}

export class Layout extends React.Component<Props> {
  static displayName = Layout.name;

  render() {
    return (
      <StyledContainer>
        <NavMenu
          currentUser={this.props.currentUser}
          selectedTheme={this.props.selectedTheme}
        />
        <div>{this.props.children}</div>
      </StyledContainer>
    );
  }
}
