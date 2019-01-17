const { gql } = require("apollo-server-koa")

module.exports = gql`
  type Post {
    id: ID!
    type: String!
    topic: String!
    creator: String!
    body: String!
  }

  type Token {
    token: String! # JWT token containing relevant user info
  }

  extend type Query {
    history(after: ID): [Posts!]!
  }

  extend type Mutation {
    signIn(name: String!, password: String!): Token!
  }
`
