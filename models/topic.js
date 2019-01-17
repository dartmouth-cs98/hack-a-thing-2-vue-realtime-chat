const { Model } = require("objection")

class Topic extends Model {
  static get tableName() {
    return "topics"
  }

  static get idColumn() {
    return "name"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: process.env.VUE_APP_MAX_TOPIC_LENGTH,
          pattern: "^\\w+$"
        },
        parent: {
          type: "string"
        }
      },
      additionalProperties: false
    }
  }

  $afterValidate() {
    this.name = `${this.parent}/${this.name}`
  }

  static get relationshipMapping() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: require("./post"),
        join: {
          from: "topics.name",
          to: "posts.topic"
        }
      },
      children: {
        relation: Model.HasManyRelation,
        modelClass: Topic,
        join: {
          from: "topics.name",
          to: "topics.parent"
        }
      }
    }
  }
}

module.exports = Topic
