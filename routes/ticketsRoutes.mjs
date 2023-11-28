import express from 'express';
import * as ticketsController from '../controllers/ticketsController.mjs';

// Initialize tickets router
const ticketsRoutes = express.Router();

// Define tickets routes
ticketsRoutes
    .get('/', ticketsController.getTicketsTable)
    .get('/new-ticket', ticketsController.getNewTicketForm)
    .get('/edit-ticket', ticketsController.getEditTicketForm)
    .post('/new-ticket-ajax', ticketsController.addTicket)
    .put('/edit-ticket-ajax', ticketsController.updateTicket)
    .delete('/delete-ticket-ajax', ticketsController.deleteTicket)

export { ticketsRoutes };