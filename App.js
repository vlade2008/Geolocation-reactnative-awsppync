import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from 'react-apollo';
// import * as AWS from 'aws-sdk';
import awsconfig from './aws-exports';
import Route from './src/route'




import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native';
import AWSConfig from './aws-exports'
import AppSync from './AppSync'


Amplify.configure(AWSConfig)


//redux

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import AppReducer from './src/reducers/'

const store = createStore(AppReducer, applyMiddleware(logger));



// console.disableYellowBox = true;

  // const client = new AWSAppSyncClient({
  //   url: AppSync.graphqlEndpoint,
  //   region: AppSync.region,
  //   auth: {
  //     type: 'AMAZON_COGNITO_USER_POOLS',
  //     jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  //   }
  // });

  const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {type: AppSync.authenticationType, apiKey: AppSync.apiKey}
  });


  const App = () => (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Rehydrated>
            <Route />
        </Rehydrated>
      </Provider>
    </ApolloProvider>
  );

  export default App
