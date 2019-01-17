const { gql } = require("apollo-server-koa")

module.exports = gql`
  type PostAction {
    action: String!
    post: Post!
  }

  extend type Query {
    post(id: ID!): Post! # fetch a *post* by id
    posts(topic: [String]!, type: String!, after: ID): [Post!]! # fetch either posts or topics
  }

  extend type Mutation {
    post(topic: [String]!, type: String!, body: String!): Post!
  }

  extend type Subscription {
    postSubscribe: PostAction
  }
`
