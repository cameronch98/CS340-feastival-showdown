// App.js

/*
    SETUP
*/

// Express
var express = require('express');
var app     = express();
PORT        = 9022;

// Path
var path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

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

// GETs

app.get('/', function(req, res)
    {
        res.render('index');
    });

app.get('/attendees', function(req, res)
    {   // Run the select attendees query
        db.pool.query(queries.selectAttendees, function(error, rows, fields){

            // Render attendee page and tables
            res.render('attendees', {attendee: rows});
        })
    });

app.get('/new-attendee', function(req, res)
{   // link to add new attendee
    res.render('new-attendee')
});

app.get('/edit-attendee', function(req, res)
{   
    const attendeeID = req.query.id
    console.log("attendeID:", attendeeID)
    db.pool.query(queries.selectEditAttendee, [attendeeID], function(err, results){
        if (err){
            console.error('Error fetching attendee: ', err);
            res.status(500).send('Error fetching attendee');
        } else {
            console.log("results: ", results[0])
            res.render('edit-attendee', {attendee: results[0]});
        }
    })
});

app.get('/competitor-registrations', function(req, res)
{   // Run the select competitor registrations query
    db.pool.query(queries.selectCompetitorRegs, function(error, rows, fields){

        // Render competitor registrations page and tables
        res.render('competitor-registrations', {competitorReg: rows});
    })
});

app.get('/new-competitor-registration', function(req, res)
{   
    // Run the competitors query to prepopulate drop down
    db.pool.query(queries.selectCompetitors, function(error, rows, fields){

        // Add competitors to results
        let results = {competitor:rows};

        // Run the teams query to prepopulate drop down
        db.pool.query(queries.selectTeams, function(error, rows, fields){

            // Add teams to results
            results.team = rows;

            // Run the event years query to prepopulate drop down
            db.pool.query(queries.selectEventYears, function(error, rows, fields){

                // Add min max years to results
                results.year = rows;

                // Render page
                res.render('new-competitor-registration', results);
            })
        })
    })
});

app.get('/competitors', function(req, res)
{   // Run the select competitors query
    db.pool.query(queries.selectCompetitors, function(error, rows, fields){

        // Render competitors page and tables
        res.render('competitors', {competitor: rows});
    })
});

app.get('/new-competitor', function(req, res)
{
    res.render('new-competitor')
});

app.get('/edit-competitor', function(req, res)
{   
    const competitorID = req.query.id
    console.log("competitorID:", competitorID)
    db.pool.query(queries.selectEditCompetitor, [competitorID], function(err, results){
        if (err){
            console.error('Error fetching attendee: ', err);
            res.status(500).send('Error fetching attendee');
        } else {
            console.log("results: ", results[0])
            res.render('edit-competitor', {competitor: results[0]});
        }
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

app.get('/new-dish', function(req, res)
{   
    // Run the courses query to prepopulate drop down
    db.pool.query(queries.selectCourses, function(error, rows, fields){

        // Add competitors to results
        let results = {course:rows};

        // Run the teams query to prepopulate drop down
        db.pool.query(queries.selectTeams, function(error, rows, fields){

            // Add teams to results
            results.team = rows;

            // Run the event years query to prepopulate drop down
            db.pool.query(queries.selectEventYears, function(error, rows, fields){

                // Add min max years to results
                results.year = rows;

                // Render page
                res.render('new-dish', results);
            })
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

app.get('/new-event-year', function(req, res)
{
    res.render('new-event-year')
});

app.get('/ratings', function(req, res)
{   // Run the select ratings query
    db.pool.query(queries.selectRatings, function(error, rows, fields){

        // Render ratings page and tables
        res.render('ratings', {rating: rows});
    })
});

app.get('/new-rating', function(req, res)
{   
    // Run the dishes query to prepopulate drop down
    db.pool.query(queries.selectDishes, function(error, rows, fields){

        // Add competitors to results
        let results = {dish:rows};

        // Run the attendees query to prepopulate drop down
        db.pool.query(queries.selectAttendees, function(error, rows, fields){

            // Add teams to results
            results.attendee = rows;

            // Render page
            res.render('new-rating', results);
        })
    })
});

app.get('/teams', function(req, res)
{   // Run the select teams query
    db.pool.query(queries.selectTeams, function(error, rows, fields){

        // Render teams page and tables
        res.render('teams', {team: rows});
    })
});

app.get('/new-team', function(req, res)
{
    res.render('new-team')
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

app.get('/new-ticket-sale', function(req, res)
{   
    // Run the attendees query to prepopulate drop down
    db.pool.query(queries.selectAttendees, function(error, rows, fields){

        // Add competitors to results
        let results = {attendee:rows};

        // Run the teams query to prepopulate drop down
        db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

            // Add teams to results
            results.ticketType = rows;

            // Run the event years query to prepopulate drop down
            db.pool.query(queries.selectEventYears, function(error, rows, fields){

                // Add min max years to results
                results.year = rows;

                // Render page
                res.render('new-ticket-sale', results);
            })
        })
    })
});

// POSTs

app.post('/add-attendee-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.name, data.email, data.phone];
    console.log(queryParams);

    db.pool.query(queries.insertAttendee, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newAttendee = {
                id: result.insertId,
                name: data.name,
                email: data.email,
                phone: data.phone
            };
            res.status(200).json({ message: 'Attendee added successfully', newAttendee: newAttendee });
        }
    });
});

app.post('/add-competitor-registration-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.competitor, data.team, data.year];
    console.log(queryParams);

    db.pool.query(queries.insertCompetitorReg, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newCompetitorReg = {
                id: result.insertId,
                competitor: data.competitor,
                team: data.team,
                year: data.year
            };
            res.status(200).json({ message: 'Competitor registration added successfully', newCompetitorReg: newCompetitorReg });
        }
    });
});

app.post('/add-competitor-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.name, data.email, data.phone];
    console.log(queryParams);

    db.pool.query(queries.insertCompetitor, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newCompetitor = {
                id: result.insertId,
                name: data.name,
                email: data.email,
                phone: data.phone
            };
            res.status(200).json({ message: 'Competitor added successfully', newCompetitor: newCompetitor });
        }
    });
});

app.post('/add-dish-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [
        data.dishName,
        data.dishImage,
        data.description, 
        data.course,
        data.team,
        data.year
    ];
    console.log(queryParams);

    db.pool.query(queries.insertDish, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newDish = {
                id: result.insertId,
                dishName: data.dishName,
                dishImage: data.dishImage,
                description: data.description,
                course: data.course,
                team: data.team,
                year: data.year
            };
            res.status(200).json({ message: 'Dish added successfully', newDish: newDish });
        }
    });
});

