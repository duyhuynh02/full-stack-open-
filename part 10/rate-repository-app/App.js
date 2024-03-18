import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
// import Constants from 'expo-constants'; 

const apolloClient = createApolloClient();

const App = () => {

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;