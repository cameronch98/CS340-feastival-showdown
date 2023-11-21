// Import attendees model
var attendeesModel = require('../models/attendeesModel');

// Render main attendees page and table
getAttendeesTable = async(req, res) => {

    // Run query to get all attendees and populate table
    let results = await attendeesModel.getAllAttendees();
    res.render('attendees', {attendee: results});

};

// Render new attendee page and form
getNewAttendeeForm = async(req, res) => {

    res.render('new-attendee');

};

// Render edit attendee page and form
getEditAttendeeForm = async(req, res) => {

    // Run query to get attendee with given id and prepopulate form
    let results = await attendeesModel.getAttendeeById(req.query.id);
    res.render('edit-attendee', {attendee: results[0]});

};

// Add a new attendee
addAttendee = async(req, res) => {

    // Get query paramaters
    let queryParams = {
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone
    };

    // Run query to insert a new attendee with given data
    let results = await attendeesModel.addAttendee(queryParams);
    
};

// Update an attendee
updateAttendee = async(req, res) => {

    // Get query parameters
    let queryParams = {
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
        'id': req.body.id
    };

    // Run query to update given attendee with new data
    let results = await attendeesModel.updateAttendee(queryParams);

};

// Delete an attendee
deleteAttendee = async(req, res) => {

    // Run query to delete attendee with the given id
    let results = await attendeesModel.deleteAttendee(req.body.id);

};

let attendeesController = {
    'getAttendeesTable': getAttendeesTable,
    'getNewAttendeeForm': getNewAttendeeForm,
    'getEditAttendeeForm': getEditAttendeeForm,
    'addAttendee': addAttendee,
    'updateAttendee': updateAttendee,
    'deleteAttendee': deleteAttendee
};

exports.attendeesController = attendeesController;