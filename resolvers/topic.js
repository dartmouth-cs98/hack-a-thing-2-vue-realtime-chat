const { Topic } = require("../models")

module.exports = {
  Query: {
    topics: async (_, { parent }) => {
      return await Topic.query().where({ parent })
    }
  },
  Mutation: {
    createTopic: async (_, { name, parent }) => {
      return await Topic.query().insert({ name, parent })
    }
  }
}
