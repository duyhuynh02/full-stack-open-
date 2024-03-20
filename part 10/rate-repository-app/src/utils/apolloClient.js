import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'; 
import AuthStorage from './authStorage';
import { setContext } from '@apollo/client/link/context';

const { apolloUri } = Constants.expoConfig.extra; 

const httpLink = createHttpLink({
  uri: apolloUri,
})

const createApolloClient = () => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await AuthStorage.getAccessToken(); 
      return {
        headers: {
          ...headers, 
          authorization: accessToken ? `Bearer ${accessToken}` : '', 
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;