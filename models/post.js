const { Model } = require("objection")
const recaptcha = require("../lib/recaptcha")

class Post extends Model {
  static get tableName() {
    return "posts"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type", "topic", "creator", "body"],
      properties: {
        id: { type: "integer", min: 1 },
        type: { type: "string" },
        topic: { type: "string" },
        creator: { type: "string" },
        body: { type: "string" }
      }
    }
  }

  async $beforeValidate() {
    this.body = this.body
      .trim()
      .replace(/\s/, " ") // strip tabs and newlines
      .replace(/ {2,}/g, " ") // strip multi-space

    // check body lengths depending on the type of post
    if (this.type == "post") {
      if (this.body.length > process.env.VUE_APP_MAX_POST_LENGTH)
        throw new Error("Post character limit")
    } else {
      if (this.body.length > process.env.VUE_APP_MAX_COMMENT_LENGTH)
        throw new Error("Comment character limit")
    }
  }

  // fetch reCAPTCHA v3 score from Google
  async $afterValidate() {
    await recaptcha.score(this)
  }
}

module.exports = Post
