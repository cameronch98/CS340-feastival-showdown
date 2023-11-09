// App.js

/*
    SETUP
*/

// Express
var express = require('express');
var app     = express();
PORT        = 9023;

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

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/attendees', function(req, res) {   
    // Run the select attendees query
    db.pool.query(queries.selectAttendees, function(error, rows, fields){

        // Render attendee page and tables
        res.render('attendees', {attendee: rows});
    })
});

app.get('/new-attendee', function(req, res) {   // link to add new attendee
    res.render('new-attendee')
});

app.get('/edit-attendee', function(req, res) {   
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

app.get('/competitor-registrations', function(req, res) {   // Run the select competitor registrations query
    db.pool.query(queries.selectCompetitorRegs, function(error, rows, fields){

        // Render competitor registrations page and tables
        res.render('competitor-registrations', {competitorReg: rows});
    })
});

app.get('/new-competitor-registration', function(req, res) {   
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

app.get('/edit-competitor-registration', function(req, res) {   
    let regID = req.query.id
    console.log("regID", regID)
    db.pool.query(queries.selectEditReg,[regID], function(err, results){
        if (err){
            console.error('Error fetching competitor registration', err);
            res.status(500).send('Error fetching competitor registration')
        } else {
            let selectedReg = results[0];

            // Run the competitors query to prepopulate drop down
            db.pool.query(queries.selectCompetitors, function(error, rows, fields){

                rows.forEach(competitor=>{
                    competitor.selected = (competitor.ID == selectedReg.competitor_id) ? "selected" : "";
                })
                
                // Add competitors to results
                let resultsNew = {
                    selectedReg: selectedReg,
                    competitor:rows
                };

                // Run the teams query to prepopulate drop down
                db.pool.query(queries.selectTeams, function(error, rows, fields){

                    rows.forEach(team=>{
                        team.selected = (team.ID == selectedReg.team_id) ? "selected" : "";
                    })
                    // Add teams to results
                    resultsNew.team = rows;

                    // Run the event years query to prepopulate drop down
                    db.pool.query(queries.selectEventYears, function(error, rows, fields){
                        
                        rows.forEach(year=>{
                            year.selected = (year.ID == selectedReg.even_year_id) ? "selected" : "";
                        })
                        // Add min max years to results
                        resultsNew.year = rows;

                        console.log("final object: ", resultsNew)
                        // Render page
                        res.render('edit-competitor-registration', resultsNew);
            })
        })
    })


        }
    })


});

app.get('/competitors', function(req, res) {   // Run the select competitors query
    db.pool.query(queries.selectCompetitors, function(error, rows, fields){

        // Render competitors page and tables
        res.render('competitors', {competitor: rows});
    })
});

app.get('/new-competitor', function(req, res) {
    res.render('new-competitor')
});

app.get('/edit-competitor', function(req, res) {   
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

app.get('/dishes', function(req, res) {   // Run the select dishes query
    db.pool.query(queries.selectDishes, function(error, rows, fields){

        // Render dishes page and dishes/courses tables
        res.render('dishes', {dish:rows});
    })
});

app.get('/new-dish', function(req, res) {   
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

app.get('/edit-dish', function(req, res) {   
    const dishID = req.query.id;
    console.log("dishID: ", dishID);
    db.pool.query(queries.selectEditDish, [dishID], function(err, results){
        
        if(err){
        
            console.error('Error fetching dish', err);
            res.status(500).send('Error fetchig dish');
        
        } else {

            let selectedDish = results[0];
            // Run the courses query to prepopulate drop down
            db.pool.query(queries.selectCourses, function(error, rows, fields){
                
                rows.forEach(course=>{
                    course.selected = (course.ID == selectedDish.course_id) ? "selected" : "";
                })

                // Add competitors to results
                let resultsNew = {
                    selectedDish: selectedDish,
                    course: rows,
                
                };

                // Run the teams query to prepopulate drop down
                db.pool.query(queries.selectTeams, function(error, rows, fields){

                    rows.forEach(team=>{
                        team.selected = (team.ID == selectedDish.team_id) ? "selected" : "";
                    })

                    // Add teams to results
                    resultsNew.team = rows;

                    // Run the event years query to prepopulate drop down
                     db.pool.query(queries.selectEventYears, function(error, rows, fields){

                        rows.forEach(eventYear=>{
                            eventYear.selected = (eventYear.ID == selectedDish.event_year_id) ? "selected" : "";
                        })
                        // Add min max years to results
                        resultsNew.year = rows;

                        console.log('final object: ', resultsNew)
                        // Render page
                        res.render('edit-dish', resultsNew);
            })
        })
    })

        }
    })
    
});

app.get('/discounts', function(req, res) {
    // Run discounts query
    db.pool.query(queries.selectDiscounts, function(error, rows, fields){

        // Render discounts page and table
        res.render('discounts', {discount: rows});
    })
});

app.get('/new-discount', function(req, res) {
    // Render edit page for discounts
    res.render('new-discount')
})

app.get('/courses', function(req, res) {
    // Run courses query
    db.pool.query(queries.selectCourses, function(error, rows, fields){

        // Render course page and table
        res.render('courses', {course: rows});
    })
});

app.get('/new-course', function(req, res) {
    // Render edit page for courses
    res.render('new-course')
})

app.get('/event-years', function(req, res) {   
    // Run the select event years query
    db.pool.query(queries.selectEventYears, function(error, rows, fields){

        // Render event years page and tables
        res.render('event-years', {eventYear: rows});
    })
});

app.get('/new-event-year', function(req, res) {
    res.render('new-event-year')
});

app.get('/edit-event-year', function(req, res) {   
    const eventYearID = req.query.id
    console.log("eventYearID:", eventYearID)
    db.pool.query(queries.selectEditEventYear, [eventYearID], function(err, results){
        if (err){
            console.error('Error fetching event year: ', err);
            res.status(500).send('Error fetching event year');
        } else {
            console.log("results: ", results[0])
            res.render('edit-event-year', {eventYear: results[0]});
        }
    })
});


app.get('/ratings', function(req, res) { 
    // Run the select ratings query
    db.pool.query(queries.selectRatings, function(error, rows, fields){

        // Render ratings page and tables
        res.render('ratings', {rating: rows});
    })
});

app.get('/new-rating', function(req, res) {   
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

app.get('/edit-rating', function(req, res) {   
    const ratingID = req.query.id;
    console.log("ratingID from Get: ", ratingID)

    // retrieve the current rating
    db.pool.query('SELECT * from Ratings WHERE rating_id = ?;', [ratingID], function(err, results){
        if (err){
            console.error('Error fetching rating:', err);
            res.status(500).send('Error fetching rating');
        } else {
            // use it as a base
            let selectedRating = results[0];

            // Run the dishes query to prepopulate drop down
            db.pool.query(queries.selectDishes, function(error, rows, fields){

                rows.forEach(dish=>{
                    dish.selected = (dish.ID == selectedRating.rating_id) ? "selected" : ""
                })

                let resultsNew = {
                    selectedRating: selectedRating,
                    dish:rows
                }

                // Run the attendees query to prepopulate drop down
                db.pool.query(queries.selectAttendees, function(error, rows, fields){
                    
                    rows.forEach(attendee=>{
                        attendee.selected = (attendee.ID == selectedRating.attendee_id) ? "selected" : ""
                    })

                    // Add attendee to results
                    resultsNew.attendee = rows;
                    
                    console.log("final object: ", resultsNew)
                    // Render page
                    res.render('edit-rating', resultsNew);
                })
            })

        }
    })
});

app.get('/teams', function(req, res) {   
    // Run the select teams query
    db.pool.query(queries.selectTeams, function(error, rows, fields){

        // Render teams page and tables
        res.render('teams', {team: rows});
    })
});

app.get('/new-team', function(req, res) {
    res.render('new-team')
});

app.get('/edit-team', function(req, res) {   
    const teamID = req.query.id
    console.log("teamID:", teamID)
    db.pool.query(queries.selectEditTeam, [teamID], function(err, results){
        if (err){
            console.error('Error fetching attendee: ', err);
            res.status(500).send('Error fetching attendee');
        } else {
            console.log("results: ", results[0])
            res.render('edit-team', {team: results[0]});
        }
    })
});


app.get('/ticket-sales', function(req, res) {
    // Run the select ticket sales query
    db.pool.query(queries.selectTicketSales, function(error, rows, fields){

        // Render results on page
        res.render('ticket-sales', {ticketSale: rows});
    })
});

app.get('/new-ticket-sale', function(req, res) {
    // Run the attendees query to prepopulate drop down
    db.pool.query(queries.selectAttendees, function(error, rows, fields){

        // Add competitors to results
        let results = {attendee:rows};

        // Run the tickets query to prepopulate drop down
        db.pool.query(queries.selectTickets, function(error, rows, fields){

            // Add teams to results
            results.ticket = rows;

            // Run the discounts query to prepopulate drop down
            db.pool.query(queries.selectDiscounts, function(error, rows, fields){

                // Add min max years to results
                results.discount = rows;

                // Render page
                res.render('new-ticket-sale', results);
            })
        })
    })
});

app.get('/edit-ticket-sale', function(req, res) {

    const ticketSaleID = req.query.id
    console.log("ticketSaleID:", ticketSaleID)

    // retrieve the current ticket id object
    db.pool.query('SELECT * from Ticket_Sales WHERE ticket_sale_id = ?;',[ticketSaleID], function(err, results){
        if (err){
            console.error('Error fetching ticket_sale: ', err);
            res.status(500).send('Error fetching ticket_sale');
        } else {
            // use it as a base
            let selectedTicket = results[0];
            
            db.pool.query(queries.selectAttendees, function(error, rows, fields){

                // add a new "selected" key to identify it
                rows.forEach(attendee =>{
                    attendee.selected = (attendee.ID == selectedTicket.attendee_id) ? "selected" : ""
                })
                // create results object to send 
                let resultsNew = {
                    selectedTicket: selectedTicket,
                    attendee:rows
                }

                
                // ticket types query
                db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

                    rows.forEach(ticketType =>{
                        ticketType.selected = (ticketType.ID == selectedTicket.ticket_type_id) ? "selected" : ""
                    })
        
                    
                    resultsNew.ticketType = rows;
        
                    // Event years
                    db.pool.query(queries.selectEventYears, function(error, rows, fields){
        

                        rows.forEach(eventYear =>{
                            eventYear.selected = (eventYear.ID == selectedTicket.event_year_id) ? "selected" : ""
                        })
                        
                        resultsNew.year = rows;
                        
                        console.log("final object: ", resultsNew)
                        // Render page
                        res.render('edit-ticket-sale', resultsNew);
                    })
                })
            })
            
        }
    })
});

app.get('/tickets', function(req, res){
    // Run the select tickets query
    db.pool.query(queries.selectTickets, function(error, rows, fields){

        // Render tickets page and tables
        res.render('tickets', {ticket: rows});
    })
});

app.get('/new-ticket', function(req, res){
    // Run the ticket types query to prepopulate drop down
    db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

        // Add ticket types to results
        let results = {ticketType: rows};

        // Run the years query to prepopulate drop down
        db.pool.query(queries.selectEventYears, function(error, rows, fields){

            // Add event years to results
            results.year = rows;

            // Render new ticket page
            res.render('new-ticket', results);
        })
    })
});

app.get('/ticket-types', function(req, res){
    // Run the select ticket types query
    db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

        // Render ticket types page and tables
        res.render('ticket-types', {ticketType: rows});
    })
});

app.get('/new-ticket-type', function(req, res) {
    // Render edit page for ticket types
    res.render('new-ticket-type')
})

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

app.post('/add-discount-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.discount, data.percent];
    console.log(queryParams);

    db.pool.query(queries.insertDiscount, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newDiscount = {
                id: result.insertId,
                discount: data.discount,
                percent: data.percent
            };
            res.status(200).json({ message: 'Discount added successfully', newDiscount: newDiscount });
        }
    });
});

app.post('/add-course-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.course];
    console.log(queryParams);

    db.pool.query(queries.insertCourse, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newCourse = {
                id: result.insertId,
                course: data.course,
            };
            res.status(200).json({ message: 'Course added successfully', newCourse: newCourse });
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
    if (data.discount === "") {
        data.discount = NULL;
    };
    let queryParams = [data.attendee, data.ticket, data.discount];

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
                ticket: data.ticket,
                discount: data.discount,
            };
            res.status(200).json({ message: 'Ticket sale added successfully', newTicketSale: newTicketSale });
        }
    });
});

