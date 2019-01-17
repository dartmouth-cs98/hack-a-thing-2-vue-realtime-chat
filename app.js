require("dotenv").config()

const Koa = require("koa")
const helmet = require("koa-helmet")
const cors = require("kcors")
const jwt = require("koa-jwt")
const { ApolloServer } = require("apollo-server-koa")
const typeDefs = require("./schemas")
const resolvers = require("./resolvers")

const app = new Koa()
  .use(helmet())
  .use(cors())
  .use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }))

new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => ({ user: ctx.state.user || {} })
}).applyMiddleware({ app })

app.listen(process.env.PORT)
