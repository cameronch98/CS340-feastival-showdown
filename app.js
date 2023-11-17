// App.js

/*
    SETUP
*/

// Express
var express = require('express');
var app     = express();
PORT        = 9024;

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

// ====================================================================================================
// GET ROUTES
// ====================================================================================================

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/attendees', function(req, res) {

    // Run the select attendees query
    db.pool.query(queries.selectAttendees, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error selecting attendees: ', error);
            res.status(500).send('Error selecting attendees');
        } else {
            // Render attendees page and table
            console.log("results: ", rows);
            res.render('attendees', {attendee: rows});
        }
    })
});

app.get('/new-attendee', function(req, res) {
    res.render('new-attendee')
});

app.get('/edit-attendee', function(req, res) { 

    // Get attendee ID from query parameter
    const attendeeID = req.query.id
    console.log("attendeID:", attendeeID)

    // Query for the attendee with the given ID
    db.pool.query(queries.selectEditAttendee, [attendeeID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching attendee: ', err);
            res.status(500).send('Error fetching attendee');
        } else {
            // Render page with form elements prepopulated
            console.log("results: ", results[0])
            res.render('edit-attendee', {attendee: results[0]});
        }
    })
});

app.get('/competitor-registrations', function(req, res) {  

    // Run the select competitor registrations query
    db.pool.query(queries.selectCompetitorRegs, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error selecting competitor registrations: ', error);
            res.status(500).send('Error selecting competitor registrations');
        } else {
            // Render competitor registrations page and table
            console.log("results: ", rows);
            res.render('competitor-registrations', {competitorReg: rows});
        }
    })
});

app.get('/new-competitor-registration', function(req, res) {   

    // Run the competitors query to prepopulate drop down
    db.pool.query(queries.selectCompetitors, function(error, rows, fields){
        let results = {competitor:rows}; // Add competitors to results

        // Run the teams query to prepopulate drop down
        db.pool.query(queries.selectTeams, function(error, rows, fields){
            results.team = rows; // Add teams to results

            // Run the event years query to prepopulate drop down
            db.pool.query(queries.selectEventYears, function(error, rows, fields){
                results.year = rows; // Add years to results

                // Render page with form elements prepopulated
                res.render('new-competitor-registration', results);
            })
        })
    })
});

app.get('/edit-competitor-registration', function(req, res) {

    // Get registration ID from query parameter 
    let regID = req.query.id
    console.log("regID", regID)

    // Query for the registration with the given ID
    db.pool.query(queries.selectEditReg,[regID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching competitor registration', err);
            res.status(500).send('Error fetching competitor registration')
        } else {
            let selectedReg = results[0];

            // Run the competitors query to prepopulate drop down
            db.pool.query(queries.selectCompetitors, function(error, rows, fields){

                // Set preselected option to correct competitor
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

                    // Set preselected option to correct team
                    rows.forEach(team=>{
                        team.selected = (team.ID == selectedReg.team_id) ? "selected" : "";
                    })

                    // Add teams to results
                    resultsNew.team = rows;

                    // Run the event years query to prepopulate drop down
                    db.pool.query(queries.selectEventYears, function(error, rows, fields){
                        
                        // Set preselected option to correct year
                        rows.forEach(year=>{
                            year.selected = (year.ID == selectedReg.even_year_id) ? "selected" : "";
                        })

                        // Add min max years to results
                        resultsNew.year = rows;

                        // Render page with form elements prepopulated
                        console.log("final object: ", resultsNew)
                        res.render('edit-competitor-registration', resultsNew);
                    })
                })
            })
        }
    })
});

app.get('/competitors', function(req, res) {   
    
    // Run the select competitors query
    db.pool.query(queries.selectCompetitors, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching competitors: ', error);
            res.status(500).send('Error fetching competitors');
        } else {
            // Render page with form elements prepopulated
            console.log("results: ", rows)
            res.render('competitors', {competitor: rows});
        }
    })
});

app.get('/new-competitor', function(req, res) {
    res.render('new-competitor')
});

