import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMyReviews = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }, 
  });

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const reviews = data?.me?.reviews || null; 
  return reviews; 
};

export default useMyReviews;