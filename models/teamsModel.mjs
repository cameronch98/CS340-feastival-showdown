// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all teams
export const getAllTeams = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTeams, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all teams: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a team by ID
export const getTeamById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectTeamById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting team by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new team
export const addTeam = ({name}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertTeam, [name], (error, rows) => {
            if(error) {
                console.error("Query error for inserting team: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a team
export const updateTeam = ({name, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateTeam, [name, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating team: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a team
export const deleteTeam = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteTeam, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting team: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};