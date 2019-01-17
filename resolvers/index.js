const userResolver = require("./user")
const topicResolver = require("./topic")
const postResolver = require("./post")

module.exports = [userResolver, topicResolver, postResolver]
