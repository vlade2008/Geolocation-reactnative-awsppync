import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from 'react-apollo';
// import * as AWS from 'aws-sdk';
import awsconfig from './aws-exports';
import Route from './src/route'




console.disableYellowBox = true;

const client = new AWSAppSyncClient({
  url: awsconfig.graphqlEndpoint,
  region: awsconfig.region,
  auth: {type: AUTH_TYPE.API_KEY, apiKey: awsconfig.apiKey}
});



const App = () => (
<ApolloProvider client={client}>
    <Rehydrated>
        <Route />
    </Rehydrated>
</ApolloProvider>
);

export default App;
