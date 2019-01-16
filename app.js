require("dotenv").config()
require("express-async-errors")

const express = require("express")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)

const app = express()

app.listen(process.env.PORT, err => {
  if (err) console.error(err)
})
