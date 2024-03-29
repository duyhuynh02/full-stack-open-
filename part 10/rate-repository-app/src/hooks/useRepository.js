import { useQuery } from '@apollo/client';

import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = (repoId) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: repoId }, 
  });

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const repository = data?.repository || null; 
  return repository; 
};

export default useRepository;