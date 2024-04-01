import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
    mutation GetToken($username: String!, $password: String!){
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput) {
        createReview(review: $review) {
            id 
            rating 
            repository {
                ownerName 
                name 
            }
            text
            repositoryId
        }
    }
`