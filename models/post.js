const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true
      },
      score: Number
    },
    topic: {
      type: String, // TODO: adjust type
      required: true
    },
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      set(thread) {
        if (!thread) return this.id
      },
      required: true
    },
    isComment: {
      type: Boolean,
      default: false,
      required: true
    },
    body: {
      type: String,
      set: body =>
        body
          .trim()
          .replace(/\s/, " ") // strip tabs and newlines
          .replace(/ {2,}/g, " "), // strip multi-space
      validate(body) {
        return this.isComment ? body.length < 1000 : body.length < 280
      }
    }
  },
  { timestamps: true }
)

/**
 * Uses:
 * - show new posts for a topic/across topics
 * - search terms (across posts & comments) for a topic/across topics
 * - show comments of a post
 */

postSchema.index({ body: "text" })
postSchema.index({ thread: 1, isComment: -1, createdAt: 1 })

module.exports = mongoose.model("Post", postSchema)