app.get('/edit-competitor', function(req, res) {
    
    // Get competitor ID from query parameter
    const competitorID = req.query.id
    console.log("competitorID:", competitorID)

    // Query for the competitor with the given ID
    db.pool.query(queries.selectEditCompetitor, [competitorID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching competitor: ', err);
            res.status(500).send('Error fetching competitor');
        } else {
            // Render page with form elements prepopulated
            console.log("results: ", results[0])
            res.render('edit-competitor', {competitor: results[0]});
        }
    })
});

app.get('/dishes', function(req, res) {   
    
    // Run the select dishes query
    db.pool.query(queries.selectDishes, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching dishes: ', error);
            res.status(500).send('Error fetching dishes');
        } else {
            // Render dishes page and tables
            console.log("results: ", rows)
            res.render('dishes', {dish: rows});
        }
    })
});

app.get('/new-dish', function(req, res) {

    // Run the courses query to prepopulate drop down
    db.pool.query(queries.selectCourses, function(error, rows, fields){
        let results = {course:rows}; // Add courses to results

        // Run the teams query to prepopulate drop down
        db.pool.query(queries.selectTeams, function(error, rows, fields){
            results.team = rows; // Add teams to results

            // Run the event years query to prepopulate drop down
            db.pool.query(queries.selectEventYears, function(error, rows, fields){
                results.year = rows; // Add years to results

                // Render page with form elements prepopulated
                res.render('new-dish', results);
            })
        })
    })
});

app.get('/edit-dish', function(req, res) {  
    
    // Get dish ID from query parameter
    const dishID = req.query.id;
    console.log("dishID: ", dishID);

    // Query for dish with given ID
    db.pool.query(queries.selectEditDish, [dishID], function(err, results){
        if(err){
            // Send error status and message
            console.error('Error fetching dish', err);
            res.status(500).send('Error fetchig dish');
        } else {
            let selectedDish = results[0];

            // Run the courses query to prepopulate drop down
            db.pool.query(queries.selectCourses, function(error, rows, fields){
                
                // Set preselected option to correct course
                rows.forEach(course=>{
                    course.selected = (course.ID == selectedDish.course_id) ? "selected" : "";
                })

                // Add courses to results
                let resultsNew = {
                    selectedDish: selectedDish,
                    course: rows
                };

                // Run the teams query to prepopulate drop down
                db.pool.query(queries.selectTeams, function(error, rows, fields){

                    // Set preselected option to correct team
                    rows.forEach(team=>{
                        team.selected = (team.ID == selectedDish.team_id) ? "selected" : "";
                    })

                    // Add teams to results
                    resultsNew.team = rows;

                    // Run the event years query to prepopulate drop down
                     db.pool.query(queries.selectEventYears, function(error, rows, fields){

                        // Set preselected option to correct year
                        rows.forEach(eventYear=>{
                            eventYear.selected = (eventYear.ID == selectedDish.event_year_id) ? "selected" : "";
                        })

                        // Add min max years to results
                        resultsNew.year = rows;

                        // Render page with form elements prepopulated
                        console.log('final object: ', resultsNew)
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
        if (error){
            // Send error status and message
            console.error('Error fetching discounts: ', error);
            res.status(500).send('Error fetching discounts');
        } else {
            // Render discounts page and tables
            console.log("results: ", rows)
            res.render('discounts', {discount: rows});
        }
    })
});

app.get('/new-discount', function(req, res) {
    res.render('new-discount')
})

app.get('/edit-discount', function(req, res) {

    // Get discount ID from query parameter
    const discountID = req.query.id
    console.log("discountID:", discountID)

    // Query for discount with given ID
    db.pool.query(queries.selectEditDiscount, [discountID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching event year: ', err);
            res.status(500).send('Error fetching event year');
        } else {
            // Render page with form elements prepopulated
            console.log("results: ", results[0])
            res.render('edit-discount', {discount: results[0]});
        }
    })
});

app.get('/courses', function(req, res) {

    // Run courses query
    db.pool.query(queries.selectCourses, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching courses: ', error);
            res.status(500).send('Error fetching courses');
        } else {
            // Render courses page and tables
            console.log("results: ", rows)
            res.render('courses', {course: rows});
        }
    })
});

app.get('/new-course', function(req, res) {
    res.render('new-course')
})

app.get('/edit-course', function(req, res) {

    // Get course ID from query parameter
    let courseID = req.query.id

    // Query for course with given ID
    db.pool.query(queries.selectEditCourse,[courseID], function(error, rows, fields){
        // Render course page and table
        console.log("final object:", rows[0])
        res.render('edit-course', {selectedCourse: rows[0]});
    })
});

app.get('/event-years', function(req, res) {   
    // Run the select event years query
    db.pool.query(queries.selectEventYears, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching years: ', error);
            res.status(500).send('Error fetching years');
        } else {
            // Render event years page and tables
            console.log("results: ", rows)
            res.render('event-years', {eventYear: rows});
        }
    })
});

app.get('/new-event-year', function(req, res) {
    res.render('new-event-year')
});

app.get('/edit-event-year', function(req, res) {   

    // Get event year ID from query parameter
    const eventYearID = req.query.id
    console.log("eventYearID:", eventYearID)

    // Query for year with given ID
    db.pool.query(queries.selectEditEventYear, [eventYearID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching event year: ', err);
            res.status(500).send('Error fetching event year');
        } else {
            // Render page with form elements prepopulated
            console.log("results: ", results[0])
            res.render('edit-event-year', {eventYear: results[0]});
        }
    })
});

app.get('/ratings', function(req, res) { 

    // Run the select ratings query
    db.pool.query(queries.selectRatings, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching ratings: ', error);
            res.status(500).send('Error fetching ratings');
        } else {
            // Render ratings page and tables
            console.log("results: ", rows)
            res.render('ratings', {rating: rows});
        }
    })
});

