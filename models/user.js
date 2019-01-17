const { Model } = require("objection")

class User extends Model {
  static get tableName() {
    return "users"
  }

  static get jsonSchema() {
    return {
      type: "object"
    }
  }

  static get relationshipMapping() {
    return {
      //
    }
  }
}

module.exports = User
