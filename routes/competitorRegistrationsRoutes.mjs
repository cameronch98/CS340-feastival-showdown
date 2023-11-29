import express from 'express';
import * as competitorRegistrationsController from '../controllers/competitorRegistrationsController.mjs';

// Initialize competitors router
const competitorRegistrationsRoutes = express.Router();

// Define competitors routes
competitorRegistrationsRoutes
    .get('/', competitorRegistrationsController.getCompetitorRegsTable)
    .get('/new-competitor-registration', competitorRegistrationsController.getNewCompetitorRegForm)
    .get('/edit-competitor-registration', competitorRegistrationsController.getEditCompetitorReg)
    .post('/new-competitor-registration-ajax', competitorRegistrationsController.addCompetitorReg)
    .put('/edit-competitor-registration-ajax', competitorRegistrationsController.updateCompetitorReg)
    .delete('/delete-competitor-registration-ajax', competitorRegistrationsController.deleteCompetitorReg)

export { competitorRegistrationsRoutes };