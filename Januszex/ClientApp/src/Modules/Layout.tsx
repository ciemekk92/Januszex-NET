import React from 'react';
import { Container } from 'reactstrap';

import { NavMenu } from 'Modules/NavMenu';

export class Layout extends React.Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
