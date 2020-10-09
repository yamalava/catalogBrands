import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import client from './apollo/apolloConnect';
import Routes from './routes/Routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
