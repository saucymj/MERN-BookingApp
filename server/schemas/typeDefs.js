const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    review: [Review]!
  }
  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    createdAt: String
    comments: [Comment]!
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(ReviewId: ID!): Review
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addReview(reviewText: String!, reviewAuthor: String!): Review
    addComment(
      reviewId: ID!
      commentText: String!
      commentAuthor: String!
    ): Review
    removeReview(reviewId: ID!): Review
    removeComment(reviewId: ID!, commentId: ID!): Review
  }
`;

module.exports = typeDefs;
