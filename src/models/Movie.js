const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: [3, "Movie should be at least 3 characters!"],
    match: [/^[a-zA-Z0-9\s]+$/, "Is not match!"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required!"],
    match: /^[a-zA-Z0-9\s]+$/,
  },
  director: {
    type: String,
    required: [true, "Director is required!"],
    match: /^[a-zA-Z0-9\s]+$/,
  },
  year: {
    type: Number,
    required: [true, "Year is required!"],
    min: 1900,
    max: 2030,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000,
    match: /^[a-zA-Z0-9 ]+$/,
  },
  image: {
    type: String,
    required: true,
    match: /^https?:\/\//,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  casts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cast",
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