app.get('/new-rating', function(req, res) {  

    // Run the dishes query to prepopulate drop down
    db.pool.query(queries.selectDishes, function(error, rows, fields){
        let results = {dish:rows}; // Add competitors to results

        // Run the attendees query to prepopulate drop down
        db.pool.query(queries.selectAttendees, function(error, rows, fields){
            results.attendee = rows; // Add teams to results

            // Render page with form elements prepopulated
            res.render('new-rating', results);
        })
    })
});

app.get('/edit-rating', function(req, res) {   

    // Get rating ID from query parameter
    const ratingID = req.query.id;
    console.log("ratingID from Get: ", ratingID)

    // Query for rating with given ID
    db.pool.query(queries.selectEditRating, [ratingID], function(err, results){
        if (err){
            console.error('Error fetching rating:', err);
            res.status(500).send('Error fetching rating');
        } else {
            // use it as a base
            let selectedRating = results[0];

            // Run the dishes query to prepopulate drop down
            db.pool.query(queries.selectDishes, function(error, rows, fields){

                // Set preselected option to correct dish
                rows.forEach(dish=>{
                    dish.selected = (dish.ID == selectedRating.rating_id) ? "selected" : ""
                })

                // Add dishes to rows
                let resultsNew = {
                    selectedRating: selectedRating,
                    dish:rows
                }

                // Run the attendees query to prepopulate drop down
                db.pool.query(queries.selectAttendees, function(error, rows, fields){
                    
                    // Set preselected option to correct attendee
                    rows.forEach(attendee=>{
                        attendee.selected = (attendee.ID == selectedRating.attendee_id) ? "selected" : ""
                    })

                    // Add attendee to results
                    resultsNew.attendee = rows;
                    
                    // Render page with form elements prepopulated
                    console.log("final object: ", resultsNew)
                    res.render('edit-rating', resultsNew);
                })
            })

        }
    })
});

app.get('/teams', function(req, res) {  
 
    // Run the select teams query
    db.pool.query(queries.selectTeams, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching teams: ', error);
            res.status(500).send('Error fetching teams');
        } else {
            // Render teams page and tables
            console.log("results: ", rows)
            res.render('teams', {team: rows});
        }
    })
});

app.get('/new-team', function(req, res) {
    res.render('new-team')
});

