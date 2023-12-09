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

// Select all ticket sales
export const getAllTicketSales = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTicketSales, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all ticket sales: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a ticket sale by ID
export const getTicketSaleById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTicketSaleById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting ticket sale by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new ticket sale
export const addTicketSale = ({attendeeId, ticketId, discountId}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertTicketSale, [attendeeId, ticketId, discountId], (error, rows) => {
            if(error) {
                console.error("Query error for inserting ticket sale: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a ticket sale
export const updateTicketSale = ({attendeeId, ticketId, discountId, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateTicketSale, [attendeeId, ticketId, discountId, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating ticket sale: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a ticket sale
export const deleteTicketSale = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteTicketSale, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting ticket sale: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};