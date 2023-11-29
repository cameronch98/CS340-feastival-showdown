import express from 'express';
import * as ratingsController from '../controllers/ratingsController.mjs';

// Initialize ratings router
const ratingsRoutes = express.Router();

// Define ratings routes
ratingsRoutes
    .get('/', ratingsController.getRatingsTable)
    .get('/new-rating', ratingsController.getNewRatingForm)
    .get('/edit-rating', ratingsController.getEditRatingForm)
    .post('/new-rating-ajax', ratingsController.addRating)
    .put('/edit-rating-ajax', ratingsController.updateRating)
    .delete('/delete-rating-ajax', ratingsController.deleteRating)

export { ratingsRoutes };