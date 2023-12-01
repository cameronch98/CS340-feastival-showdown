import express from 'express';
import * as homeController from '../controllers/homeController.mjs';

// Initialize home router
const homeRoutes = express.Router();

// Define home routes
homeRoutes
    .get('/', homeController.getHomePage)
    .get('/reload-db', homeController.reloadDatabase)

export { homeRoutes };