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

// Select all courses
export const getAllCourses = () => {
    return new Promise((resolve, reject) => {
        pool.query(queries.selectCourses, (error, rows) => {
            if(error) {
                console.error("Query error for selecting all courses: ", error);
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
                console.error("Query error for selecting course by id: ", error);
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
                console.error("Query error for inserting course: ", error);
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
                console.error("Query error for updating course: ", error);
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
                console.error("Query error for deleting course: ", error);
                return reject(error);
            } else {
                return resolve(rows);
            }
        })
    })
};