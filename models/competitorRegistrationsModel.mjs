// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all competitor registrations
export const getAllCompetitorRegs = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCompetitorRegs, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all competitor registrations: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a competitor registration by ID
export const getCompetitorRegById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCompetitorRegById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting competitor registration by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new competitor registration
export const addCompetitorReg = ({competitorId, teamId, eventYearId}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertCompetitorReg, [competitorId, teamId, eventYearId], (error, rows) => {
            if(error) {
                console.error("Query error for inserting competitor registration: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a competitor registration
export const updateCompetitorReg = ({competitorId, teamId, eventYearId, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateCompetitorReg, [competitorId, teamId, eventYearId, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating competitor registration: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor registration
export const deleteCompetitorReg = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteCompetitorReg, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting competitor registration: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

