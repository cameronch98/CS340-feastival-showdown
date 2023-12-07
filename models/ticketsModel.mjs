// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all tickets
export const getAllTickets = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTickets, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all tickets: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a ticket by ID
export const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTicketById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting ticket by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new ticket
export const addTicket = ({price, ticketTypeId, eventYearId}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertTicket, [price, ticketTypeId, eventYearId], (error, rows) => {
            if(error) {
                console.error("Query error for inserting ticket: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a ticket
export const updateTicket = ({price, ticketTypeId, eventYearId, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateTicket, [price, ticketTypeId, eventYearId, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating ticket: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a ticket
export const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteTicket, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting ticket: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Get the foreign key values for a ticket by id
export const getTicketFKValuesById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.joinFKByTicketId, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting ticket: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};