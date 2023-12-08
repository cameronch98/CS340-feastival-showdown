import express from 'express';
import * as reloadController from '../controllers/reloadController.mjs';

// Initialize reload router
const reloadRoutes = express.Router();

// Define reload routes
reloadRoutes
    .get('/reload-db', reloadController.reloadDatabase)

export { reloadRoutes };