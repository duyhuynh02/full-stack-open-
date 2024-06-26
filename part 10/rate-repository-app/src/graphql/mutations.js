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

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput) {
        createUser(user: $user) {
            id 
            reviewCount 
            username 
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`