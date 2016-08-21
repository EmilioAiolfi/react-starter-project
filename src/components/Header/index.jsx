// Libs
import React, { PropTypes } from 'react';

// Style
import style from './style.scss';

const Header = React.createClass({
  displayName: 'Header',

  propTypes: {
    children: PropTypes.node
  },

  render() {
    return (
      <header className={ style.header }>
        { this.props.children }
      </header>
    );
  }
});

export default Header;
