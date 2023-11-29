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