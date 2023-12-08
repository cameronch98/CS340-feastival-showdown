// Import models
import * as ticketSalesModel from '../models/ticketSalesModel.mjs';
import * as attendeesModel from '../models/attendeesModel.mjs';
import * as ticketsModel from '../models/ticketsModel.mjs';
import * as discountsModel from '../models/discountsModel.mjs';

// Render main ticket sales page and table
export const getTicketSalesTable = async(req, res) => {
    try {
        // Run query to get all ticket sales and populate table
        let results = await ticketSalesModel.getAllTicketSales();
        res.status(200).render('ticket-sales', {ticketSale: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting ticket sales: ', err);
        res.status(500).send('Error selecting ticket sales');
    }
};

// Render new ticket sale page and form
export const getNewTicketSaleForm = async(req, res) => {
    try {
        // Initialize results object
        let results = {};

        // Run queries to prepopulate drop downs
        results.attendee = await attendeesModel.getAllAttendees();
        results.ticket = await ticketsModel.getAllTickets();
        results.discount = await discountsModel.getAllDiscounts();

        // Render new ticket sale page and form
        res.status(200).render('new-ticket-sale', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new ticket sale page/form: ', err);
        res.status(500).send('Error rendering new ticket sale page/form');
    }
};

// Render edit ticket sale page and form
export const getEditTicketSaleForm = async(req, res) => {
    try {
        // Run queries to get ticket sale with given id and prepopulate drop downs
        let ticketSale = await ticketSalesModel.getTicketSaleById(req.query.id);
        let attendee = await attendeesModel.getAllAttendees();
        let ticket = await ticketsModel.getAllTickets();
        let discount = await discountsModel.getAllDiscounts();

        // Get ticket sale to edit
        ticketSale = ticketSale[0]

        // Initialize results object
        let results = {
            'ticketSale': ticketSale,
            'attendee': attendee,
            'ticket': ticket,
            'discount': discount
        };

        // Set preselected options to the correct choices
        attendee.forEach(attendee => attendee.selected = (attendee.ID === ticketSale.attendee_id) ? "selected" : "");
        ticket.forEach(ticket => ticket.selected = (ticket.ID === ticketSale.ticket_id) ? "selected" : "");
        discount.forEach(discount => discount.selected = (discount.ID === ticketSale.discount_id) ? "selected" : "");

        // Render page with form elements prepopulated
        res.render('edit-ticket-sale', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit ticket sale page/form: ', err);
        res.status(500).send('Error rendering edit ticket sale page/form');
    }
};

// Add a new ticket sale
export const addTicketSale = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'attendeeId': req.body.attendeeId,
        'ticketId': req.body.ticketId,
        'discountId': (req.body.discountId === '') ? null : req.body.discountId
    };

    try {
        // Run query to insert a new ticket sale with given data
        let results = await ticketSalesModel.addTicketSale(queryParams);
        res.status(201).redirect('/ticket-sales');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new ticket sale', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Update a ticket sale 
export const updateTicketSale = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'attendeeId': req.body.attendeeId,
        'ticketId': req.body.ticketId,
        'discountId': (req.body.discountId === '') ? null : req.body.discountId,
        'id': req.body.id
    };

    try {
        // Run query to update given ticket sale with new data
        let results = await ticketSalesModel.updateTicketSale(queryParams);
        res.status(200).render('ticket-sales');
    } catch(err) {
        // Send error status and message
        console.error('Error editing ticket sale', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Delete a ticket sale
export const deleteTicketSale = async(req, res) => {
    try {
        // Run query to delete ticket sale with the given id
        let results = await ticketSalesModel.deleteTicketSale(req.body.id);
        res.status(204).render('ticket-sales');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting ticket sale', err);
        res.status(500).send('Error deleting ticket sale');
    }
};