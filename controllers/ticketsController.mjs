// Import models
import * as ticketsModel from '../models/ticketsModel.mjs';
import * as ticketTypesModel from '../models/ticketTypesModel.mjs';
import * as eventYearsModel from '../models/eventYearsModel.mjs';

// Render main tickets page and table
export const getTicketsTable = async(req, res) => {
    try {
        // Run query to get all tickets and populate table
        let results = await ticketsModel.getAllTickets();
        res.status(200).render('tickets', {ticket: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting tickets: ', err);
        res.status(500).send('Error selecting tickets');
    }
};

// Render new ticket page and form
export const getNewTicketForm = async(req, res) => {
    try {
        // Initialize results object
        let results = {};

        // Run queries to prepopulate drop downs
        results.ticketType = await ticketTypesModel.getAllTicketTypes();
        results.eventYear = await eventYearsModel.getAllEventYears();

        // Render new ticket page and form
        res.status(200).render('new-ticket', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new ticket page/form: ', err);
        res.status(500).send('Error rendering new ticket page/form');
    }
};

// Render edit ticket page and form
export const getEditTicketForm = async(req, res) => {
    try {
        // Run queries to get ticket with given id and prepopulate drop downs
        let ticket = await ticketsModel.getTicketById(req.query.id);
        let ticketType = await ticketTypesModel.getAllTicketTypes();
        let eventYear = await eventYearsModel.getAllEventYears();

        // Get ticket to edit
        ticket = ticket[0]

        // Initialize results object
        let results = {
            'ticket': ticket,
            'ticketType': ticketType,
            'eventYear': eventYear
        };

        // Set preselected options to the correct choices
        ticketType.forEach(ticketType => ticketType.selected = (ticketType.ID === ticket.ticket_type_id) ? "selected" : "");
        eventYear.forEach(eventYear => eventYear.selected = (eventYear.ID === ticket.event_year_id) ? "selected" : "");

        // Render page with form elements prepopulated
        res.render('edit-ticket', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit ticket page/form: ', err);
        res.status(500).send('Error rendering edit ticket page/form');
    }
};

// Add a new ticket
export const addTicket = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'price': req.body.price,
        'ticketTypeId': req.body.ticketTypeId,
        'eventYearId': req.body.eventYearId
    };

    try {
        // Run query to insert a new ticket with given data
        let results = await ticketsModel.addTicket(queryParams);
        res.status(201).redirect('/tickets');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new ticket', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Update a ticket
export const updateTicket = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'price': req.body.price,
        'ticketTypeId': req.body.ticketTypeId,
        'eventYearId': req.body.eventYearId,
        'id': req.body.id
    };

    console.log(queryParams);

    try {
        // Run query to update given ticket with new data
        let results = await ticketsModel.updateTicket(queryParams);
        res.status(200).render('tickets');
    } catch(err) {
        // Send error status and message
        console.error('Error editing ticket', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Delete a ticket
export const deleteTicket = async(req, res) => {
    try {
        // Run query to delete ticket with the given id
        let results = await ticketsModel.deleteTicket(req.body.id);
        res.status(204).render('tickets');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting ticket', err);
        res.status(500).send('Error deleting ticket');
    }
};