import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!, $reviewAuthor: String!) {
    addReview(reviewText: $reviewText, reviewAuthor: $reviewAuthor) {
      _id
      reviewText
      reviewAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $reviewId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      reviewId: $reviewId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      reviewText
      reviewAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
