// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all competitors
getAllCompetitors = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectCompetitors, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a competitor by ID
getCompetitorById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectCompetitorById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new competitor
addCompetitor = (name, email, phone) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertCompetitor, [name, email, phone], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a competitor
updateCompetitor = (name, email, phone, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateCompetitor, [name, email, phone, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor
deleteCompetitor = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteCompetitor, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

let competitorsController = {
    'getAllCompetitors': getAllCompetitors,
    'getCompetitorById': getCompetitorById,
    'addCompetitor': addCompetitor,
    'updateCompetitor': updateCompetitor,
    'deleteCompetitor': deleteCompetitor
}

exports.competitorsController = competitorsController;