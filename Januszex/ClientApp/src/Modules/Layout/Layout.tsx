import React from 'react';
import { NavMenu } from 'Modules/NavMenu';

import { StyledContainer } from './Layout.styled';

interface Props {
  selectedTheme: string;
}

export class Layout extends React.Component<Props> {
  static displayName = Layout.name;

  render() {
    return (
      <StyledContainer>
        <NavMenu selectedTheme={this.props.selectedTheme} />
        <div>{this.props.children}</div>
      </StyledContainer>
    );
  }
}
