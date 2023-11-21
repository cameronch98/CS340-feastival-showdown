// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all teams
getAllTeams = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTeams, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a team by ID
getTeamsById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectTeamById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new team
addTeam = (name) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertTeam, [name], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a team
updateTeam = (team, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateTeam, [team, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a team
deleteTeam = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteTeam, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};