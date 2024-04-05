import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'; 
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination  } from '@apollo/client/utilities';

const apolloUri = Constants.expoConfig.extra.apollo; 

const httpLink = createHttpLink({
  uri: apolloUri,
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken(); 
      // console.log('hehe: ', accessToken)
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
    cache,
  });
};

export default createApolloClient;