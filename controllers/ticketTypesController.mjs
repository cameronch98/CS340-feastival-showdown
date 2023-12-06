// Import ticket types model
import * as ticketTypesModel from '../models/ticketTypesModel.mjs';

// Render main ticket types page and table
export const getTicketTypesTable = async(req, res) => {
    try {
        // Run query to get all ticket types and populate table
        let results = await ticketTypesModel.getAllTicketTypes();
        res.status(200).render('ticket-types', {ticketType: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting ticket types: ', err);
        res.status(500).send('Error selecting ticket types');
    }
};

// Render new ticket type page and form
export const getNewTicketTypeForm = async(req, res) => {
    try {
        // Render new ticket type page and form
        res.status(200).render('new-ticket-type');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new ticket type page/form: ', err);
        res.status(500).send('Error rendering new ticket type page/form');
    }
};

// Render edit ticket type page and form
export const getEditTicketTypeForm = async(req, res) => {
    try {
        // Run query to get ticket type with given id and prepopulate form
        let results = await ticketTypesModel.getTicketTypeById(req.query.id);
        res.render('edit-ticket-type', {ticketType: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit ticket type page/form: ', err);
        res.status(500).send('Error rendering edit ticket type page/form');
    }
};

// Add a new ticket type
export const addTicketType = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'ticketType': req.body.ticketType,
    };

    try {
        // Run query to insert a new ticket type with given data
        let results = await ticketTypesModel.addTicketType(queryParams);
        res.status(201).redirect('/ticket-types');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new ticket type', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Update a ticket type
export const updateTicketType = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'ticketType': req.body.ticketType,
        'id': req.body.id
    };

    try {
        // Run query to update given ticket type with new data
        let results = await ticketTypesModel.updateTicketType(queryParams);
        res.status(200).render('ticket-types');
    } catch(err) {
        // Send error status and message
        console.error('Error editing ticket type', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Delete a ticket type
export const deleteTicketType = async(req, res) => {
    try {
        // Run query to delete ticket type with the given id
        let results = await ticketTypesModel.deleteTicketType(req.body.id);
        res.status(204).render('ticket-types');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting ticket type', err);
        res.status(500).send('Error deleting ticket type');
    }
};