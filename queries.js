/**
 * Define Select Queries
 */
let selectAttendees = "SELECT attendee_id AS ID, attendee_name AS Name, attendee_email AS Email, attendee_phone AS Phone FROM Attendees;";
let selectTicketSales = "SELECT ticket_sale_id AS ID, Attendees.attendee_name AS Attendee, Ticket_Types.ticket_type AS Ticket, Discounts.discount_name AS Discount, IFNULL(Tickets.list_price - (Tickets.list_price * Discounts.discount_percent / 100), Tickets.list_price) AS Total, Event_Years.year AS Year FROM Ticket_Sales JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id JOIN Tickets ON Ticket_Sales.ticket_id = Tickets.ticket_id LEFT JOIN Discounts ON Ticket_Sales.discount_id = Discounts.discount_id JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id ORDER BY Year, Total ASC;";
let selectTicketTypes = "SELECT ticket_type_id AS ID, ticket_type AS Ticket FROM Ticket_Types ORDER BY ID ASC;";
let selectTickets = "SELECT ticket_id AS ID, list_price AS Price, Ticket_Types.ticket_type AS Ticket, Event_Years.year AS Year FROM Tickets JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id ORDER BY Year, Price ASC;";
let selectDiscounts = "SELECT discount_id AS ID, discount_name AS Discount, discount_percent AS Percent FROM Discounts;";
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
let selectEditDish = 'SELECT * FROM Dishes WHERE dish_id = ?;'
let selectEditReg = 'SELECT * FROM Competitor_Registrations WHERE competitor_registration_id = ?;'

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
let insertDiscount = "INSERT INTO Discounts (discount_name, discount_percent) VALUES (?, ?);";
let insertCourse = "INSERT INTO Courses (course_name) VALUES (?);";
let insertTicketType = "INSERT INTO Ticket_Types (ticket_type) VALUES (?);";
let insertTicket = "INSERT INTO Tickets (list_price, ticket_type_id, event_year_id) VALUES (?, ?, ?);";

/**
 * Define update queries
 */
let updateAttendee = 'UPDATE Attendees SET attendee_name = ?, attendee_email = ?, attendee_phone = ? WHERE attendee_id = ?;';
let updateCompetitor = 'UPDATE Competitors SET competitor_name = ?, competitor_email = ?, competitor_phone = ? WHERE competitor_id = ?;'
let updateTeam = 'UPDATE Teams SET team_name = ? WHERE team_id = ?;'
let updateEventYear = 'UPDATE Event_Years SET year = ? WHERE event_year_id = ?;'
let updateTicketSales = 'UPDATE Ticket_Sales SET attendee_id = ?, ticket_type_id = ?, unit_price = ?, event_year_id = ? WHERE ticket_sale_id = ?;'
let updateRating = 'UPDATE Ratings SET dish_id = ?, rating = ?, comments = ?, attendee_id = ? WHERE rating_id = ?;'
let updateDish = 'UPDATE Dishes SET dish_name = ?, dish_image = ?, dish_description = ?, course_id = ?, team_id = ?, event_year_id = ? WHERE dish_id = ?;'
let updateReg = 'UPDATE Competitor_Registrations SET competitor_id = ?, team_id = ?, event_year_id = ? WHERE competitor_registration_id = ?;'
/**
 * Define export object
 */
let queries = {
    'selectAttendees': selectAttendees,
    'selectTicketSales': selectTicketSales,
    'selectTicketTypes': selectTicketTypes,
    'selectTickets': selectTickets,
    'selectDiscounts': selectDiscounts,
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
    'selectEditDish':selectEditDish,
    'selectEditReg':selectEditReg,
    'insertAttendee': insertAttendee,
    'insertCompetitorReg': insertCompetitorReg,
    'insertCompetitor': insertCompetitor,
    'insertEventYear': insertEventYear,
    'insertRating': insertRating,
    'insertDish': insertDish,
    'insertTeam': insertTeam,
    'insertTicketSale': insertTicketSale,
    'insertDiscount': insertDiscount,
    'insertCourse': insertCourse,
    'insertTicketType': insertTicketType,
    'insertTicket': insertTicket,
    'updateAttendee': updateAttendee,
    'updateCompetitor':updateCompetitor,
    'updateTeam':updateTeam,
    'updateEventYear':updateEventYear,
    'updateTicketSales':updateTicketSales,
    'updateRating':updateRating,
    'updateDish':updateDish,
    'updateReg':updateReg
};

exports.queries = queries;