app.get('/edit-team', function(req, res) {   

    // Get team ID from query parameter
    const teamID = req.query.id
    console.log("teamID:", teamID)

    // Query for team with given ID
    db.pool.query(queries.selectEditTeam, [teamID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching attendee: ', err);
            res.status(500).send('Error fetching attendee');
        } else {
            // Render page with form elements prepopulated
            console.log("results: ", results[0])
            res.render('edit-team', {team: results[0]});
        }
    })
});

app.get('/ticket-sales', function(req, res) {

    // Run the select ticket sales query
    db.pool.query(queries.selectTicketSales, function(error, rows, fields){
        if (error){
            // Send error status and message
            console.error('Error fetching ticket sales: ', error);
            res.status(500).send('Error fetching ticket sales');
        } else {
            // Render ratings page and tables
            console.log("results: ", rows)
            res.render('ticket-sales', {ticketSale: rows});
        }
    })
});

app.get('/new-ticket-sale', function(req, res) {
    // Run the attendees query to prepopulate drop down
    db.pool.query(queries.selectAttendees, function(error, rows, fields){
        let results = {attendee:rows}; // Add competitors to results

        // Run the tickets query to prepopulate drop down
        db.pool.query(queries.selectTickets, function(error, rows, fields){
            results.ticket = rows; // Add teams to results

            // Run the discounts query to prepopulate drop down
            db.pool.query(queries.selectDiscounts, function(error, rows, fields){
                results.discount = rows; // Add discounts to results

                // Run the event year query to prepopulate drop down
                db.pool.query(queries.selectEventYears, function(error, rows, fields){
                    results.year = rows; // Add event years to results
                    
                    // Render page with form elements prepopulated
                    res.render('new-ticket-sale', results);
                })
            })
        })
    })
});

