// App.js

/*
    SETUP
*/

// Express
import express from "express";
var app = express();
const PORT = 9025;

// Path
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from "url";
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '/public')));

// Import routes
import { homeRoutes } from "./routes/homeRoutes.mjs";
import { attendeesRoutes } from "./routes/attendeesRoutes.mjs";
import { competitorsRoutes } from "./routes/competitorsRoutes.mjs";
import { coursesRoutes } from "./routes/coursesRoutes.mjs";
import { eventYearsRoutes } from "./routes/eventYearsRoutes.mjs";
import { discountsRoutes } from "./routes/discountsRoutes.mjs";
import { teamsRoutes } from "./routes/teamsRoutes.mjs";
import { ticketTypesRoutes } from "./routes/ticketTypesRoutes.mjs";
import { ticketsRoutes } from "./routes/ticketsRoutes.mjs";
import { ticketSalesRoutes } from "./routes/ticketSalesRoutes.mjs";
import { competitorRegistrationsRoutes } from "./routes/competitorRegistrationsRoutes.mjs";
import { dishesRoutes } from "./routes/dishesRoutes.mjs";
import { ratingsRoutes } from "./routes/ratingsRoutes.mjs";
import { reloadRoutes } from "./routes/reloadRoutes.mjs";

// Handlebars
import { engine } from 'express-handlebars';     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.use('/', homeRoutes);
app.use('/attendees', attendeesRoutes);
app.use('/competitors', competitorsRoutes);
app.use('/courses', coursesRoutes);
app.use('/event-years', eventYearsRoutes);
app.use('/discounts', discountsRoutes);
app.use('/teams', teamsRoutes);
app.use('/ticket-types', ticketTypesRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/ticket-sales', ticketSalesRoutes);
app.use('/competitor-registrations', competitorRegistrationsRoutes);
app.use('/dishes', dishesRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/reload', reloadRoutes);

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});