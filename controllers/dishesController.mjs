// Import models
import * as dishesModel from '../models/dishesModel.mjs';
import * as coursesModel from '../models/coursesModel.mjs';
import * as teamsModel from '../models/teamsModel.mjs';
import * as eventYearsModel from '../models/eventYearsModel.mjs';

// Render main dishes page and table
export const getDishesTable = async(req, res) => {
    try {
        // Run query to get all dishes and populate table
        let results = await dishesModel.getAllDishes();
        res.status(200).render('dishes', {dish: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting dishes: ', err);
        res.status(500).send('Error selecting dishes');
    }
};

// Render new dish page and form
export const getNewDishForm = async(req, res) => {
    try {
        // Initialize results object
        let results = {};

        // Run queries to prepopulate drop downs
        results.course = await coursesModel.getAllCourses();
        results.team = await teamsModel.getAllTeams();
        results.eventYear = await eventYearsModel.getAllEventYears();

        // Render new dish page and form
        res.status(200).render('new-dish', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new dish page/form: ', err);
        res.status(500).send('Error rendering new dish page/form');
    }
};

// Render edit dish page and form
export const getEditDishForm = async(req, res) => {
    try {
        // Run queries to get dish with given id and prepopulate drop downs
        let dish = await dishesModel.getDishById(req.query.id);
        let course = await coursesModel.getAllCourses();
        let team = await teamsModel.getAllTeams();
        let eventYear = await eventYearsModel.getAllEventYears();

        // Get the dish to edit
        dish = dish[0]

        // Initialize results object
        let results = {
            'dish': dish,
            'course': course,
            'team': team,
            'eventYear': eventYear
        };

        // Set preselected options to the correct choices
        course.forEach(course => course.selected = (course.ID === dish.course_id) ? "selected" : "");
        team.forEach(team => team.selected = (team.ID === dish.team_id) ? "selected" : "");
        eventYear.forEach(eventYear => eventYear.selected = (eventYear.ID === dish.event_year_id) ? "selected" : "");

        // Render page with form elements prepopulated
        res.render('edit-dish', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit dish page/form: ', err);
        res.status(500).send('Error rendering edit dish page/form');
    }
};

// Add a new dish
export const addDish = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'dishName': req.body.dishName,
        'dishImage': req.body.dishImage,
        'description': req.body.description,
        'courseId': req.body.courseId,
        'teamId': req.body.teamId,
        'eventYearId': req.body.eventYearId
    };

    console.log(queryParams);

    try {
        // Run query to insert a new dish with given data
        let results = await dishesModel.addDish(queryParams);
        res.status(201).redirect('/dishes');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new dish', err);
        res.status(500).send('Error adding new dish');
    }
};

// Update a dish 
export const updateDish = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'dishName': req.body.dishName,
        'dishImage': req.body.dishImage,
        'description': req.body.description,
        'courseId': req.body.courseId,
        'teamId': req.body.teamId,
        'eventYearId': req.body.eventYearId,
        'id': req.body.id
    };

    try {
        // Run query to update given dish with new data
        let results = await dishesModel.updateDish(queryParams);
        res.status(200).render('dishes');
    } catch(err) {
        // Send error status and message
        console.error('Error editing dish', err);
        res.status(500).send('Error editing dish');
    }
};

// Delete a dish
export const deleteDish = async(req, res) => {
    try {
        // Run query to delete dish with the given id
        let results = await dishesModel.deleteDish(req.body.id);
        res.status(204).render('dishes');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting dish', err);
        res.status(500).send('Error deleting dish');
    }
};