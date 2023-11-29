import express from 'express';
import * as dishesController from '../controllers/dishesController.mjs';

// Initialize dishes router
const dishesRoutes = express.Router();

// Define dishes routes
dishesRoutes
    .get('/', dishesController.getDishesTable)
    .get('/new-dish', dishesController.getNewDishForm)
    .get('/edit-dish', dishesController.getEditDishForm)
    .post('/new-dish-ajax', dishesController.addDish)
    .put('/edit-dish-ajax', dishesController.updateDish)
    .delete('/delete-dish-ajax', dishesController.deleteDish)

export { dishesRoutes };