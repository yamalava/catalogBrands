import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import client from './apollo/apolloConnect';
import Routes from './routes/Routes';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}

export default App;
