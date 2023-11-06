
/**
 * Define Select Queries
 */

// Atendees
let selectAttendees = "SELECT attendee_id AS ID, attendee_name AS Name, attendee_email AS Email, attendee_phone AS Phone FROM Attendees;";

// Ticket Sales
let selectTicketSales = "SELECT ticket_sale_id AS ID, Attendees.attendee_name AS Attendee, Ticket_Types.ticket_type AS Ticket, unit_price AS Total, Event_Years.year AS Year FROM Ticket_Sales JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id JOIN Ticket_Types ON Ticket_Sales.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Ticket_Sales.event_year_id = Event_Years.event_year_id ORDER BY Year, Total ASC;";

// Ticket Types
let selectTicketTypes = "SELECT ticket_type_id AS ID, ticket_type AS Ticket, list_price AS Price FROM Ticket_Types;"

// Competitors
let selectCompetitors = "SELECT competitor_id AS ID, competitor_name AS Name, competitor_email AS Email, competitor_phone AS Phone FROM Competitors;";

// Teams
let selectTeams = "SELECT team_id AS ID, team_name AS Team FROM Teams;";

// Competitor Registrations
let selectCompetitorRegs = "SELECT competitor_registration_id AS ID, Competitors.competitor_name AS Competitor, Teams.team_name AS Team, Event_Years.year AS Year FROM Competitor_Registrations JOIN Competitors ON Competitor_Registrations.competitor_id = Competitors.competitor_id JOIN Teams ON Competitor_Registrations.team_id = Teams.team_id JOIN Event_Years ON Competitor_Registrations.event_year_id = Event_Years.event_year_id ORDER BY Year, Team ASC;";

// Dishes
let selectDishes = "SELECT dish_id AS ID, dish_name AS Name, dish_image AS Image, dish_description AS Description, Courses.course_name AS Course, Teams.team_name AS Team, Event_Years.year AS Year FROM Dishes JOIN Courses on Dishes.course_id = Courses.course_id JOIN Teams on Dishes.team_id = Teams.team_id JOIN Event_Years on Dishes.event_year_id = Event_Years.event_year_id ORDER BY Year, Team, Course ASC;";

// Courses
let selectCourses = "SELECT course_id AS ID, course_name AS Course FROM Courses;";

// Ratings
let selectRatings = "SELECT rating_id AS ID, Dishes.dish_name AS Dish, rating AS Rating, comments AS Comments, Attendees.attendee_name AS Attendee, Event_Years.year AS Year FROM Ratings JOIN Dishes ON Ratings.dish_id = Dishes.dish_id JOIN Attendees ON Ratings.attendee_id = Attendees.attendee_id JOIN Event_Years ON Dishes.event_year_id = Event_Years.event_year_id ORDER BY Year, Dish, Attendee ASC;";

// Event Years
let selectEventYears = "SELECT event_year_id AS ID, year AS Year FROM Event_Years;";

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
    'selectEventYears': selectEventYears
};

exports.queries = queries;