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

// Queries
const { queries } = require('./queries.js');

/*
    ROUTES
*/

// Load static files
app.use(express.static(path.join(__dirname, '/public')));

// Render index.hbs
app.get('/', function(req, res)
    {
        res.render('index');
    });

// app.js

app.get('/attendees', function(req, res)
    {   // Run the select attendees query
        db.pool.query(queries.selectAttendees, function(error, rows, fields){

            // Render attendee page and tables
            res.render('attendees', {attendee: rows});
        })
    });

app.get('/competitor-registrations', function(req, res)
{   // Run the select competitor registrations query
    db.pool.query(queries.selectCompetitorRegs, function(error, rows, fields){

        // Render competitor registrations page and tables
        res.render('competitor-registrations', {competitorReg: rows});
    })
});

app.get('/competitors', function(req, res)
{   // Run the select competitors query
    db.pool.query(queries.selectCompetitors, function(error, rows, fields){

        // Render competitors page and tables
        res.render('competitors', {competitor: rows});
    })
});

app.get('/dishes', function(req, res)
{   // Run the select attendees query
    db.pool.query(queries.selectDishes, function(error, rows, fields){

        // Add dishes to results
        let results = {dish: rows};

        // Run courses query
        db.pool.query(queries.selectCourses, function(error, rows, fields){

            // Add courses to results
            results.course = rows;

            // Render dishes page and dishes/courses tables
            res.render('dishes', results);
        })
    })
});

app.get('/event-years', function(req, res)
{   // Run the select event years query
    db.pool.query(queries.selectEventYears, function(error, rows, fields){

        // Render event years page and tables
        res.render('event-years', {eventYear: rows});
    })
});

app.get('/ratings', function(req, res)
{   // Run the select ratings query
    db.pool.query(queries.selectRatings, function(error, rows, fields){

        // Render ratings page and tables
        res.render('ratings', {rating: rows});
    })
});

app.get('/teams', function(req, res)
{   // Run the select teams query
    db.pool.query(queries.selectTeams, function(error, rows, fields){

        // Render teams page and tables
        res.render('teams', {team: rows});
    })
});

app.get('/ticket-sales', function(req, res)
{   // Run the select ticket sales query
    db.pool.query(queries.selectTicketSales, function(error, rows, fields){

        // Add ticket sales to results
        let results = {ticketSale: rows};

        // Run the select ticket types query
        db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

            // Add ticket types to results
            results.ticketType = rows;

            // Render attendee page and tables
            res.render('ticket-sales', results);
        })
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});