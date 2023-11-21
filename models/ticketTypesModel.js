// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all ticket types
getAllTicketTypes = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTicketTypes, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a ticket type by ID
getTicketTypeById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTicketTypeById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new ticket type
addTicketType = (ticketType) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertTicketType, [ticketType], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a ticket type
updateTicketType = (ticketType, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateTicketType, [ticketType, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a ticket type
deleteTicketType = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteTicketType, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};