app.get('/edit-ticket-sale', function(req, res) {

    // Get ticket sale ID from query parameter
    const ticketSaleID = req.query.id
    console.log("ticketSaleID:", ticketSaleID)

    // Query for ticket sale with given ID
    db.pool.query(queries.selectEditTicketSale,[ticketSaleID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching ticket_sale: ', err);
            res.status(500).send('Error fetching ticket_sale');
        } else {
            // use it as a base
            let selectedTicket = results[0];
            
            // Run the attendees query to prepopulate drop down
            db.pool.query(queries.selectAttendees, function(error, rows, fields){

                // Set preselected option to correct attendee
                rows.forEach(attendee =>{
                    attendee.selected = (attendee.ID == selectedTicket.attendee_id) ? "selected" : ""
                })

                // Add attendees to results 
                let resultsNew = {
                    selectedTicket: selectedTicket,
                    attendee:rows
                }

                // Run tickets query to prepopulate drop down
                db.pool.query(queries.selectTickets, function(error, rows, fields){

                    // Set preselected option to correct ticket
                    rows.forEach(ticket =>{
                        ticket.selected = (ticket.ID == selectedTicket.ticket_id) ? "selected" : ""
                    })
                    
                    // Add tickets to results
                    resultsNew.ticket = rows;
                    
                    // Run discounts query to prepopulate drop down
                    db.pool.query(queries.selectDiscounts, function(error, rows, fields){
                        
                        // Set preselected option to correct discount
                        rows.forEach(discount=>{
                            discount.selected = (discount.ID == selectedTicket.discount_id) ? "selected" : ""
                        })

                        // Add discounts to results
                        resultsNew.discount = rows;
                    
                        // Render page with form elements prepopulated
                        console.log("final object: ", resultsNew)
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
        console.log("from tickets get:", rows)
        res.render('tickets', {ticket: rows});
    })
});

app.get('/new-ticket', function(req, res){
    // Run the ticket types query to prepopulate drop down
    db.pool.query(queries.selectTicketTypes, function(error, rows, fields){
        let results = {ticketType: rows}; // Add ticket types to results

        // Run the years query to prepopulate drop down
        db.pool.query(queries.selectEventYears, function(error, rows, fields){
            results.year = rows; // Add event years to results

            // Render page with form elements prepopulated
            res.render('new-ticket', results);
        })
    })
});

app.get('/edit-ticket', function(req, res){

    // Get ticket ID from query parameter
    let ticketID = req.query.id;
    console.log("ticketID", ticketID);

    // Query for ticket with given ID
    db.pool.query(queries.selectEditTicket, [ticketID], function(err, results){
        if (err){
            // Send error status and message
            console.error('Error fetching ticket: ', err);
            res.status(500).send('Error fetching ticket');
        } else {
            let selectedTicket = results[0];

            // Run ticket types query to prepopulate drop down
            db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

                // Set preselected option to correct ticket type
                rows.forEach(types =>{
                    types.selected = (types.ID == selectedTicket.ticket_type_id) ? "selected" : "";
                });

                // Add ticket types to results
                let resultsNew = {
                    selectedTicket: selectedTicket,
                    ticketType: rows
                };

                // Run event years query to prepopulate drop down
                db.pool.query(queries.selectEventYears, function(error, rows, fields){

                    // Set preselected option to correct year
                    rows.forEach(year => {
                        year.selected = (year.ID == selectedTicket.even_year_id) ? "selected" : "";
                    });

                    // Add years to results
                    resultsNew.year = rows;

                    // Render page with form elements prepopulated
                    console.log("final object:", resultsNew);
                    res.render('edit-ticket', resultsNew);
                });
            }); 
        }
    }); 
});

app.get('/ticket-types', function(req, res){
    // Run the select ticket types query
    db.pool.query(queries.selectTicketTypes, function(error, rows, fields){

        // Render ticket types page and tables
        console.log("ticket type object:", rows)
        res.render('ticket-types', {ticketType: rows});
    })
});

app.get('/new-ticket-type', function(req, res) {
    // Render edit page for ticket types
    res.render('new-ticket-type')
})

app.get('/edit-ticket-type', function(req, res){
    
    // Get the ticket type ID from query parameter
    let typeID = req.query.id
    console.log("typeID: ", typeID)

    // Run the select ticket types query
    db.pool.query(queries.selectEditType,[typeID], function(error, rows, fields){

        // Render page with form elements prepopulated
        console.log("final object:", rows)
        res.render('edit-ticket-type', {ticketType: rows[0]});
    })
});


// ====================================================================================================
// POST ROUTES
// ====================================================================================================

app.post('/add-attendee-ajax', function(req, res) {
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.name, data.email, data.phone];
    console.log(queryParams);

    // Run query to insert attendee with the form data
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
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.competitor, data.team, data.year];
    console.log(queryParams);

    // Run query to insert competitor registration with form data
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
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.name, data.email, data.phone];
    console.log(queryParams);

    // Run query to insert competitor with form data
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
    // Get data from form submission
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

    // Run query to insert dish with form data
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
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.discount, data.percent];
    console.log(queryParams);

    // Run query to insert discount with form data
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
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.course];
    console.log(queryParams);

    // Run query to insert course with form data
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
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.year];
    console.log(queryParams);

    // Run query to insert event year with form data
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
    // Get data from form submission
    let data = req.body;
    let queryParams = [data.dish, data.rating, data.comments, data.attendee];
    console.log(queryParams);

    // Run query to insert rating with form data
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
        data.discount = null;
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

// ====================================================================================================
// PUT ROUTES
// ====================================================================================================

app.put('/edit-attendee-ajax', function(req, res){
    // Get data from form submission
    let data = req.body
    let queryParams = [data.name, data.email, data.phone, data.id]
    console.log(queryParams);

    // Run query to update attendee with new form data
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
    // Get data from form submission
    let data = req.body
    let queryParams = [data.name, data.email, data.phone, data.id]
    console.log(queryParams);

    // Run query to update competitor with new form data
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
    // Get data from form submission
    let data = req.body
    let queryParams = [data.name, data.id]
    console.log(queryParams);

    // Run query to update team with new form data
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
    // Get data from form
    let data = req.body
    let queryParams = [data.year, data.id]
    console.log(queryParams);

    // Run query to update event year with new form data
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
    // Get data from form submission
    let data = req.body
    console.log("data:", data);
    let queryParams = [data.attendee, data.ticket, data.discount, data.id]
    console.log(queryParams);

    // Run query to update ticket sale with new form data
    db.pool.query(queries.updateTicketSales, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedTicketSale = {
                id: result.id,
                ticket: result.ticket,
                attendee: result.attendee,
                discount: result.discount,
            };
            res.status(200).json({ message: 'Event Year updated successfully', updatedTicketSale: updatedTicketSale });
        }
    });
});

