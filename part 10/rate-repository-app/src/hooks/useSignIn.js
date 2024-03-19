import { useMutation } from "@apollo/client";
import { GET_TOKEN } from "../graphql/mutations"

const useSignIn = () => {
    const [mutate, result] = useMutation(GET_TOKEN);
  
    const signIn = async ({ username, password }) => {
      const { data, error } = await mutate({
        variables: { username, password },
      }); 
      
      return { data, error };
    };
  
    return [signIn, result];
};

export default useSignIn; 