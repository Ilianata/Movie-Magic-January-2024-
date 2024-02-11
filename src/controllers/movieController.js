const router = require("express").Router();
const movieService = require("../services/movieService");
const castService = require("../services/castService");
const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMesage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
  res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  const newMovie = req.body;
  newMovie.owner = req.user._id;

  try {
    await movieService.create(newMovie);

    res.redirect("/");
  } catch (err) {
    const message = getErrorMesage(err);
    res.status(400).render("create", { error: message, ...newMovie });
  }
});

router.get("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId).lean();
  const isOwner = movie.owner && movie.owner == req.user?._id;

  movie.rating = new Array(Number(movie.rating)).fill(true);
  res.render("movie/details", { movie, isOwner });
});

router.get("/movies/:movieID/attach", isAuth, async (req, res) => {
  const movie = await movieService.getOne(req.params.movieID).lean();
  const casts = await castService.getAll().lean();
  //TODO: Remove already added casts
  res.render("movie/attach", { ...movie, casts });
});

router.post("/movies/:movieId/attach", isAuth, async (req, res) => {
  const castId = req.body.cast;
  const movieId = req.params.movieId;
  await movieService.attach(movieId, castId);

  res.redirect(`/movies/${movieId}/attach`);
});

router.get("/movies/:movieId/edit", isAuth, async (req, res) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  const movie = await movieService.getOne(req.params.movieId).lean();
  res.render("movie/edit", { movie });
});

router.post("/movies/:movieId/edit", isAuth, async (req, res) => {
  const editedMovie = req.body;

  await movieService.edit(req.params.movieId, editedMovie);

  res.redirect(`/movies/${req.params.movieId}`);
});

router.get("/movies/:movieId/delete", isAuth, async (req, res) => {
  await movieService.delete(req.params.movieId);
  res.redirect("/");
});

module.exports = router;
