const { gql } = require("apollo-server-koa")
const userSchema = require("./user")
const topicSchema = require("./topic")
const postSchema = require("./post")

const baseSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

module.exports = [baseSchema, userSchema, topicSchema, postSchema]
