import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
  query {
    me {
      id 
      username
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
    }
  }
`;