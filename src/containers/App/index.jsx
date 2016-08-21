// Libs
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Components
import Header from '../../components/Header';


const App = React.createClass({
  displayName: 'App',

  propTypes: {
    children: PropTypes.node
  },

  render() {
    return (
      <div className="app">
        <Header>
          <h1>{'React Starter Project'} </h1>
          <li><Link to="/">{'Home'}</Link></li>
          <li><Link to="/about">{'About'}</Link></li>
        </Header>

        <div id="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default App;
