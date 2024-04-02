import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const useCreateUser = () => {
    const [mutate] = useMutation(CREATE_USER);
    const navigate = useNavigate();

    const createUser = async ({ username, password }) => {
      const { data, error } = await mutate({
        variables: { user: { username, password } },
      }); 

      if (data) {
        navigate('/');
      }

      return { data, error };
    };

    return [createUser];
};

export default useCreateUser; 