// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all competitor registrations
getAllCompetitorRegs = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectCompetitorRegs, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a competitor registration by ID
getCompetitorRegById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectCompetitorRegById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new competitor registration
addCompetitorReg = (competitorId, teamId, yearId) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertCompetitorReg, [competitorId, teamId, yearId], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a competitor registration
updateCompetitorReg = (competitorId, teamId, yearId, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateCompetitorReg, [competitorId, teamId, yearId, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor registration
deleteAttendee = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteCompetitorReg, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

let competitorRegsController = {
    'getAllCompetitorRegs': getAllCompetitorRegs,
    'getCompetitorRegById': getCompetitorRegById,
    'addCompetitorReg': addCompetitorReg,
    'updateCompetitorReg': updateCompetitorReg,
    'deleteCompetitorReg': deleteCompetitorReg
}

exports.competitorRegsController = competitorRegsController;