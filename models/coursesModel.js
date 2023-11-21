// Database
var db = require('./database/db-connector');

// Queries
const { queries } = require('../queries.mjs');

// Select all courses
getAllCourses = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectCourses, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a course by ID
getCourseById = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.selectCourseById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new course
addCourse = (course) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.insertCourse, [course], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a course
updateAttendee = (course, id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.updateCourse, [course, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Delete a course
deleteAttendee = (id) => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.deleteCourse, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};