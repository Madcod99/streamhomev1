const express = require('express');
const movieController = require('./../controllers/movieController');

const router = express.Router();


router
  .route('/')
  .get(movieController.getMovies)
  .post(movieController.createMovie);

router
  .route('/:id')
  .get(movieController.getMovieById)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);
router
  .route('/play/:title')
  .get(movieController.playMovie)


module.exports = router;