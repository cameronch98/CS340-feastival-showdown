import express from 'express';
import * as ticketTypesController from '../controllers/ticketTypesController.mjs';

// Initialize ticket types router
const ticketTypesRoutes = express.Router();

// Define ticket types routes
ticketTypesRoutes
    .get('/', ticketTypesController.getTicketTypesTable)
    .get('/get-ticket-type', ticketTypesController.getOneTicketType)
    .get('/new-ticket-type', ticketTypesController.getNewTicketTypeForm)
    .get('/edit-ticket-type', ticketTypesController.getEditTicketTypeForm)
    .post('/new-ticket-type/fetch', ticketTypesController.addTicketType)
    .put('/edit-ticket-type/fetch', ticketTypesController.updateTicketType)
    .delete('/delete-ticket-type-ajax', ticketTypesController.deleteTicketType)

export { ticketTypesRoutes };