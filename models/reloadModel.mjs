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

// Calls a truncation on every table
export const emptyDB = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.emptyDB, (error, rows) => {
            if (error) {
                console.error('Error emptying db:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for attendees
export const reloadAttendees = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadAttendees, (error, rows) => {
            if (error) {
                console.error('Error reloading attendees:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for competitors
export const reloadCompetitors = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadCompetitors, (error, rows) => {
            if (error) {
                console.error('Error reloading competitors:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for event years
export const reloadEventYears = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadEventYears, (error, rows) => {
            if (error) {
                console.error('Error reloading event years:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for courses
export const reloadCourses = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadCourses, (error, rows) => {
            if (error) {
                console.error('Error reloading courses:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for ticket types
export const reloadTicketTypes = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadTicketTypes, (error, rows) => {
            if (error) {
                console.error('Error reloading ticket types:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for tickets
export const reloadTickets = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadTickets, (error, rows) => {
            if (error) {
                console.error('Error reloading tickets:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for discounts
export const reloadDiscounts = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadDiscounts, (error, rows) => {
            if (error) {
                console.error('Error reloading discounts:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for teams
export const reloadTeams = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadTeams, (error, rows) => {
            if (error) {
                console.error('Error reloading teams:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for ticket sales
export const reloadTicketSales = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadTicketSales, (error, rows) => {
            if (error) {
                console.error('Error reloading ticket sales:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for competitor regs
export const reloadCompetitorRegs = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadCompetitorRegs, (error, rows) => {
            if (error) {
                console.error('Error reloading competitor registrations:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for dishes
export const reloadDishes = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadDishes, (error, rows) => {
            if (error) {
                console.error('Error reloading dishes:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

// Executes DDL insert for ratings
export const reloadRatings = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.reloadRatings, (error, rows) => {
            if (error) {
                console.error('Error reloading ratings:', error)
                return reject(error)
            } else {
                return resolve(rows)
            }
        })
    })
};

