// Import db and queries
import { pool } from './database/db-connector';
import * as queries from '../queries.mjs';

// Select all ratings
export const getAllRatings = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectRatings, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a rating by ID
export const getRatingById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectRatingById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new rating
export const addRating = ({dishId, rating, comments, attendeeId}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertRating, [dishId, rating, comments, attendeeId], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a rating
export const updateRating = ({dishId, rating, comments, attendeeId, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateRating, [dishId, rating, comments, attendeeId, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a rating
export const deleteRating = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteRating, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};