import express from 'express';
import * as teamsController from '../controllers/teamsController.mjs';

// Initialize teams router
const teamsRoutes = express.Router();

// Define teams routes
teamsRoutes
    .get('/', teamsController.getTeamsTable)
    .get('/get-team', teamsController.getOneTeam)
    .get('/new-team', teamsController.getNewTeamForm)
    .get('/edit-team', teamsController.getEditTeamForm)
    .post('/new-team/fetch', teamsController.addTeam)
    .put('/edit-team/fetch', teamsController.updateTeam)
    .delete('/delete-team/fetch', teamsController.deleteTeam)

export { teamsRoutes };