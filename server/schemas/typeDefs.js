const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    blog: [Blog]!
  }
  type Blog {
    _id: ID
    blogText: String
    blogAuthor: String
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
    blogs(username: String): [Blog]
    blog(BlogId: ID!): Blog
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addBlog(blogText: String!, blogAuthor: String!): Blog
    addComment(
      blogId: ID!
      commentText: String!
      commentAuthor: String!
    ): Blog
    removeBlog(blogId: ID!): Blog
    removeComment(blogId: ID!, commentId: ID!): Blog
  }
`;

module.exports = typeDefs;
