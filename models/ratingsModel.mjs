// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all ratings
export const getAllRatings = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectRatings, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all ratings: ", error);
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
                console.error("Query error for selecting rating by id: ", error);
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
                console.error("Query error for inserting rating: ", error);
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
                console.error("Query error for updating rating: ", error);
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
                console.error("Query error for deleting rating: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Get the foreign key values for a rating by id
export const getRatingFKValuesById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.joinFKByRatingId, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting rating: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};