import express from 'express';
import * as dishesController from '../controllers/dishesController.mjs';

// Initialize dishes router
const dishesRoutes = express.Router();

// Define dishes routes
dishesRoutes
    .get('/', dishesController.getDishesTable)
    .get('/get-dish', dishesController.getOneDish)
    .get('/new-dish', dishesController.getNewDishForm)
    .get('/edit-dish', dishesController.getEditDishForm)
    .post('/new-dish/fetch', dishesController.addDish)
    .put('/edit-dish/fetch', dishesController.updateDish)
    .delete('/delete-dish/fetch', dishesController.deleteDish)

export { dishesRoutes };