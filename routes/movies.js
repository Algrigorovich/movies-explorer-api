const moviesRouter = require('express').Router();
const { paramsValidator, movieCreatingValidator } = require('../middlewares/joi-schemas');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.delete('/:movieId', paramsValidator, deleteMovie);
moviesRouter.post('/', movieCreatingValidator, createMovie);

module.exports = moviesRouter;
