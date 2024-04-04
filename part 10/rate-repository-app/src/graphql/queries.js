import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy, 
                          $orderDirection: OrderDirection
                           $searchKeyword: String
                        ) {
    repositories(searchKeyword: $searchKeyword, 
                orderBy: $orderBy, 
                orderDirection: $orderDirection) {
      edges {
        node {
          fullName 
          forksCount 
          description
          id
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id 
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt 
            text 
            repositoryId
            rating
            repository {
              name
            }
          }
        }
      }
    }
  }
`; 

export const GET_REPOSITORY_BY_ID = gql`
  query getById($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id 
      fullName 
      url
      description
      ownerAvatarUrl
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      reviews {
        edges {
          node {
            id 
            text 
            rating 
            createdAt 
            user {
              id 
              username
            }
          }
        }
      }
    }
  }
`;