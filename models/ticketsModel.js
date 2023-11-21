// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all tickets
getAllTickets = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTickets, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a ticket by ID
getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTicketById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new ticket
addTicket = (price, ticketTypeId, eventYearId) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertTicket, [price, ticketTypeId, eventYearId], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a ticket
updateTicket = (price, ticketTypeId, eventYearId, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateTicket, [price, ticketTypeId, eventYearId, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor registration
deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteTicket, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};