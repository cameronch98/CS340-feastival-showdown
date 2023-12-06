// Import teams model
import { query } from 'express';
import * as teamsModel from '../models/teamsModel.mjs';

// Render main teams page and table
export const getTeamsTable = async(req, res) => {
    try {
        // Run query to get all teams and populate table
        let results = await teamsModel.getAllTeams();
        res.status(200).render('teams', {team: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting teams: ', err);
        res.status(500).send('Error selecting teams');
    }
};

// Render new team page and form
export const getNewTeamForm = async(req, res) => {
    try {
        // Render new team page and form
        res.status(200).render('new-team');
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new team page/form: ', err);
        res.status(500).send('Error rendering new team page/form');
    }
};

// Render edit team page and form
export const getEditTeamForm = async(req, res) => {
    try {
        // Run query to get team with given id and prepopulate form
        let results = await teamsModel.getTeamById(req.query.id);
        res.render('edit-team', {team: results[0]});
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit team page/form: ', err);
        res.status(500).send('Error rendering edit team page/form');
    }
};

// Add a new team
export const addTeam = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name
    };

    try {
        // Run query to insert a new team with given data
        let results = await teamsModel.addTeam(queryParams);
        res.status(201).redirect('/teams');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new team', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Update a team
export const updateTeam = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name,
        'id': req.body.id
    };

    try {
        // Run query to update given team with new data
        let results = await teamsModel.updateTeam(queryParams);
        res.status(200).render('teams');
    } catch(err) {
        // Send error status and message
        console.error('Error editing team', err);
        res.status(500).json({sqlError: err.errno});
    }
};

// Delete a team
export const deleteTeam = async(req, res) => {
    try {
        // Run query to delete team with the given id
        let results = await teamsModel.deleteTeam(req.body.id);
        res.status(204).render('teams');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting team', err);
        res.status(500).send('Error deleting team');
    }
};