app.post('/add-ticket-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.price, data.ticketType, data.year];
    console.log(queryParams);

    db.pool.query(queries.insertTicket, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newTicket = {
                id: result.insertId,
                price: data.price,
                ticketType: data.ticketType,
                year: data.year
            };
            res.status(200).json({ message: 'Ticket added successfully', newTicket: newTicket });
        }
    });
});

app.post('/add-ticket-type-ajax', function(req, res) {
    let data = req.body;
    let queryParams = [data.ticketType];
    console.log(queryParams);

    db.pool.query(queries.insertTicketType, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let newTicketType = {
                id: result.insertId,
                ticketType: data.ticketType
            };
            res.status(200).json({ message: 'Ticket type added successfully', newTicketType: newTicketType });
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

app.put('/edit-team-ajax', function(req, res){
    let data = req.body
    let queryParams = [data.name, data.id]
    console.log(queryParams);
    db.pool.query(queries.updateTeam, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedTeam = {
                id: result.id,
                name: data.name,
               
            };
            res.status(200).json({ message: 'Team updated successfully', updatedTeam: updatedTeam });
        }
    });
});

app.put('/edit-event-year-ajax', function(req, res){
    let data = req.body
    let queryParams = [data.year, data.id]
    console.log(queryParams);
    db.pool.query(queries.updateEventYear, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedEventYear = {
                id: result.id,
                year: data.year,
               
            };
            res.status(200).json({ message: 'Event Year updated successfully', updatedEventYear: updatedEventYear });
        }
    });
});

