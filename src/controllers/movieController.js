const router = require("express").Router();
const movieService = require("../services/movieService");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const newMovie = req.body;

  try {
    await movieService.create(newMovie);

    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.redirect("/create");
  }
});

router.get("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId).lean();
  movie.rating = new Array(Number(movie.rating)).fill(true);
  res.render("details", { movie });
});

router.get("/movies/:movieID/attach", async (req, res) => {
  res.render("movie/attach");
});

module.exports = router;
