// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all competitors
export const getAllCompetitors = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCompetitors, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a competitor by ID
export const getCompetitorById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCompetitorById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new competitor
export const addCompetitor = ({name, email, phone}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertCompetitor, [name, email, phone], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a competitor
export const updateCompetitor = ({name, email, phone, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateCompetitor, [name, email, phone, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a competitor
export const deleteCompetitor = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteCompetitor, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};