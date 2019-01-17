const { Post } = require("../models")

module.exports = {
  Query: {
    post: async (_, { id }) => {
      return await Post.query().findById(id)
    },
    posts: async (_, { topic, type, after }, { user }) => {
      return await Post.query()
        .where({ topic, type })
        .andWhere("id", "<", after || process.env.POSTGRES_MAX_INT)
        .andWhere("score", ">=", user.score)
        .orderBy("id", "desc")
        .limit(process.env.PAGE_LIMIT)
    }
  },
  Mutation: {
    post: async (_, { topic, type, body }, { user }) => {
      return await Post.query()
        .insert({ topic, type, body, creator: user.name })
        .returning("*")
    }
  }
}
