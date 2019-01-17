const { gql } = require("apollo-server-koa")

module.exports = gql`
  enum PostType {
    post
    comment
  }

  type Post {
    id: ID!
    type: PostType!
    topic: String!
    creator: String!
    body: String!
  }

  type Token {
    token: String! # JWT token containing relevant user info
  }

  extend type Query {
    history(after: ID): [Post!]!
  }

  extend type Mutation {
    signIn(name: String!, password: String!): Token!
  }
`
