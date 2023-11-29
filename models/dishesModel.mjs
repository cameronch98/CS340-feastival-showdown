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
export const addDish = ({dishName, dishImage, description, courseId, teamId, eventYearId}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertDish, [dishName, dishImage, description, courseId, teamId, eventYearId], (error, rows) => {
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
export const updateDish = ({dishName, dishImage, description, courseId, teamId, eventYearId, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateDish, [dishName, dishImage, description, courseId, teamId, eventYearId, id], (error, rows) => {
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