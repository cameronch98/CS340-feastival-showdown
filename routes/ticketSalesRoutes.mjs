import express from 'express';
import * as ticketSalesController from '../controllers/ticketSalesController.mjs';

// Initialize ticket sales router
const ticketSalesRoutes = express.Router();

// Define ticket sales routes
ticketSalesRoutes
    .get('/', ticketSalesController.getTicketSalesTable)
    .get('/new-ticket-sale', ticketSalesController.getNewTicketSaleForm)
    .get('/edit-ticket-sale', ticketSalesController.getEditTicketSaleForm)
    .post('/new-ticket-sale-ajax', ticketSalesController.addTicketSale)
    .put('/edit-ticket-sale-ajax', ticketSalesController.updateTicketSale)
    .delete('/delete-ticket-sale-ajax', ticketSalesController.deleteTicketSale)

export { ticketSalesRoutes };