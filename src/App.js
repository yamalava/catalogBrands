import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './page/Home';
// import { PrivateRoute } from './PrivateRoute';
import Auth from './page/Auth';
import Registration from './page/Registration';
import './App.css';

const client = new ApolloClient({
  uri: `http://localhost:3005/graphql`,
  cache: new InMemoryCache()
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/registration" exact component={Registration} />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;