// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all ticket sales
getAllTicketSales = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTicketSales, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a ticket sale by ID
getTicketSaleById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTicketSaleById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new ticket sale
addTicketSale = (attendeeId, ticketId, discountId) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertTicketSale, [attendeeId, ticketId, discountId], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a competitor registration
updateTicketSale = (attendeeId, ticketId, discountId, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateTicketSale, [attendeeId, ticketId, discountId, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor registration
deleteTicketSale = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteTicketSale, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};