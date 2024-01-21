const movies = [
  {
    _id: 1,
    title: "Jungle Cuise",
    genre: "Adventure",
    director: "Spilberg",
    year: "2019",
    image: "/img/jungle-cruise.jpeg",
    rating: "2",
    description:
      "Description: The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid with a thirst for adventure. Longing to find out more about the world beyond the sea, Ariel visits the surface and falls for the dashing Prince Eric. Following her heart, she makes a deal with the evil sea witch, Ursula, to experience life on land.",
  },
];

exports.getAll = () => {
  return movies.slice();
};

exports.getOne = (movieId) => {
  const movie = movies.find((movie) => movie._id == movieId);
  return movie;
};

exports.create = (movieData) => {
  movieData._id = movies[movies.length - 1]._id + 1;
  movies.push(movieData);
};