app.put('/edit-ticket-sale-ajax', function(req, res){
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.attendee, data.ticketType, data.total, data.year, data.id]
    //console.log(queryParams);
    db.pool.query(queries.updateTicketSales, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedTicketSale = {
                id: result.id,
                ticketType: result.ticketType,
                attendee: result.attendee,
                total: result.total,
                year: data.year
            };
            res.status(200).json({ message: 'Event Year updated successfully', updatedTicketSale: updatedTicketSale });
        }
    });
});

app.put('/edit-rating-ajax', function(req, res){
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.dish, data.rating, data.comments, data.attendee, data.id]
    console.log(queryParams);
    db.pool.query(queries.updateRating, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedTicketSale = {
                id: result.id,
                ticketType: result.ticketType,
                attendee: result.attendee,
                total: result.total,
                year: data.year
            };
            res.status(200).json({ message: 'Event Year updated successfully', updatedTicketSale: updatedTicketSale });
        }
    });
});

app.put('/edit-dish-ajax', function(req, res){
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.dishName, data.dishImage, data.description, data.course, data.team, data.year, data.dishId]
    console.log(queryParams);
    db.pool.query(queries.updateDish, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedDish = {
                id: result.dishId,
                name: result.dishName,
                description: result.description,
                course: result.course,
                team: result.team,
                year: result.year
            };
            res.status(200).json({ message: 'dish updated successfully', updatedDish: updatedDish });
        }
    });
});

app.put('/edit-competitor-registration-ajax', function(req, res){
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.competitor, data.team, data.year, data.id]
    console.log(queryParams);
    db.pool.query(queries.updateReg, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedRed = {
                id: result.id,
                competitor: result.competitor,
                team: result.team,
                year: result.year,

            };
            res.status(200).json({ message: 'dish updated successfully', updatedRed: updatedRed });
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});