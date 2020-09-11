import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../page/Home';
import Auth from '../page/Auth';
import Registration from '../page/Registration';
import CurrentStamp from '../page/CurrentStamp';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/registration' exact component={Registration} />
        <Route path='/stamp/:stampID' component={CurrentStamp} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
