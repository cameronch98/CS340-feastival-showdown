import express from 'express';
import * as ticketTypesController from '../controllers/ticketTypesController.mjs';

// Initialize ticket types router
const ticketTypesRoutes = express.Router();

// Define ticket types routes
ticketTypesRoutes
    .get('/', ticketTypesController.getTicketTypesTable)
    .get('/new-ticket-type', ticketTypesController.getNewTicketTypeForm)
    .get('/edit-ticket-type', ticketTypesController.getEditTicketTypeForm)
    .post('/new-ticket-type-ajax', ticketTypesController.addTicketType)
    .put('/edit-ticket-type-ajax', ticketTypesController.updateTicketType)
    .delete('/delete-ticket-type-ajax', ticketTypesController.deleteTicketType)

export { ticketTypesRoutes };