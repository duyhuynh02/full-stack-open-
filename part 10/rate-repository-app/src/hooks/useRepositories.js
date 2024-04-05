import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( { orderBy, orderDirection, searchKeyword, first, after } ) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword, first, after}
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage; 

    if (!canFetchMore) {
      return; 
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy, 
        orderDirection, 
        searchKeyword, 
        first, 
      },
    });
  };

  
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const repositories = data?.repositories || []; 


  return { 
    repositories,
    fetchMore: handleFetchMore,  
  };
};

export default useRepositories;