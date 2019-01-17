const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { AuthenticationError } = require("apollo-server-koa")

module.exports = {
  Query: {
    history: async (_, { after }, { user }) => {
      // auto-incrementing id means id's are ordered by time
      return await user
        .$relatedQuery("posts")
        .where("id", "<", after || process.env.POSTGRES_MAX_INT)
        .orderBy("id", "desc")
        .limit(process.env.PAGE_LIMIT)
    }
  },
  Mutation: {
    signIn: async (_, { name, password }) => {
      let user

      // first, see if user already exists
      if (await User.query().where({ name })) {
        // login
        // TODO: does graphql filter unlisted properties?
        user = await User.query().where({ name, password })
      } else {
        // sign up
        user = await User.query()
          .insert({ name, password })
          .returning("*")
      }

      if (!user) throw new AuthenticationError("Incorrect password")
      return { token: jwt.sign(user, process.env.JWT_SECRET) }
    }
  }
}
