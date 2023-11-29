/**
 * Define Select Queries
 */
export let selectAttendees = "SELECT attendee_id AS ID, attendee_name AS Name, attendee_email AS Email, attendee_phone AS Phone FROM Attendees;";
export let selectTicketSales = "SELECT ticket_sale_id AS ID, Attendees.attendee_name AS Attendee, Ticket_Types.ticket_type AS Ticket, Discounts.discount_name AS Discount, IFNULL(Tickets.list_price - (Tickets.list_price * Discounts.discount_percent / 100), Tickets.list_price) AS Total, Event_Years.year AS Year FROM Ticket_Sales JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id JOIN Tickets ON Ticket_Sales.ticket_id = Tickets.ticket_id LEFT JOIN Discounts ON Ticket_Sales.discount_id = Discounts.discount_id JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id ORDER BY Year, Total ASC;";
export let selectTicketTypes = "SELECT ticket_type_id AS ID, ticket_type AS Ticket FROM Ticket_Types ORDER BY ID ASC;";
export let selectTickets = "SELECT ticket_id AS ID, list_price AS Price, Ticket_Types.ticket_type AS Ticket, Event_Years.year AS Year FROM Tickets JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id ORDER BY Year, Price ASC;";
export let selectDiscounts = "SELECT discount_id AS ID, discount_name AS Discount, discount_percent AS Percent FROM Discounts;";
export let selectCompetitors = "SELECT competitor_id AS ID, competitor_name AS Name, competitor_email AS Email, competitor_phone AS Phone FROM Competitors;";
export let selectTeams = "SELECT team_id AS ID, team_name AS Team FROM Teams;";
export let selectCompetitorRegs = "SELECT competitor_registration_id AS ID, Competitors.competitor_name AS Competitor, Teams.team_name AS Team, Event_Years.year AS Year FROM Competitor_Registrations JOIN Competitors ON Competitor_Registrations.competitor_id = Competitors.competitor_id JOIN Teams ON Competitor_Registrations.team_id = Teams.team_id JOIN Event_Years ON Competitor_Registrations.event_year_id = Event_Years.event_year_id ORDER BY Year, Team ASC;";
export let selectDishes = "SELECT dish_id AS ID, dish_name AS Name, dish_image AS Image, dish_description AS Description, Courses.course_name AS Course, Teams.team_name AS Team, Event_Years.year AS Year FROM Dishes JOIN Courses on Dishes.course_id = Courses.course_id JOIN Teams on Dishes.team_id = Teams.team_id JOIN Event_Years on Dishes.event_year_id = Event_Years.event_year_id ORDER BY Year, Team, Course ASC;";
export let selectCourses = "SELECT course_id AS ID, course_name AS Course FROM Courses;";
export let selectRatings = "SELECT rating_id AS ID, Dishes.dish_name AS Dish, rating AS Rating, comments AS Comments, Attendees.attendee_name AS Attendee, Event_Years.year AS Year FROM Ratings JOIN Dishes ON Ratings.dish_id = Dishes.dish_id JOIN Attendees ON Ratings.attendee_id = Attendees.attendee_id JOIN Event_Years ON Dishes.event_year_id = Event_Years.event_year_id ORDER BY Year, Dish, Attendee ASC;";
export let selectEventYears = "SELECT event_year_id AS ID, year AS Year FROM Event_Years;";

/**
 * Define Special Select Queries for Edit
 */
export let selectAttendeeById = 'SELECT * FROM Attendees WHERE attendee_id= ?;'
export let selectCompetitorById = 'SELECT * FROM Competitors WHERE competitor_id= ?;'
export let selectTeamById = 'SELECT * FROM Teams WHERE team_id= ?;'
export let selectEventYearById = 'SELECT * FROM Event_Years WHERE event_year_id= ?;'
export let selectDishById = 'SELECT * FROM Dishes WHERE dish_id = ?;'
export let selectCompetitorRegById = 'SELECT * FROM Competitor_Registrations WHERE competitor_registration_id = ?;'
export let selectDiscountById = 'SELECT * FROM Discounts WHERE discount_id = ?;'
export let selectTicketById = 'SELECT * FROM Tickets WHERE ticket_id = ?;'
export let selectTicketTypeById = 'SELECT * FROM Ticket_Types WHERE ticket_type_id = ?;'
export let selectCourseById = 'SELECT * FROM Courses WHERE course_id = ?;'
export let selectRatingById = 'SELECT * FROM Ratings WHERE rating_id = ?;'
export let selectTicketSaleById = 'SELECT * FROM Ticket_Sales WHERE ticket_sale_id = ?;'

/**
 * Define insert queries
 */
