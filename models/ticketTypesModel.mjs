// Citation for model query promise logic
// Date: 12/01/2023
// Adapted from Darif Nemma on Medium
// Learned how to use SQL queries with async await logic from this 
// post and used that to clean up the code from having a lot of 
// callback nesting. The main logic of returning a new promise from 
// the results of the SQL query was the extent of what was utilized 
// from this source.
// Source URL: https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all ticket types
export const getAllTicketTypes = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTicketTypes, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all ticket types: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a ticket type by ID
export const getTicketTypeById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTicketTypeById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting ticket type by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new ticket type
export const addTicketType = ({ticketType}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertTicketType, [ticketType], (error, rows) => {
            if(error) {
                console.error("Query error for inserting ticket type: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a ticket type
export const updateTicketType = ({ticketType, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateTicketType, [ticketType, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating ticket type: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a ticket type
export const deleteTicketType = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteTicketType, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting ticket type: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};