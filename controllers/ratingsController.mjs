// Import models
import * as ratingsModel from '../models/ratingsModel.mjs';
import * as dishesModel from '../models/dishesModel.mjs';
import * as attendeesModel from '../models/attendeesModel.mjs';

// Render main ratings page and table
export const getRatingsTable = async(req, res) => {
    try {
        // Run query to get all ratings and populate table
        let results = await ratingsModel.getAllRatings();
        res.status(200).render('ratings', {rating: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting ratings: ', err);
        res.status(500).send('Error selecting ratings');
    }
};

// Render new ratings page and form
export const getNewRatingForm = async(req, res) => {
    try {
        // Initialize results object
        let results = {};

        // Run queries to prepopulate drop downs
        results.dish = await dishesModel.getAllDishes();
        results.attendee = await attendeesModel.getAllAttendees();

        // Render new rating page and form
        res.status(200).render('new-rating', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new rating page/form: ', err);
        res.status(500).send('Error rendering new rating page/form');
    }
};

// Render edit rating page and form
export const getEditRatingForm = async(req, res) => {
    try {
        // Run queries to get rating with given id and prepopulate drop downs
        let rating = await ratingsModel.getRatingById(req.query.id);
        let dish = await dishesModel.getAllDishes();
        let attendee = await attendeesModel.getAllAttendees();

        // Get rating to edit
        rating = rating[0]

        // Initialize results object
        let results = {
            'rating': rating,
            'dish': dish,
            'attendee': attendee,
        };

        // Set preselected options to the correct choices
        dish.forEach(dish => dish.selected = (dish.ID === rating.dish_id) ? "selected" : "");
        attendee.forEach(attendee => attendee.selected = (attendee.ID === rating.attendee_id) ? "selected" : "");

        // Render page with form elements prepopulated
        res.render('edit-rating', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit rating page/form: ', err);
        res.status(500).send('Error rendering edit rating page/form');
    }
};

// Add a new rating
export const addRating = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'dishId': req.body.dishId,
        'rating': req.body.rating,
        'comments': req.body.comments,
        'attendeeId': req.body.attendeeId
    };

    try {
        // Run query to insert a new rating with given data
        let results = await ratingsModel.addRating(queryParams);
        res.status(201).redirect('/ratings');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new rating', err);
        res.status(500).send('Error adding new rating');
    }
};

// Update a rating 
export const updateRating = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'dishId': req.body.dishId,
        'rating': req.body.rating,
        'comments': req.body.comments,
        'attendeeId': req.body.attendeeId,
        'id': req.body.id
    };

    try {
        // Run query to update given rating with new data
        let results = await ratingsModel.updateRating(queryParams);
        res.status(200).render('ratings');
    } catch(err) {
        // Send error status and message
        console.error('Error editing rating', err);
        res.status(500).send('Error editing rating');
    }
};

// Delete a rating
export const deleteRating = async(req, res) => {
    try {
        // Run query to delete rating with the given id
        let results = await ratingsModel.deleteRating(req.body.id);
        res.status(204).render('ratings');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting rating', err);
        res.status(500).send('Error deleting rating');
    }
};

// Get foreign key values of a rating by its id
export const getRatingFKValuesById = async(req, res) => {
    try {
        //Run query to get rating fk values with given id
        let results = await ratingsModel.getRatingFKValuesById(req.body.id);
        res.status(200).json(results[0])
    } catch(err) {
        // Send error status and message
        console.error('Error selecting rating', err);
        res.status(500).send('Error selecting rating');
    }
};