app.put('/edit-rating-ajax', function(req, res){
    // Get data from form submission
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.dish, data.rating, data.comments, data.attendee, data.id]
    console.log(queryParams);

    // Run query to update rating with new form data
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
    // Get data from form submission
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.dishName, data.dishImage, data.description, data.course, data.team, data.year, data.id]
    console.log(queryParams);

    // Run query to update dish with new form data
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
    // Get data from form submission
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.competitor, data.team, data.year, data.id]
    console.log(queryParams);

    // Run query to update competitor registration with new form data
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
            res.status(200).json({ message: 'competitor registration updated successfully', updatedRed: updatedRed });
        }
    });
});

app.put('/edit-discount-ajax', function(req, res){
    // Get data from form submission
    let data = req.body
    console.log("data:", data)
    let queryParams = [data.name, data.percent, data.id]
    console.log(queryParams);

    // Run query to update discount with new form data
    db.pool.query(queries.updateDiscount, queryParams, function(error, result) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Assuming 'result.insertId' contains the ID of the newly inserted attendee
            let updatedRed = {
                id: result.id,
                name: result.name,
                percent: result.percent,
           
            };
            res.status(200).json({ message: 'discount updated successfully', updatedRed: updatedRed });
        }
    });
});

// ====================================================================================================
// DELETE ROUTES
// ====================================================================================================

app.delete('/delete-attendee-ajax', function(req, res) {
    // Get attendee ID captured by onclick function/handlebars
    const attendeeID = req.body.id;
    console.log('Deleting: ', attendeeID)

    // Run query to delete attendee with the given ID
    db.pool.query(queries.deleteAttendee, [attendeeID], function(err, results) {
        if (err) {
            console.error('Error deleting attendee: ', err);
            res.status(500).send('Error deleting attendee');
        } else {
            console.log("Attendee deleted successfully");
            res.status(200).send('Attendee deleted successfully');
        }
    });
});

app.delete('/delete-ticket-ajax', function(req, res) {
    // Get ticket ID captured by onclick function/handlebars
    const ticketID = req.body.id;
    console.log('Deleting: ', ticketID)

    // Run query to delete ticket with given ID
    db.pool.query(queries.deleteTicket, [ticketID], function(err, results) {
        if (err) {
            console.error('Error deleting attendee: ', err);
            res.status(500).send('Error deleting ticket');
        } else {
            console.log("Ticket deleted successfully");
            res.status(200).send('Ticket deleted successfully');
        }
    });
});

app.delete('/delete-ticket-type-ajax', function(req, res) {
    // Get ticket type ID captured by onclick function/handlebars
    const ticketID = req.body.id;
    console.log('Deleting: ', ticketID)

    // Run query to delete ticket type with the given ID
    db.pool.query(queries.deleteTicketType, [ticketID], function(err, results) {
        if (err) {
            console.error('Error deleting attendee: ', err);
            res.status(500).send('Error deleting ticket type');
        } else {
            console.log("Ticket deleted successfully");
            res.status(200).send('Ticket deleted successfully');
        }
    });
});

app.delete('/delete-discount-ajax', function(req, res) {
    // Get discount ID captured by onclick function/handlebars
    const discountID = req.body.id;
    console.log('Deleting: ', discountID)

    // Run query to delete discount with the given ID
    db.pool.query(queries.deleteDiscount, [discountID], function(err, results) {
        if (err) {
            console.error('Error deleting discount: ', err);
            res.status(500).send('Error deleting discount');
        } else {
            console.log("Discount deleted successfully");
            res.status(200).send('Discount deleted successfully');
        }
    });
});

