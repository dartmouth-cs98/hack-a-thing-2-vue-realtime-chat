const mongoose = require("mongoose")

// nested topics, e.g. A/B/C
// client has to pass in actual array of strings containing the full path
const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    set: name => name.join("/"),
    match: [
      /^(\w+\/)*\w{1,20}$/,
      "Topic name can only contain alphanumeric characters + underscores, and can be up to" +
        " 20 letters long"
    ],
    unique: true
  }
})

topicSchema.pre("save", async function() {
  if (
    this.isModified("name") &&
    !(await this.findOne({
      name: this.name
        .split("/")
        .slice(0, -1)
        .join("/")
    }).exec())
  )
    throw new Error("Invalid topic name")
})

// TODO: not sure if getter affects validators
topicSchema.methods.convert = function() {
  this.name = this.name.split("/")
}

module.exports = mongoose.model("Topic", topicSchema)
