// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all event years
getAllEventYears = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectEventYears, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select an event year by ID
getEventYearById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectEventYearById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new event year
addEventYear = (year) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertEventYear, [year], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update an event year
updateEventYear = (year, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateEventYear, [year, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete an event year
deleteEventYear = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteEventYear, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};