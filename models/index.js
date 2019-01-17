const { Model } = require("objection")
const knex = require("knex")
const knexfile = require("../knexfile")

const User = require("./user")
const Topic = require("./topic")
const Post = require("./post")

Model.knex(knex(knexfile)) // yo dawg

module.exports = { User, Topic, Post }
