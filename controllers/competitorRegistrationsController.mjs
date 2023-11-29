// Import models
import * as competitorRegistrationsModel from '../models/competitorRegistrationsModel.mjs';
import * as competitorsModel from '../models/competitorsModel.mjs';
import * as teamsModel from '../models/teamsModel.mjs';
import * as eventYearsModel from '../models/eventYearsModel.mjs';

// Render main competitor registrations page and table
export const getCompetitorRegsTable = async(req, res) => {
    try {
        // Run query to get all competitor registrations and populate table
        let results = await competitorRegistrationsModel.getAllCompetitorRegs();
        res.status(200).render('competitor-registrations', {competitorReg: results});
    } catch(err) {
        // Send error status and message
        console.error('Error selecting competitor registrations: ', err);
        res.status(500).send('Error selecting competitor registrations');
    }
};

// Render new competitor registrations page and form
export const getNewCompetitorRegForm = async(req, res) => {
    try {
        // Initialize results object
        let results = {};

        // Run queries to prepopulate drop downs
        results.competitor = await competitorsModel.getAllCompetitors();
        results.team = await teamsModel.getAllTeams();
        results.eventYear = await eventYearsModel.getAllEventYears();

        // Render new competitor registration page and form
        res.status(200).render('new-competitor-registration', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering new competitor registration page/form: ', err);
        res.status(500).send('Error rendering new competitor registration page/form');
    }
};

// Render edit competitor registrations page and form
export const getEditCompetitorReg = async(req, res) => {
    try {
        // Run queries to get competitor registrations with given id and prepopulate drop downs
        let competitorReg = await competitorRegistrationsModel.getCompetitorRegById(req.query.id);
        let competitor = await competitorsModel.getAllCompetitors();
        let team = await teamsModel.getAllTeams();
        let eventYear = await eventYearsModel.getAllEventYears();

        // Initialize results object
        let results = {
            'competitorReg': competitorReg[0],
            'competitor': competitor,
            'team': team,
            'eventYear': eventYear
        };

        // Set preselected options to the correct choices
        let resultsKeys = Object.keys(results)
        for (const key of resultsKeys) {
            if (key === 'competitor') {
                results.competitor.forEach(competitor => {
                    competitor.selected = (competitor.ID === results.competitorReg.competitor_id) ? "selected" : "";
                });
            } else if (key === 'team') {
                results.team.forEach(team => {
                    team.selected = (team.ID === results.competitorReg.team_id) ? "selected" : "";
                });
            } else if (key === 'eventYear') {
                results.eventYear.forEach(eventYear => {
                    eventYear.selected = (eventYear.ID === results.competitorReg.event_year_id) ? "selected" : "";
                });
            }
        };

        // Render page with form elements prepopulated
        res.render('edit-competitor-registration', results);
    } catch(err) {
        // Send error status and message
        console.error('Error rendering edit competitor registration page/form: ', err);
        res.status(500).send('Error rendering edit competitor registration page/form');
    }
};

// Add a new competitor registration
export const addCompetitorReg = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'competitorId': req.body.competitorId,
        'teamId': req.body.teamId,
        'eventYearId': req.body.eventYearId
    };

    try {
        // Run query to insert a new competitor registration with given data
        let results = await competitorRegistrationsModel.addCompetitorReg(queryParams);
        res.status(201).redirect('/competitor-registrations');
    } catch(err) {
        // Send error status and message
        console.error('Error adding new competitor registration', err);
        res.status(500).send('Error adding new competitor registration');
    }
};

// Update a competitor registration 
export const updateCompetitorReg = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'competitorId': req.body.competitorId,
        'teamId': req.body.teamId,
        'eventYearId': req.body.eventYearId,
        'id': req.body.id
    };

    console.log(queryParams);

    try {
        // Run query to update given competitor registration with new data
        let results = await competitorRegistrationsModel.updateCompetitorReg(queryParams);
        res.status(200).render('competitor-registrations');
    } catch(err) {
        // Send error status and message
        console.error('Error editing competitor registration', err);
        res.status(500).send('Error editing competitor registration');
    }
};

// Delete a competitor registration
export const deleteCompetitorReg = async(req, res) => {
    try {
        // Run query to delete competitor registration with the given id
        let results = await competitorRegistrationsModel.deleteCompetitorReg(req.body.id);
        res.status(204).render('competitor-registrations');
    } catch(err) {
        // Send error status and message
        console.error('Error deleting competitor registration', err);
        res.status(500).send('Error deleting competitor registration');
    }
};