import { useMutation } from "@apollo/client";
import { GET_TOKEN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { ApolloClient } from '@apollo/client';


const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(GET_TOKEN);
    
    const signIn = async ({ username, password }) => {
      const { data, error } = await mutate({
        variables: { username, password },
      }); 

      await authStorage.setAccessToken(data.authenticate.accessToken);
      ApolloClient.resetStore();

      return { data, error };
    };
  
    return [signIn, result];
};

export default useSignIn; 