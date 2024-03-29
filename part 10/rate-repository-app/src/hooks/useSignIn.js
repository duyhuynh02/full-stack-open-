import { useApolloClient, useMutation } from "@apollo/client";
import { GET_TOKEN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);
    const authStorage = useAuthStorage();
    const client = useApolloClient(); 

    const signIn = async ({ username, password }) => {
      const { data, error } = await mutate({
        variables: { username, password },
      }); 

      await authStorage.setAccessToken(data.authenticate.accessToken);
      client.resetStore();

      return { data, error };
    };

  
    return [signIn, result];
};

export default useSignIn; 