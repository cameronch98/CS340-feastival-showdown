// Import db and queries
import { pool } from '../database/db-connector.mjs';
import * as queries from '../queries.mjs';

// Select all courses
export const getAllCourses = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCourses, (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Select a course by ID
export const getCourseById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCourseById, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Add a new course
export const addCourse = ({course}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.insertCourse, [course], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};

// Update a course
export const updateCourse = ({course, id}) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.updateCourse, [course, id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                console.log(rows)
                return resolve(rows);
            }
        })
    })
};

// Delete a course
export const deleteCourse = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.deleteCourse, [id], (error, rows) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};