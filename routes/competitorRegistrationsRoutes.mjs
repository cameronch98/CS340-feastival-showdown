import express from 'express';
import * as competitorRegistrationsController from '../controllers/competitorRegistrationsController.mjs';

// Initialize competitors router
const competitorRegistrationsRoutes = express.Router();

// Define competitors routes
competitorRegistrationsRoutes
    .get('/', competitorRegistrationsController.getCompetitorRegsTable)
    .get('/new-competitor-registration', competitorRegistrationsController.getNewCompetitorRegForm)
    .get('/edit-competitor-registration', competitorRegistrationsController.getEditCompetitorReg)
    .post('/new-competitor-registration/fetch', competitorRegistrationsController.addCompetitorReg)
    .put('/edit-competitor-registration/fetch', competitorRegistrationsController.updateCompetitorReg)
    .delete('/delete-competitor-registration/fetch', competitorRegistrationsController.deleteCompetitorReg)

export { competitorRegistrationsRoutes };