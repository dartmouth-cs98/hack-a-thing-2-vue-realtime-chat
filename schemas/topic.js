const { gql } = require("apollo-server-koa")

module.exports = gql`
  type Topic {
    name: [String]!
  }

  extend type Query {
    topics(parent: String, after: String): [Topic!]!
  }

  extend type Mutation {
    createTopic(name: String!, parent: String!): Topic!
  }
`
