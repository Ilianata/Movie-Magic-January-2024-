const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, "Invalid email Address!"],
    minLength: [10, "Email should be at least 10 characters!"],
  },
  password: {
    type: String,
    match: [/^[a-zA-Z0-9]+$/, "Password should be Alphanumeric"],
    minLength: [6, "Password should be at least 6 characters!"],
    required: true,
  },
});

userSchema.virtual("rePassword").set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError("Password missmatch!");
  }
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
