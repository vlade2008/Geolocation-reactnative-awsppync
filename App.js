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


// console.disableYellowBox = true;

  const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {
      type: 'AMAZON_COGNITO_USER_POOLS',
      jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    }
  });



  const App = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <Route />
        </Rehydrated>
    </ApolloProvider>
  );

  export default App
