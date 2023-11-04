// App.js

/*
    SETUP
*/

// Express
var express = require('express');
var app     = express();
PORT        = 8991;

// Path
var path = require('path');

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

// Load static files
app.use(express.static(path.join(__dirname, '/public')));

// Render index.hbs
app.get('/', function(req, res)
    {
        res.render('index', {
            pageName: 'index'
        });
    });

// Render attendees.hbs
app.get('/attendees', function(req, res)
    {
        res.render('attendees', {
            pageName: 'attendees'
        });
    });

// Render index.hbs
app.get('/competitor-registrations', function(req, res)
    {
        res.render('competitor-registrations', {
            pageName: 'competitor-registrations'
        });
    });

// Render index.hbs
app.get('/competitors', function(req, res)
    {
        res.render('competitors', {
            pageName: 'competitors'
        });
    });

// Render index.hbs
app.get('/dishes', function(req, res)
    {
        res.render('dishes', {
            pageName: 'dishes'
        });
    });

// Render index.hbs
app.get('/event-years', function(req, res)
    {
        res.render('event-years', {
            pageName: 'event-years'
        });
    });

// Render index.hbs
app.get('/ratings', function(req, res)
    {
        res.render('ratings', {
            pageName: 'ratings'
        });
    });

// Render index.hbs
app.get('/teams', function(req, res)
    {
        res.render('teams', {
            pageName: 'teams'
        });
    });

// Render index.hbs
app.get('/ticket-sales', function(req, res)
    {
        res.render('ticket-sales', {
            pageName: 'ticket-sales'
        });
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});