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
 * Define Special Select Queries for Exception Handling
 */
export let joinFKByCompetitorRegId = "SELECT Competitors.competitor_name AS competitor, Teams.team_name AS team, Event_Years.year AS year FROM Competitor_Registrations JOIN Competitors ON Competitor_Registrations.competitor_id = Competitors.competitor_id JOIN Teams ON Competitor_Registrations.team_id = Teams.team_id JOIN Event_Years ON Competitor_Registrations.event_year_id = Event_Years.event_year_id WHERE competitor_registration_id = ?;";
export let joinFKByTicketId = "SELECT Ticket_Types.ticket_type AS ticketType, Event_Years.year AS year FROM Tickets JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id WHERE ticket_id = ?;";
export let joinFKByDishId = "SELECT Courses.course_name AS course, Teams.team_name AS team, Event_Years.year AS year FROM Dishes JOIN Courses on Dishes.course_id = Courses.course_id JOIN Teams on Dishes.team_id = Teams.team_id JOIN Event_Years on Dishes.event_year_id = Event_Years.event_year_id WHERE dish_id = ?;";
export let joinFKByRatingId = "SELECT Attendees.attendee_name AS attendee, Dishes.dish_name AS dish FROM Ratings JOIN Dishes ON Ratings.dish_id = Dishes.dish_id JOIN Attendees ON Ratings.attendee_id = Attendees.attendee_id WHERE rating_id = ?;";

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
export let emptyDB = "SET FOREIGN_KEY_CHECKS=0; SET AUTOCOMMIT = 0; TRUNCATE TABLE Attendees; TRUNCATE TABLE Competitors; TRUNCATE TABLE Tickets; TRUNCATE TABLE Competitor_Registrations; TRUNCATE TABLE Ticket_Types; TRUNCATE TABLE Discounts; TRUNCATE TABLE Dishes; TRUNCATE TABLE Ratings; TRUNCATE TABLE Courses; TRUNCATE TABLE Event_Years; TRUNCATE TABLE Ticket_Sales; TRUNCATE TABLE Teams;"; 
export let reloadAttendees = "INSERT INTO Attendees (attendee_name, attendee_email, attendee_phone) VALUES('Carla Downey', 'CarlaHDowney@gmail.com', '973-770-8215'), ('Matthew Walters', 'MatthewNWalters@gmail.com', '818-761-5490'), ('Allen Ruiz', 'AllenTRuiz@yahoo.com', '209-230-4361'), ('John Green', 'JohnGGreen@gmail.com', '321-720-2155'), ('Eleanor Toro', 'EleanorMToro@icloud.com', '603-516-3781'), ('John Shugart', 'JohnKShugart@outlook.com', '636-696-6776'), ('Charles Schiffer', 'solon1971@gmail.com', '917-675-9886'), ('Immanuel Rober', 'immanuel.rober@yahoo.com', '916-361-4436'), ('Erna Stanto', 'erna_stanto6@yahoo.com', '610-207-9000'), ('Joseph Beavers', 'flavie1986@gmail.com', '213-366-5774');"
export let reloadEventYears = "INSERT INTO Event_Years (year) VALUES (2022), (2023);"
export let reloadCourses = "INSERT INTO Courses (course_name) VALUES ('Appetizer'), ('Entree'), ('Dessert');"
export let reloadTicketTypes = "INSERT INTO Ticket_Types (ticket_type) VALUES ('One-Day'), ('Two-Day'), ('Three-Day');"
export let reloadTickets = "INSERT INTO Tickets (list_price, ticket_type_id, event_year_id) VALUES (8, 1, 1), (16, 2, 1), (24, 3, 1), (10, 1, 2), (20, 2, 2), (30, 3, 2);"
export let reloadDiscounts = "INSERT INTO Discounts (discount_name, discount_percent) VALUES ('Early Bird', 20), ('Flash Sale', 10), ('Student', 15);"
export let reloadTeams = "INSERT INTO Teams (team_name) VALUES ('Flavor Fusion'), ('Culinary Connoisseurs'), ('Bread Heads'), ('Tasty Titans');"
export let reloadTicketSales = "INSERT INTO Ticket_Sales (attendee_id, ticket_id, discount_id) VALUES (4, 2, NULL), (3, 3, 2), (6, 3, NULL), (1, 3, 3), (2, 1, NULL), (5, 2, 1), (4, 6, NULL), (10, 6, NULL), (7, 5, 2), (8, 5, NULL), (5, 6, 1), (9, 4, 1), (2, 4, 1);"
export let reloadCompetitors = "INSERT INTO Competitors (competitor_name, competitor_email, competitor_phone) VALUES ('Thomas Miller', 'ThomasHMiller@outlook.com', '912-819-2602'), ('Vincent Smith', 'VincentTSmith@icloud.com', '918-343-0428'), ('Ronald Fillmore', 'RonaldJFillmore@gmail.com', '314-589-5716'), ('Bob Nelson', 'BobANelson@gmail.com', '610-918-6446'), ('Hui Taylor', 'HuiLTaylor@icloud.com', '509-643-9317'), ('Ronnie Kay', 'RonnieBKay@yahoo.com', '618-398-2717'), ('Allen Salcedo', 'a.salcedo@imaginejourney.org', '872-878-6265'), ('Carmen Cevallos', 'c.cevallos@accountvictory.net', '682-838-1759'), ('Isabella Wang', 'i.wang@evolveavatar.com', '762-502-4174'), ('Ylva Ahmad', 'y.ahmad@elegantkindle.io', '678-870-6674');"
export let reloadCompetitorRegs = "INSERT INTO Competitor_Registrations (event_year_id, competitor_id, team_id) VALUES (1, 2, 2), (1, 3, 1), (1, 6, 2), (1, 5, 1), (1, 4, 3), (1, 1, 3), (2, 1, 4), (2, 4, 3), (2, 10, 4), (2, 6, 2), (2, 9, 2), (2, 8, 1), (2, 7, 3), (2, 5, 1);"
export let reloadDishes = "INSERT INTO Dishes (dish_name, dish_image, dish_description, event_year_id, team_id, course_id) VALUES ('Crispy Calamari Rings', 'link', 'Lightly battered squid rings, deep-fried until golden, served with a tangy lemon aioli.', 1, 1, 1), ('Honey-Glazed Salmon Fillet', 'link', 'Fresh salmon glazed with a blend of honey, garlic, and soy, grilled to perfection, accompanied by asparagus spears.', 1, 2, 2), ('Triple Chocolate Mousse', 'link', 'Velvety layers of dark, milk, and white chocolate mousse, topped with a dusting of cocoa powder.', 1, 3, 3), ('Stuffed Portobello Caps', 'link', 'Meaty mushrooms filled with herbed goat cheese, spinach, and roasted red peppers, drizzled with balsamic glaze.', 1, 2, 1), ('Thyme-Infused Lamb Chops', 'link', 'Juicy lamb chops seasoned with fresh thyme and rosemary, seared to desired doneness, paired with roasted root vegetables.', 1, 3, 2), ('Roasted Beetroot Salad', 'link', 'Freshly roasted beetroots combined with feta cheese, walnuts, and a honey dressing.', 2, 1, 1), ('Mango Sorbet', 'link', 'A refreshing mango sorbet made from ripe mangoes and a hint of lime.', 2, 1, 3), ('Ginger Chicken Stir-Fry', 'link', 'Aromatic ginger-infused chicken stir-fried with crisp vegetables in a light soy sauce.', 2, 3, 2), ('Spinach and Feta Tart', 'link', 'A flaky tart filled with sautéed spinach and creamy feta cheese.', 2, 2, 1), ('Mocha Cheesecake', 'link', 'Creamy cheesecake with a hint of coffee and chocolate.', 2, 2, 3);"
export let reloadRatings = "INSERT INTO Ratings (rating, comments, attendee_id, dish_id) VALUES (9, 'Give these to me any day of the week', 1, 1), (10, 'BEST. SALMON. EVER.', 2, 2), (7, 'Maybe too sweet for me?', 1, 3), (5, 'Not a fan of calamari, and still not!', 3, 1), (9, 'Thyme-anything is heaven on a plate!', 4, 5), (8, 'Loved the combination of flavors!', 8, 6), (9, 'A delightful dessert!', 7, 7), (7, 'Good but could use more ginger', 10, 8), (10, 'The tart was outstanding!', 9, 9), (8, 'Perfect balance of coffee and chocolate', 5, 10); SET FOREIGN_KEY_CHECKS=1; COMMIT;"