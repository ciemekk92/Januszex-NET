import React from 'react';
import { NavMenu } from 'Modules/NavMenu';

import { StyledContainer } from './Layout.styled';

export class Layout extends React.Component {
  static displayName = Layout.name;

  render() {
    return (
      <StyledContainer>
        <NavMenu />
        <div>{this.props.children}</div>
      </StyledContainer>
    );
  }
}
