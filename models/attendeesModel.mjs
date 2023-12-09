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

// Select all attendees
export const getAllAttendees = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectAttendees, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all attendees: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select an attendee by ID
export const getAttendeeById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectAttendeeById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting attendee by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new attendee
export const addAttendee = ({name, email, phone}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertAttendee, [name, email, phone], (error, rows) => {
            if(error) {
                console.error("Query error for inserting attendee: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update an attendee
export const updateAttendee = ({name, email, phone, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateAttendee, [name, email, phone, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating attendee: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete an attendee
export const deleteAttendee = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteAttendee, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting attendee: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};