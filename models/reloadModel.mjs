import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

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

