const router = require('express').Router();
const { paramsValidator, movieCreatingValidator } = require('../middlewares/joi-schemas');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.delete('/:movieId', paramsValidator, deleteMovie);
router.post('/', movieCreatingValidator, createMovie);

module.exports = router;
