import express from 'express';
import * as ticketsController from '../controllers/ticketsController.mjs';

// Initialize tickets router
const ticketsRoutes = express.Router();

// Define tickets routes
ticketsRoutes
    .get('/', ticketsController.getTicketsTable)
    .get('/new-ticket', ticketsController.getNewTicketForm)
    .get('/edit-ticket', ticketsController.getEditTicketForm)
    .post('/new-ticket/fetch', ticketsController.addTicket)
    .put('/edit-ticket/fetch', ticketsController.updateTicket)
    .delete('/delete-ticket/fetch', ticketsController.deleteTicket)

export { ticketsRoutes };