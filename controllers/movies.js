const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden');
const {
  wrongData,
  forbiddenError,
  notFound,
} = require('../constants/messages');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(wrongData);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(`Фильм ${notFound}`);
      }
      if (userId !== movie.owner.toString()) {
        throw new ForbiddenError(forbiddenError);
      } else {
        Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
