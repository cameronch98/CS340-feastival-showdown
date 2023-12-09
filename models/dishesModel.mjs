// Citation for model query promise logic
// Date: 12/01/2023
// Adapted from Darif Nemma on Medium
// Learned how to use SQL queries with async await logic from this 
// post and used that to clean up the code from having a lot of 
// callback nesting. The main logic of returning a new promise from 
// the results of the SQL query was the extent of what was utilized 
// from this source.
// Source URL: https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all dishes
export const getAllDishes = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectDishes, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all dishes: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a dish by ID
export const getDishById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectDishById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting dish by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new dish
export const addDish = ({dishName, description, courseId, teamId, eventYearId}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertDish, [dishName, description, courseId, teamId, eventYearId], (error, rows) => {
            if(error) {
                console.error("Query error for inserting dish: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a dish
export const updateDish = ({dishName, description, courseId, teamId, eventYearId, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateDish, [dishName, description, courseId, teamId, eventYearId, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating dish: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a dish
export const deleteDish = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteDish, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting dish: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};