// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all ratings
getAllRatings = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectRatings, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a rating by ID
getRatingById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectRatingById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new rating
addRating = (dishId, rating, comments, attendeeId) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertRating, [dishId, rating, comments, attendeeId], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a rating
updateRating = (dishId, rating, comments, attendeeId, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateRating, [dishId, rating, comments, attendeeId, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a rating
deleteAttendee = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteRating, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};