app.post('/add-event-year-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.year];
    console.log(queryParams);

    db.pool.query(queries.insertEventYear, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newEventYear = {
                id: result.insertId,
                year: data.year
            };
            res.status(200).json({ message: 'Event year added successfully', newEventYear: newEventYear });
        }
    });
});

app.post('/add-rating-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.dish, data.rating, data.comments, data.attendee];
    console.log(queryParams);

    db.pool.query(queries.insertRating, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newRating = {
                id: result.insertId,
                dish: data.dish,
                rating: data.rating,
                comments: data.comments,
                attendee: data.attendee
            };
            res.status(200).json({ message: 'Rating added successfully', newRating: newRating });
        }
    });
});

app.post('/add-team-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.name];
    console.log(queryParams);

    db.pool.query(queries.insertTeam, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newTeam = {
                id: result.insertId,
                name: data.name
            };
            res.status(200).json({ message: 'Team added successfully', newTeam: newTeam });
        }
    });
});

app.post('/add-ticket-sale-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.attendee, data.ticketType, data.total, data.year];
    console.log(queryParams);

    db.pool.query(queries.insertTicketSale, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newTicketSale = {
                id: result.insertId,
                attendee: data.attendee,
                ticketType: data.ticketType,
                total: data.total,
                year: data.year
            };
            res.status(200).json({ message: 'Ticket sale added successfully', newTicketSale: newTicketSale });
        }
    });
});

// PUTs

app.put('/edit-attendee-ajax', function(req, res){
    let data = req.body
    let queryParams = [data.name, data.email, data.phone, data.id]
    console.log(queryParams);
    db.pool.query(queries.updateAttendee, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedAttendee = {
                id: result.id,
                name: data.name,
                email: data.email,
                phone: data.phone
               
            };
            res.status(200).json({ message: 'Attendee updated successfully', updatedAttendee: updatedAttendee });
        }
    });
});


app.put('/edit-competitor-ajax', function(req, res){
    let data = req.body
    let queryParams = [data.name, data.email, data.phone, data.id]
    console.log(queryParams);
    db.pool.query(queries.updateCompetitor, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedCompetitor = {
                id: result.id,
                name: data.name,
                email: data.email,
                phone: data.phone
               
            };
            res.status(200).json({ message: 'Competitor updated successfully', updatedCompetitor: updatedCompetitor });
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});