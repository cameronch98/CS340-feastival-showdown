// Import competitors model
import * as competitorsModel from '../models/competitorsModel.mjs';

// Render main competitors page and table
export const getCompetitorsTable = async(req, res) => {
    try {
        // Run query to get all competitors and populate table
        let results = await competitorsModel.getAllCompetitors();
        res.status(200).render('competitors', {competitor: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting competitors: ', err);
        res.status(500).send('Error selecting competitors');
    }
};

// Render new competitor page and form
export const getNewCompetitorForm = async(req, res) => {
    try {
        // Render new competitor page and form
        res.status(200).render('new-competitor');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new competitor page/form: ', err);
        res.status(500).send('Error rendering new competitor page/form');
    }
};

// Render edit competitor page and form
export const getEditCompetitorForm = async(req, res) => {
    try {
        // Run query to get competitor with given id and prepopulate form
        let results = await competitorsModel.getCompetitorById(req.query.id);
        res.render('edit-competitor', {competitor: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit competitor page/form: ', err);
        res.status(500).send('Error rendering edit competitor page/form');
    }
};

// Add a new competitor
export const addCompetitor = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
    };

    try {
        // Run query to insert a new competitor with given data
        let results = await competitorsModel.addCompetitor(queryParams);
        res.status(201).redirect('/competitors');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new competitor', err);
        res.status(500).json({sqlError: err.errno, sqlMessage: err.sqlMessage});
    }
};

// Update a competitor
export const updateCompetitor = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
        'id': req.body.id
    };

    try {
        // Run query to update given competitor with new data
        let results = await competitorsModel.updateCompetitor(queryParams);
        res.status(200).render('competitors');
    } catch(err) {
        // Send error status and message
        console.error('Error editing competitor', err);
        res.status(500).json({sqlError: err.errno, sqlMessage: err.sqlMessage});
    }
};

// Delete a competitor
export const deleteCompetitor = async(req, res) => {
    try {
        // Run query to delete competitor with the given id
        let results = await competitorsModel.deleteCompetitor(req.body.id);
        res.status(204).render('competitors');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting competitor', err);
        res.status(500).send('Error deleting competitor');
    }
};