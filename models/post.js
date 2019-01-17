const { Model } = require("objection")
const { post } = require("axios")

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
    const resp = await post(process.env.RECAPTCHA_ENDPOINT, {
      secret: process.env.RECAPTCHA_V3_PRIVATE,
      response: this.token,
      remoteip: this.ip
    })

    if (!resp.data.success) throw new Error("Invalid recaptcha token")
    this.token_score = resp.data.score
    delete this.token
    delete this.ip
  }
}

module.exports = Post
