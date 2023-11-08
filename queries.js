/**
 * Define Select Queries
 */
let selectAttendees = "SELECT attendee_id AS ID, attendee_name AS Name, attendee_email AS Email, attendee_phone AS Phone FROM Attendees;";
let selectTicketSales = "SELECT ticket_sale_id AS ID, Attendees.attendee_name AS Attendee, Ticket_Types.ticket_type AS Ticket, unit_price AS Total, Event_Years.year AS Year FROM Ticket_Sales JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id JOIN Ticket_Types ON Ticket_Sales.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Ticket_Sales.event_year_id = Event_Years.event_year_id ORDER BY Year, Total ASC;";
let selectTicketTypes = "SELECT ticket_type_id AS ID, ticket_type AS Ticket, list_price AS Price FROM Ticket_Types;"
let selectCompetitors = "SELECT competitor_id AS ID, competitor_name AS Name, competitor_email AS Email, competitor_phone AS Phone FROM Competitors;";
let selectTeams = "SELECT team_id AS ID, team_name AS Team FROM Teams;";
let selectCompetitorRegs = "SELECT competitor_registration_id AS ID, Competitors.competitor_name AS Competitor, Teams.team_name AS Team, Event_Years.year AS Year FROM Competitor_Registrations JOIN Competitors ON Competitor_Registrations.competitor_id = Competitors.competitor_id JOIN Teams ON Competitor_Registrations.team_id = Teams.team_id JOIN Event_Years ON Competitor_Registrations.event_year_id = Event_Years.event_year_id ORDER BY Year, Team ASC;";
let selectDishes = "SELECT dish_id AS ID, dish_name AS Name, dish_image AS Image, dish_description AS Description, Courses.course_name AS Course, Teams.team_name AS Team, Event_Years.year AS Year FROM Dishes JOIN Courses on Dishes.course_id = Courses.course_id JOIN Teams on Dishes.team_id = Teams.team_id JOIN Event_Years on Dishes.event_year_id = Event_Years.event_year_id ORDER BY Year, Team, Course ASC;";
let selectCourses = "SELECT course_id AS ID, course_name AS Course FROM Courses;";
let selectRatings = "SELECT rating_id AS ID, Dishes.dish_name AS Dish, rating AS Rating, comments AS Comments, Attendees.attendee_name AS Attendee, Event_Years.year AS Year FROM Ratings JOIN Dishes ON Ratings.dish_id = Dishes.dish_id JOIN Attendees ON Ratings.attendee_id = Attendees.attendee_id JOIN Event_Years ON Dishes.event_year_id = Event_Years.event_year_id ORDER BY Year, Dish, Attendee ASC;";
let selectEventYears = "SELECT event_year_id AS ID, year AS Year FROM Event_Years;";
/**
 * Define Special Select Queries for Edit
 */
let selectEditAttendee = 'SELECT * FROM Attendees WHERE attendee_id= ?;'
let selectEditCompetitor = 'SELECT * FROM Competitors WHERE competitor_id= ?;'
let selectEditTeam = 'SELECT * FROM Teams WHERE team_id= ?;'
let selectEditEventYear = 'SELECT * FROM Event_Years WHERE event_year_id= ?;'

/**
 * Define insert queries
 */
let insertAttendee = "INSERT INTO Attendees (attendee_name, attendee_email, attendee_phone) VALUES (?, ?, ?);";
let insertCompetitorReg = "INSERT INTO Competitor_Registrations (competitor_id, team_id, event_year_id) VALUES (?, ?, ?);";
let insertCompetitor = "INSERT INTO Competitors (competitor_name, competitor_email, competitor_phone) VALUES (?, ?, ?);";
let insertEventYear = "INSERT INTO Event_Years (year) VALUES (?);";
let insertRating = "INSERT INTO Ratings (dish_id, rating, comments, attendee_id) VALUES (?, ?, ?, ?);";
let insertDish = "INSERT INTO Dishes (dish_name, dish_image, dish_description, course_id, team_id, event_year_id) VALUES (?, ?, ?, ?, ?, ?);";
let insertTeam = "INSERT INTO Teams (team_name) VALUES (?);";
let insertTicketSale = "INSERT INTO Ticket_Sales (attendee_id, ticket_type_id, unit_price, event_year_id) VALUES (?, ?, ?, ?);";

/**
 * Define update queries
 */
let updateAttendee = 'UPDATE Attendees SET attendee_name = ?, attendee_email = ?, attendee_phone = ? WHERE attendee_id = ?;';
let updateCompetitor = 'UPDATE Competitors SET competitor_name = ?, competitor_email = ?, competitor_phone = ? WHERE competitor_id = ?;'
let updateTeam = 'UPDATE Teams SET team_name = ? WHERE team_id = ?;'
let updateEventYear = 'UPDATE Event_Years SET year = ? WHERE event_year_id = ?;'
let updateTicketSales = 'UPDATE Ticket_Sales SET attendee_id = ?, ticket_type_id = ?, unit_price = ?, event_year_id = ? WHERE ticket_sale_id = ?;'

/**
 * Define export object
 */
let queries = {
    'selectAttendees': selectAttendees,
    'selectTicketSales': selectTicketSales,
    'selectTicketTypes': selectTicketTypes,
    'selectCompetitors': selectCompetitors,
    'selectTeams': selectTeams,
    'selectCompetitorRegs': selectCompetitorRegs,
    'selectDishes': selectDishes,
    'selectCourses': selectCourses,
    'selectRatings': selectRatings,
    'selectEventYears': selectEventYears,
    'selectEditAttendee':selectEditAttendee,
    'selectEditCompetitor':selectEditCompetitor,
    'selectEditTeam':selectEditTeam,
    'selectEditEventYear':selectEditEventYear,
    'insertAttendee': insertAttendee,
    'insertCompetitorReg': insertCompetitorReg,
    'insertCompetitor': insertCompetitor,
    'insertEventYear': insertEventYear,
    'insertRating': insertRating,
    'insertDish': insertDish,
    'insertTeam': insertTeam,
    'insertTicketSale': insertTicketSale,
    'updateAttendee': updateAttendee,
    'updateCompetitor':updateCompetitor,
    'updateTeam':updateTeam,
    'updateEventYear':updateEventYear,
    'updateTicketSales':updateTicketSales
};

exports.queries = queries;