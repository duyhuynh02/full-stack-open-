import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const useCreateReview = () => {
    const [mutate] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();

    const createReview = async ({ ownerName, repositoryName, rating, review }) => {
      const { data, error } = await mutate({
        variables: { review: { ownerName, repositoryName, rating, text: review} },
      }); 

      if (data) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }

      return { data, error };
    };

    return [createReview];
};

export default useCreateReview; 