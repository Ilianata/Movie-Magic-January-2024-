const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    max: 120,
    min: 1,
  },
  born: {
    type: String,
    required: true,
    minLength: [10, "Should be at least 10 characters!"],
    match: /^[a-zA-Z0-9\s]$/,
  },
  nameInMovie: {
    type: String,
    required: true,
  },
  castImage: {
    type: String,
    required: true,
    match: /^https?:\/\//,
  },
});

const Cast = mongoose.model("Cast", castSchema);

module.exports = Cast;
