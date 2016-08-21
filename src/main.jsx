// Libs
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

// Components
import App from './containers/App';
import Home from './containers/home';
import About from './containers/about';

render((
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRedirect to="/" />
      <IndexRoute component={ Home } />
      <Route path="/about" component={ About } />
    </Route>
  </Router>

), document.getElementById('app'));
