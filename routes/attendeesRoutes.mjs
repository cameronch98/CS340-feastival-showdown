import express from 'express';
import * as attendeesController from '../controllers/attendeesController.mjs';

// Initialize attendees router
const attendeesRoutes = express.Router();

// Define attendees routes
attendeesRoutes
    .get('/', attendeesController.getAttendeesTable)
    .get('/new-attendee', attendeesController.getNewAttendeeForm)
    .get('/edit-attendee', attendeesController.getEditAttendeeForm)
    .post('/new-attendee-ajax', attendeesController.addAttendee)
    .put('/edit-attendee-ajax', attendeesController.updateAttendee)
    .delete('/delete-attendee-ajax', attendeesController.deleteAttendee)

export { attendeesRoutes };