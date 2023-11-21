// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all attendees
getAllAttendees = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectAttendees, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select an attendee by ID
getAttendeeById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectAttendeeById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new attendee
addAttendee = (name, email, phone) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertAttendee, [name, email, phone], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update an attendee
updateAttendee = (name, email, phone, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateAttendee, [name, email, phone, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete an attendee
deleteAttendee = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteAttendee, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

let attendeesController = {
    'getAllAttendees': getAllAttendees,
    'getAttendeeById': getAttendeeById,
    'addAttendee': addAttendee,
    'updateAttendee': updateAttendee,
    'deleteAttendee': deleteAttendee
}

exports.attendeesController = attendeesController;