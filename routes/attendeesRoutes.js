var express = require('express');
var {attendeesController} = require('../controllers/attendeesController');

// Initialize attendees router
const attendeesRoutes = express.Router();

// Define attendees routes
attendeesRoutes
    .get('/', attendeesController.getAttendeesTable)
    .get('/add-attendee', attendeesController.getNewAttendeeForm)
    .get('/edit-attendee', attendeesController.getEditAttendeeForm)
    .post('/add-attendee-ajax', attendeesController.addAttendee)
    .put('/edit-attendee-ajax', attendeesController.updateAttendee)
    .delete('/delete-attendee-ajax', attendeesController.deleteAttendee)

exports.attendeesRoutes = attendeesRoutes;