const mongoose = require("mongoose")
const startCase = require("lodash/startCase")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set(name) {
        console.log(`?: ${this.name == "Document"}`)
        console.log(`PASSWORD: ${this.password}`)
        return `${startCase(name.toLowerCase())}#${(
          "0000" +
          (parseInt(this.password, 16) % 10000)
        ).slice(-4)}`
      },
      match: [
        /^[a-zA-Z ]{1,15}#\d{4}$/,
        "Username can only contain alphabets and spaces, and up to 15 letters long"
      ],
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
