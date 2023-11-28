import express from 'express';
import * as competitorsController from '../controllers/competitorsController.mjs';

// Initialize competitors router
const competitorsRoutes = express.Router();

// Define competitors routes
competitorsRoutes
    .get('/', competitorsController.getCompetitorsTable)
    .get('/new-competitor', competitorsController.getNewCompetitorForm)
    .get('/edit-competitor', competitorsController.getEditCompetitorForm)
    .post('/new-competitor-ajax', competitorsController.addCompetitor)
    .put('/edit-competitor-ajax', competitorsController.updateCompetitor)
    .delete('/delete-competitor-ajax', competitorsController.deleteCompetitor)

export { competitorsRoutes };