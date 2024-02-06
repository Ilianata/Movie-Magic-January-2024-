const Movie = require("../models/Movie");
const Cast = require("../models/Cast");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate("casts");

//TODO: filter reult in mongoDB
exports.search = (title, genre, year) => {
  let query = {};

  if (title) {
    query.title = new RegExp(title, "i");
  }
  if (genre) {
    query.genre = genre.toLowerCase();
  }
  if (year) {
    query.year = year;
  }

  return Movie.find(query);
};

exports.create = (movieData) => Movie.create(movieData);
exports.edit = (movieId, movieData) =>
  Movie.findByIdAndUpdate(movieId, movieData);

exports.attach = async (movieId, castId) => {
  const movie = await this.getOne(movieId);
  const cast = await Cast.findById(castId);

  //TODO: validate castId if exists
  //TODO: validate if cast is already added
  movie.casts.push(cast);
  await movie.save();
  return movie;

  // Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);
