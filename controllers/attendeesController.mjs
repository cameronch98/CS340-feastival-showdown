// Import attendees model
import * as attendeesModel from '../models/attendeesModel.mjs';

// Render main attendees page and table
export const getAttendeesTable = async(req, res) => {
    try {
        // Run query to get all attendees and populate table
        let results = await attendeesModel.getAllAttendees();
        res.status(200).render('attendees', {attendee: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting attendees: ', err);
        res.status(500).send('Error selecting attendees');
    }
};

// Render new attendee page and form
export const getNewAttendeeForm = async(req, res) => {
    try {
        // Render new attendee page and form
        res.status(200).render('new-attendee');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new attendee page/form: ', err);
        res.status(500).send('Error rendering new attendee page/form');
    }
};

// Render edit attendee page and form
export const getEditAttendeeForm = async(req, res) => {
    try {
        // Run query to get attendee with given id and prepopulate form
        let results = await attendeesModel.getAttendeeById(req.query.id);
        res.status(200).render('edit-attendee', {attendee: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit attendee page/form: ', err);
        res.status(500).send('Error rendering edit attendee page/form');
    }
};

// Add a new attendee
export const addAttendee = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
    };

    try {
        // Run query to insert a new attendee with given data
        let results = await attendeesModel.addAttendee(queryParams);
        res.status(201).redirect('/attendees');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new attendee', err);
        res.status(500).json({sqlError: err.errno, sqlMessage: err.sqlMessage});
    }
};

// Update an attendee
export const updateAttendee = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
        'id': req.body.id
    };

    try {
        // Run query to update given attendee with new data
        let results = await attendeesModel.updateAttendee(queryParams);
        res.status(200).render('attendees');
    } catch(err) {
        // Send error status and message
        console.error('Error editing attendee', err);
        res.status(500).json({sqlError: err.errno, sqlMessage: err.sqlMessage});
    }
};

// Delete an attendee
export const deleteAttendee = async(req, res) => {
    try {
        // Run query to delete attendee with the given id
        let results = await attendeesModel.deleteAttendee(req.body.id);
        res.status(204).render('attendees');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting attendee', err);
        res.status(500).send('Error deleting attendee');
    }
};

// Get one attendee by id
export const getOneAttendee = async(req, res) => {
    try {
        //Run query to select attendee with the given id
        let results = await attendeesModel.getAttendeeById(req.query.id);
        res.status(200).json(results[0])
    } catch(err) {
        // Send error status and message
        console.error('Error selecting attendee', err);
        res.status(500).send('Error selecting attendee');
    }
};