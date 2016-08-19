import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../screens/app/index';
import Start from '../screens/start/index';
import About from '../screens/about/index';

export default () => (
  <Route component={ App }>
    <IndexRoute component={ Start } />
    <Route component={ About } path="/about/" />
  </Route>
);
