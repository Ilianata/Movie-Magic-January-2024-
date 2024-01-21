const movies = [
  {
    image: "Jungle Cuise",
    genre: "Adventure",
    director: "Spilberg",
    year: "2019",
    image: "/img/jungle-CanvasCaptureMediaStreamTrack.jped",
    rating: "5",
    description:
      "Description: The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid with a thirst for adventure. Longing to find out more about the world beyond the sea, Ariel visits the surface and falls for the dashing Prince Eric. Following her heart, she makes a deal with the evil sea witch, Ursula, to experience life on land.",
  },
];


exports.create = (movieData) => {
  console.log(movieData);
  movies.push(movieData);
};
