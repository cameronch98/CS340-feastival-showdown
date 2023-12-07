import express from 'express';
import * as competitorsController from '../controllers/competitorsController.mjs';

// Initialize competitors router
const competitorsRoutes = express.Router();

// Define competitors routes
competitorsRoutes
    .get('/', competitorsController.getCompetitorsTable)
    .get('/get-competitor', competitorsController.getOneCompetitor)
    .get('/new-competitor', competitorsController.getNewCompetitorForm)
    .get('/edit-competitor', competitorsController.getEditCompetitorForm)
    .post('/new-competitor/fetch', competitorsController.addCompetitor)
    .put('/edit-competitor/fetch', competitorsController.updateCompetitor)
    .delete('/delete-competitor-ajax', competitorsController.deleteCompetitor)

export { competitorsRoutes };