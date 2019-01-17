const { Model } = require("objection")
const startCase = require("lodash/startCase")
const recaptcha = require("../lib/recaptcha")

class User extends Model {
  static get tableName() {
    return "users"
  }

  static get idColumn() {
    return "name"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "password"],
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: process.env.VUE_APP_MAX_USERNAME_LENGTH,
          pattern: "^[a-zA-Z ]$"
        },
        password: {
          type: "string",
          minLength: 1
        }
      }
    }
  }

  async $afterValidate() {
    this.name = `${startCase(this.name.toLowerCase())}#${(
      "0000" +
      (parseInt(this.password, 16) % 10000)
    ).slice(-4)}`

    await recaptcha.score(this)
  }

  static get relationshipMapping() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: require("./post"),
        join: {
          from: "users.name",
          to: "posts.creator"
        }
      }
    }
  }
}

module.exports = User
