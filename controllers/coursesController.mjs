// Import courses model
import { query } from 'express';
import * as coursesModel from '../models/coursesModel.mjs';

// Render main courses page and table
export const getCoursesTable = async(req, res) => {
    try {
        // Run query to get all courses and populate table
        let results = await coursesModel.getAllCourses();
        res.status(200).render('courses', {course: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting courses: ', err);
        res.status(500).send('Error selecting courses');
    }
};

// Render new courses page and form
export const getNewCourseForm = async(req, res) => {
    try {
        // Render new courses page and form
        res.status(200).render('new-course');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new course page/form: ', err);
        res.status(500).send('Error rendering new course page/form');
    }
};

// Render edit courses page and form
export const getEditCourseForm = async(req, res) => {
    try {
        // Run query to get course with given id and prepopulate form
        let results = await coursesModel.getCourseById(req.query.id);
        res.render('edit-course', {course: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit course page/form: ', err);
        res.status(500).send('Error rendering edit course page/form');
    }
};

// Add a new course
export const addCourse = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'course': req.body.course,
    };

    try {
        // Run query to insert a new course with given data
        let results = await coursesModel.addCourse(queryParams);
        res.status(201).redirect('/courses');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new course', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Update a course
export const updateCourse = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'course': req.body.course,
        'id': req.body.id
    };

    try {
        // Run query to update given course with new data
        let results = await coursesModel.updateCourse(queryParams);
        res.status(200).render('courses');
    } catch(err) {
        // Send error status and message
        console.error('Error editing course', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Delete a course
export const deleteCourse = async(req, res) => {
    try {
        // Run query to delete course with the given id
        let results = await coursesModel.deleteCourse(req.body.id);
        res.status(204).render('courses');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting course', err);
        res.status(500).send('Error deleting course');
    }
};

// Get one course by id
export const getOneCourse = async(req, res) => {
    try {
        //Run query to get course with given id
        let results = await coursesModel.getCourseById(req.body.id);
        res.status(200).json({course: results[0]})
    } catch(err) {
        // Send error status and message
        console.error('Error selecting course', err);
        res.status(500).send('Error selecting course');
    }
};