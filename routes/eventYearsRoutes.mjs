import express from 'express';
import * as eventYearsController from '../controllers/eventYearsController.mjs';

// Initialize event years router
const eventYearsRoutes = express.Router();

// Define event years routes
eventYearsRoutes
    .get('/', eventYearsController.getEventYearsTable)
    .get('/new-event-year', eventYearsController.getNewEventYearForm)
    .get('/edit-event-year', eventYearsController.getEditEventYearForm)
    .post('/new-event-year-ajax', eventYearsController.addEventYear)
    .put('/edit-event-year-ajax', eventYearsController.updateEventYear)
    .delete('/delete-event-year-ajax', eventYearsController.deleteEventYear)

export { eventYearsRoutes };