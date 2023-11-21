// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all discounts
getAllDiscounts = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectDiscounts, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a discount by ID
getDiscountById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectDiscountById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new discount
addDiscount = (discount, percent) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertDiscount, [discount, percent], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a discount
updateDiscount = (discount, percent, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateDiscount, [discount, percent, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a discount
deleteDiscount = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteDiscount, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};