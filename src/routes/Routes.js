import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { routesLists } from '../initialValue/routesLists';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {Object.keys(routesLists).map((route, index) => (
          <Route
            path={route}
            key={index}
            exact
            component={routesLists[route]}
          />
        ))}
        <Redirect to='/404' />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
