// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all discounts
export const getAllDiscounts = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectDiscounts, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all discounts: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a discount by ID
export const getDiscountById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectDiscountById, [id], (error, rows) => {
            if(error) {
                console.error("Query error for selecting discount by id: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new discount
export const addDiscount = ({discount, percent}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertDiscount, [discount, percent], (error, rows) => {
            if(error) {
                console.error("Query error for inserting discount: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a discount
export const updateDiscount = ({discount, percent, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateDiscount, [discount, percent, id], (error, rows) => {
            if(error) {
                console.error("Query error for updating discount: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a discount
export const deleteDiscount = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteDiscount, [id], (error, rows) => {
            if(error) {
                console.error("Query error for deleting discount: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};