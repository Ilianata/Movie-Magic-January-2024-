const Movie = require("../models/Movie");
const Cast = require("../models/Cast");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);

//TODO: filter reult in mongoDB
exports.search = async (title, genre, year) => {
  let result = await Movie.find().lean();

  if (title) {
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (genre) {
    result = result.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );
  }
  if (year) {
    result = result.filter((movie) => movie.year === year);
  }

  return result;
};

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
  const movie = await this.getOne(movieId);
  const cast = await Cast.findById(castId);

  //TODO: validate castId if exists
  movie.casts.push(cast);
  await movie.save();
  return movie;

  // Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};
