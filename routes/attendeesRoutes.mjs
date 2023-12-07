import express from 'express';
import * as attendeesController from '../controllers/attendeesController.mjs';

// Initialize attendees router
const attendeesRoutes = express.Router();

// Define attendees routes
attendeesRoutes
    .get('/', attendeesController.getAttendeesTable)
    .get('/get-attendee', attendeesController.getOneAttendee)
    .get('/new-attendee', attendeesController.getNewAttendeeForm)
    .get('/edit-attendee', attendeesController.getEditAttendeeForm)
    .post('/new-attendee/fetch', attendeesController.addAttendee)
    .put('/edit-attendee/fetch', attendeesController.updateAttendee)
    .delete('/delete-attendee-ajax', attendeesController.deleteAttendee)

export { attendeesRoutes };