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

// Select all competitors
export const getAllCompetitors = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCompetitors, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all competitors: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a competitor by ID
export const getCompetitorById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCompetitorById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting competitor by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new competitor
export const addCompetitor = ({name, email, phone}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertCompetitor, [name, email, phone], (error, rows) => {
            if(error) {
                console.error("Query error for inserting competitor: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a competitor
export const updateCompetitor = ({name, email, phone, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateCompetitor, [name, email, phone, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating competitor: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor
export const deleteCompetitor = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteCompetitor, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting competitor: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};