app.delete('/delete-ticket-sale-ajax', function(req, res) {
    // Get ticket sale ID captured by onclick function/handlebars
    const saleID = req.body.id;
    console.log('Deleting: ', saleID)

    // Run query to delete ticket sale with given ID
    db.pool.query(queries.deleteSale, [saleID], function(err, results) {
        if (err) {
            console.error('Error deleting ticket sale: ', err);
            res.status(500).send('Error deleting ticket sale');
        } else {
            console.log("Ticket Sale deleted successfully");
            res.status(200).send('Ticket Sale deleted successfully');
        }
    });
});

app.delete('/delete-competitor-ajax', function(req, res) {
    // Get competitor ID captured by onclick function/handlebars
    const competitorID = req.body.id;
    console.log('Deleting: ', competitorID)

    // Run query to delete competitor with given ID
    db.pool.query(queries.deleteCompetitor, [competitorID], function(err, results) {
        if (err) {
            console.error('Error deleting competitor: ', err);
            res.status(500).send('Error deleting competitor');
        } else {
            console.log("competitor deleted successfully");
            res.status(200).send('competitor deleted successfully');
        }
    });
});

app.delete('/delete-team-ajax', function(req, res) {
    // Get team ID captured by onclick function/handlebars
    const teamID = req.body.id;
    console.log('Deleting: ', teamID)

    // Run query to delete team with given ID
    db.pool.query(queries.deleteTeam, [teamID], function(err, results) {
        if (err) {
            console.error('Error deleting team: ', err);
            res.status(500).send('Error deleting team');
        } else {
            console.log("Team deleted successfully");
            res.status(200).send('Team deleted successfully');
        }
    });
});

app.delete('/delete-competitor-registration-ajax', function(req, res) {
    // Get competitor registration ID captured by onclick function/handlebars
    const registrationID = req.body.id;
    console.log('Deleting: ', registrationID)

    // Run query to delete competitor registration with given ID
    db.pool.query(queries.deleteRegistration, [registrationID], function(err, results) {
        if (err) {
            console.error('Error deleting competitor registration: ', err);
            res.status(500).send('Error deleting competitor registration');
        } else {
            console.log("competitor registration deleted successfully");
            res.status(200).send('competitor registration deleted successfully');
        }
    });
});

app.delete('/delete-dish-ajax', function(req, res) {
    // Get dish ID captured by onclick function/handlebars
    const dishID = req.body.id;
    console.log('Deleting: ', dishID)

    // Run query to delete dish with given ID
    db.pool.query(queries.deleteDish, [dishID], function(err, results) {
        if (err) {
            console.error('Error deleting dish: ', err);
            res.status(500).send('Error deleting dish');
        } else {
            console.log("Dish deleted successfully");
            res.status(200).send('Dish deleted successfully');
        }
    });
});

app.delete('/delete-course-ajax', function(req, res) {
    // Get course ID captured by onclick function/handlebars
    const courseID = req.body.id;
    console.log('Deleting: ', courseID)

    // Run query to delete course with given ID
    db.pool.query(queries.deleteCourse, [courseID], function(err, results) {
        if (err) {
            console.error('Error deleting course: ', err);
            res.status(500).send('Error deleting course');
        } else {
            console.log("Course deleted successfully");
            res.status(200).send('Course deleted successfully');
        }
    });
});

app.delete('/delete-rating-ajax', function(req, res) {
    // Get rating ID captured by onclick function/handlebars
    const ratingID = req.body.id;
    console.log('Deleting: ', ratingID)

    // Run query to delete rating with given ID
    db.pool.query(queries.deleteRating, [ratingID], function(err, results) {
        if (err) {
            console.error('Error deleting rating: ', err);
            res.status(500).send('Error deleting rating');
        } else {
            console.log("Rating deleted successfully");
            res.status(200).send('Rating deleted successfully');
        }
    });
});

app.delete('/delete-event-year-ajax', function(req, res) {
    // Get year ID captured by onclick function/handlebars
    const yearID = req.body.id;
    console.log('Deleting: ', yearID)

    // Run query to delete year with given ID
    db.pool.query(queries.deleteYear, [yearID], function(err, results) {
        if (err) {
            console.error('Error deleting year: ', err);
            res.status(500).send('Error deleting year');
        } else {
            console.log("Year deleted successfully");
            res.status(200).send('Year deleted successfully');
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});