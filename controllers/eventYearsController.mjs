// Import event years model
import * as eventYearsModel from '../models/eventYearsModel.mjs';

// Render main event years page and table
export const getEventYearsTable = async(req, res) => {
    try {
        // Run query to get all event years and populate table
        let results = await eventYearsModel.getAllEventYears();
        res.status(200).render('event-years', {eventYear: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting event years: ', err);
        res.status(500).send('Error selecting event years');
    }
};

// Render new event year page and form
export const getNewEventYearForm = async(req, res) => {
    try {
        // Render new event year page and form
        res.status(200).render('new-event-year');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new event year page/form: ', err);
        res.status(500).send('Error rendering new event year page/form');
    }
};

// Render edit event year page and form
export const getEditEventYearForm = async(req, res) => {
    try {
        // Run query to get event year with given id and prepopulate form
        let results = await eventYearsModel.getEventYearById(req.query.id);
        res.render('edit-event-year', {eventYear: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit event year page/form: ', err);
        res.status(500).send('Error rendering edit event year page/form');
    }
};

// Add a new event year
export const addEventYear = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'year': req.body.year,
    };

    try {
        // Run query to insert a new event year with given data
        let results = await eventYearsModel.addEventYear(queryParams);
        res.status(201).redirect('/event-years');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new event year', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Update an event year
export const updateEventYear = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'year': req.body.year,
        'id': req.body.id
    };

    try {
        // Run query to update given event year with new data
        let results = await eventYearsModel.updateEventYear(queryParams);
        res.status(200).render('event-years');
    } catch(err) {
        // Send error status and message
        console.error('Error editing event year', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Delete an event year
export const deleteEventYear = async(req, res) => {
    try {
        // Run query to delete event year with the given id
        let results = await eventYearsModel.deleteEventYear(req.body.id);
        res.status(204).render('event-years');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting event year', err);
        res.status(500).send('Error deleting event year');
    }
};

// Get one event year by id
export const getOneEventYear = async(req, res) => {
    try {
        //Run query to select event year with the given id
        let results = await eventYearsModel.getEventYearById(req.query.id);
        console.log(results[0]);
        res.status(200).json(results[0])
    } catch(err) {
        // Send error status and message
        console.error('Error selecting event year', err);
        res.status(500).send('Error selecting event year');
    }
};