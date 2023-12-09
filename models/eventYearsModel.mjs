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

// Select all event years
export const getAllEventYears = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectEventYears, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all event years: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select an event year by ID
export const getEventYearById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectEventYearById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting event year by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new event year
export const addEventYear = ({year}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertEventYear, [year], (error, rows) => {
            if(error) {
                console.error("Query error for inserting event year: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update an event year
export const updateEventYear = ({year, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateEventYear, [year, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating event year: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete an event year
export const deleteEventYear = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteEventYear, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting event year: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};