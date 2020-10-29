import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import client from './apollo/apolloConnect';
import Routes from './routes/Routes';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
