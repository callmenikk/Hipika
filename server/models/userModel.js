const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const signUpSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    followers: [{ _id: String }],
    following: [{ _id: String }]
  },
  { strict: false, timestamps: true }
)

module.exports = mongoose.model("users", signUpSchema)