export let insertAttendee = "INSERT INTO Attendees (attendee_name, attendee_email, attendee_phone) VALUES (?, ?, ?);";
export let insertCompetitorReg = "INSERT INTO Competitor_Registrations (competitor_id, team_id, event_year_id) VALUES (?, ?, ?);";
export let insertCompetitor = "INSERT INTO Competitors (competitor_name, competitor_email, competitor_phone) VALUES (?, ?, ?);";
export let insertEventYear = "INSERT INTO Event_Years (year) VALUES (?);";
export let insertRating = "INSERT INTO Ratings (dish_id, rating, comments, attendee_id) VALUES (?, ?, ?, ?);";
export let insertDish = "INSERT INTO Dishes (dish_name, dish_image, dish_description, course_id, team_id, event_year_id) VALUES (?, ?, ?, ?, ?, ?);";
export let insertTeam = "INSERT INTO Teams (team_name) VALUES (?);";
export let insertTicketSale = "INSERT INTO Ticket_Sales (attendee_id, ticket_id, discount_id) VALUES (?, ?, ?);";
export let insertDiscount = "INSERT INTO Discounts (discount_name, discount_percent) VALUES (?, ?);";
export let insertCourse = "INSERT INTO Courses (course_name) VALUES (?);";
export let insertTicketType = "INSERT INTO Ticket_Types (ticket_type) VALUES (?);";
export let insertTicket = "INSERT INTO Tickets (list_price, ticket_type_id, event_year_id) VALUES (?, ?, ?);";

/**
 * Define update queries
 */
export let updateAttendee = 'UPDATE Attendees SET attendee_name = ?, attendee_email = ?, attendee_phone = ? WHERE attendee_id = ?;';
export let updateCompetitor = 'UPDATE Competitors SET competitor_name = ?, competitor_email = ?, competitor_phone = ? WHERE competitor_id = ?;'
export let updateTeam = 'UPDATE Teams SET team_name = ? WHERE team_id = ?;'
export let updateEventYear = 'UPDATE Event_Years SET year = ? WHERE event_year_id = ?;'
export let updateTicketSale = 'UPDATE Ticket_Sales SET attendee_id = ?, ticket_id = ?, discount_id = ? WHERE ticket_sale_id = ?;'
export let updateRating = 'UPDATE Ratings SET dish_id = ?, rating = ?, comments = ?, attendee_id = ? WHERE rating_id = ?;'
export let updateDish = 'UPDATE Dishes SET dish_name = ?, dish_image = ?, dish_description = ?, course_id = ?, team_id = ?, event_year_id = ? WHERE dish_id = ?;'
export let updateCompetitorReg = 'UPDATE Competitor_Registrations SET competitor_id = ?, team_id = ?, event_year_id = ? WHERE competitor_registration_id = ?;'
export let updateDiscount ='UPDATE Discounts SET discount_name = ?, discount_percent = ? WHERE discount_id = ?;'
export let updateCourse = 'UPDATE Courses SET course_name = ? WHERE course_id = ?;'
export let updateTicket = 'UPDATE Tickets SET list_price = ?, ticket_type_id = ?, event_year_id = ? WHERE ticket_id = ?;'
export let updateTicketType = 'UPDATE Ticket_Types SET ticket_type = ? WHERE ticket_type_id = ?;'


/**
 * Define delete queries
 */
export let deleteAttendee = 'DELETE FROM Attendees WHERE attendee_id = ?;'
export let deleteTicket = 'DELETE FROM Tickets WHERE ticket_id = ?;'
export let deleteTicketType = 'DELETE FROM Ticket_Types WHERE ticket_type_id = ?;'
export let deleteDiscount = 'DELETE FROM Discounts WHERE discount_id = ?;'
export let deleteTicketSale = 'DELETE FROM Ticket_Sales WHERE ticket_sale_id = ?;'
export let deleteCompetitor = 'DELETE FROM Competitors WHERE competitor_id = ?;'
export let deleteTeam = 'DELETE FROM Teams WHERE team_id = ?;'
export let deleteCompetitorReg = 'DELETE FROM Competitor_Registrations WHERE competitor_registration_id = ?;'
export let deleteDish = 'DELETE FROM Dishes WHERE dish_id = ?;'
export let deleteCourse = 'DELETE FROM Courses WHERE course_id = ?;'
export let deleteRating = 'DELETE FROM Ratings WHERE rating_id = ?;'
export let deleteEventYear = 'DELETE FROM Event_Years WHERE event_year_id = ?;'

/**
 * Define reload queries
 */
export let reloadAttendees = "SET FOREIGN_KEY_CHECKS=0; SET AUTOCOMMIT = 0; TRUNCATE TABLE Attendees; INSERT INTO Attendees (attendee_name, attendee_email, attendee_phone) VALUES('Carla Downey', 'CarlaHDowney@gmail.com', '973-770-8215'), ('Matthew Walters', 'MatthewNWalters@gmail.com', '818-761-5490'), ('Allen Ruiz', 'AllenTRuiz@yahoo.com', '209-230-4361'), ('John Green', 'JohnGGreen@gmail.com', '321-720-2155'), ('Eleanor Toro', 'EleanorMToro@icloud.com', '603-516-3781'), ('John Shugart', 'JohnKShugart@outlook.com', '636-696-6776'), ('Charles Schiffer', 'solon1971@gmail.com', '917-675-9886'), ('Immanuel Rober', 'immanuel.rober@yahoo.com', '916-361-4436'), ('Erna Stanto', 'erna_stanto6@yahoo.com', '610-207-9000'), ('Joseph Beavers', 'flavie1986@gmail.com', '213-366-5774');";
