import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from '../page/Home';
import Auth from '../page/Auth';
import Registration from '../page/Registration';
import CurrentStamp from '../page/CurrentStamp';
import ErrorPage from '../page/ErrorPage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/registration' exact component={Registration} />
        <Route path='/stamp/:stampID' component={CurrentStamp} />
        <Route path='/404' exact component={ErrorPage} />
        <Redirect to='/404' />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
