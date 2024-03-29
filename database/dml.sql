-- Select Attendees
SELECT
attendee_id AS ID,
attendee_name AS Name,
attendee_email AS Email,
attendee_phone AS Phone 
FROM Attendees;

-- Select Discounts
SELECT
discount_id AS ID,
discount_name AS Discount,
discount_percent AS Percent
FROM Discounts;

-- Select Ticket_Sales (Ordered by Year, Total ASC)
SELECT
ticket_sale_id AS ID,
Attendees.attendee_name AS Attendee,
Ticket_Types.ticket_type AS Ticket,
Discounts.discount_name AS Discount,
IFNULL(Tickets.list_price - (Tickets.list_price * Discounts.discount_percent / 100), Tickets.list_price) AS Total,
Event_Years.year AS Year
FROM Ticket_Sales
LEFT JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id
JOIN Tickets ON Ticket_Sales.ticket_id = Tickets.ticket_id
LEFT JOIN Discounts ON Ticket_Sales.discount_id = Discounts.discount_id
JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id
JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id
ORDER BY Year, Total ASC;

-- Select Ticket_Types
SELECT
ticket_type_id AS ID,
ticket_type AS Ticket
FROM Ticket_Types
ORDER BY ID ASC;

-- Select Tickets
SELECT
ticket_id AS ID,
list_price AS Price,
Ticket_Types.ticket_type AS Ticket,
Event_Years.year AS Year
FROM Tickets
JOIN Ticket_Types ON Tickets.ticket_type_id = Ticket_Types.ticket_type_id
JOIN Event_Years ON Tickets.event_year_id = Event_Years.event_year_id
ORDER BY Year, Price ASC;

-- Select Competitors
SELECT
competitor_id AS ID,
competitor_name AS Name,
competitor_email AS Email,
competitor_phone AS Phone 
FROM Competitors;

-- Select Teams
SELECT
team_id AS ID,
team_name AS Team
FROM Teams;

-- Select Competitor Registrations (Ordered by Year, Team ASC)
SELECT 
competitor_registration_id AS ID,
Competitors.competitor_name AS Competitor,
Teams.team_name AS Team, 
Event_Years.year AS Year
FROM Competitor_Registrations
JOIN Competitors ON Competitor_Registrations.competitor_id = Competitors.competitor_id
JOIN Teams ON Competitor_Registrations.team_id = Teams.team_id
JOIN Event_Years ON Competitor_Registrations.event_year_id = Event_Years.event_year_id
ORDER BY Year, Team ASC;

-- Select Dishes (Ordered by Year, Team, Course ASC)
SELECT
dish_id AS ID,
dish_name AS Name,
dish_description AS Description,
Courses.course_name AS Course,
Teams.team_name AS Team,
Event_Years.year AS Year
FROM Dishes
JOIN Courses on Dishes.course_id = Courses.course_id
JOIN Teams on Dishes.team_id = Teams.team_id
JOIN Event_Years on Dishes.event_year_id = Event_Years.event_year_id
ORDER BY Year, Team, Course ASC;

-- Select Courses
SELECT
course_id AS ID,
course_name AS Course
FROM Courses;

-- Select Ratings (Ordered by Year, Dish, Attendee ASC)
SELECT
rating_id AS ID,
Dishes.dish_name AS Dish,
rating AS Rating,
comments AS Comments,
Attendees.attendee_name AS Attendee,
Event_Years.year AS Year
FROM Ratings
JOIN Dishes ON Ratings.dish_id = Dishes.dish_id
LEFT JOIN Attendees ON Ratings.attendee_id = Attendees.attendee_id
JOIN Event_Years ON Dishes.event_year_id = Event_Years.event_year_id
ORDER BY Year, Dish, Attendee ASC;

-- Select Event Years
SELECT 
event_year_id AS ID,
year AS Year
FROM Event_Years;

-- Special Select Queries for Edit Matching
-- Select Current Attendee
SELECT * 
FROM Attendees 
WHERE attendee_id= ?;

-- Select Current Competitor
SELECT * 
FROM Competitors 
WHERE competitor_id= ?;

-- Select Current Team
SELECT * 
FROM Teams 
WHERE team_id= ?;

-- Select Current Event_Year
SELECT * 
FROM Event_Years 
WHERE event_year_id= ?;

-- Select Current Dish
SELECT * 
FROM Dishes 
WHERE dish_id = ?;

-- Select Current Competitor_Registration
SELECT * 
FROM Competitor_Registrations 
WHERE competitor_registration_id = ?;

-- Select Current Discount
SELECT *
FROM Discounts
WHERE discount_id = ?;

-- Select Current Ticket
SELECT *
FROM Tickets
WHERE ticket_id = ?;

-- Select Current Ticket_Type
SELECT * 
FROM Ticket_Types
WHERE ticket_type_id = ?;

-- Select Current Course
SELECT * 
FROM Courses
WHERE course_id = ?;

-- Select Current Rating
SELECT * 
FROM Ratings 
WHERE rating_id = ?;

-- Select Current Ticket Sale
SELECT * 
FROM Ticket_Sales 
WHERE ticket_sale_id = ?;

-- Insert Attendee
INSERT INTO Attendees (attendee_name, attendee_email, attendee_phone)
VALUES ( :name, :email, :phone);

-- Insert Discount
INSERT INTO Discounts (discount_name, discount_percent)
VALUES (:discount, :percent);

-- Insert Course
INSERT INTO Courses (course_name) VALUES (:course);

-- Insert Ticket Sale
INSERT INTO Ticket_Sales (attendee_id, ticket_id, discount_id)
VALUES (:attendee, :ticket, :discount);

-- Insert Ticket Type
INSERT INTO Ticket_Types (ticket_type)
VALUES (:ticket-type);

-- Insert Ticket
INSERT INTO Tickets (list_price, ticket_type_id, event_year_id)
VALUES (:price, :ticket-type, :year);

-- Insert Competitor
INSERT INTO Competitors (competitor_name, competitor_email, competitor_phone)
VALUES (:name, :email, :phone);

-- Insert Team
INSERT INTO Teams (team_name)
VALUES (:name);

-- Insert Competitor Registration
INSERT INTO Competitor_Registrations (competitor_id, team_id, event_year_id)
VALUES (:competitor, :team, :year);

-- Insert Dish
INSERT INTO Dishes (dish_name, dish_description, course_id, team_id, event_year_id)
VALUES (:dishName, :description, :course, :team, :year);

-- Insert Rating
INSERT INTO Ratings (dish_id, rating, comments, attendee_id)
VALUES (:dish, :rating, :comments, :attendee);

-- Insert Event Year
INSERT INTO Event_Years (year)
VALUES (:year);

-- Update Attendee
UPDATE Attendees SET attendee_name = :name, attendee_email = :email, attendee_phone = :phone WHERE attendee_id = :id;

-- Update Discount
UPDATE Discounts SET discount_name = :discount, discount_percent = :percent WHERE discount_id = :id;

-- Update Ticket Sale
UPDATE Ticket_Sales SET attendee_id = :attendee, ticket_id = :ticket, discount_id = :discount WHERE ticket_sale_id = :id;

-- Update Ticket Type
UPDATE Ticket_Types SET ticket_type = :ticket_type WHERE ticket_type_id = :id;

-- Update Competitor
UPDATE Competitors SET competitor_name = :name, competitor_email = :email, competitor_phone = :phone WHERE competitor_id = :id;

-- Update Team
UPDATE Teams SET team_name: = :name WHERE team_id = :id;

-- Update Competitor Registration
UPDATE Competitor_Registrations SET competitor_id = :competitor, team_id = :team, event_year_id = :year WHERE competitor_registration_id = :id;

-- Update Dish
UPDATE Dishes SET dish_name = :dishName, dish_description = :description, course_id = :course, team_id = :team, event_year_id = :year WHERE dish_id = :id;

-- Update Rating
UPDATE Ratings SET dish_id = :dish, rating = :rating, comments = :comments, attendee_id = :attendee WHERE rating_id = :id;

-- Update Event Year
UPDATE Event_Years SET year = :year WHERE event_year_id = :id;

-- Update Course
UPDATE Courses SET course_name = :course WHERE course_id = :id;

-- Update Ticket
UPDATE Tickets SET list_price = :price, ticket_type_id = :ticketTypeId, event_year_id = :eventYearId WHERE ticket_id = :id;

-- Update Ticket Type
UPDATE Ticket_Types SET ticket_type = ? WHERE ticket_type_id = ?;

-- Delete Attendee
DELETE FROM Attendees WHERE attendee_id = :character_ID_selected_from_attendees_page;

-- Delete Discount
DELETE FROM Discounts WHERE discount_id = :character_ID_selected_from_discounts_page;

-- Delete Ticket Sale
DELETE FROM Ticket_Sales WHERE ticket_sale_id = :character_ID_selected_from_ticket_sales_page;

-- Delete Ticket Type
DELETE FROM Ticket_Types WHERE ticket_type_id = :character_ID_selected_from_ticket_types_page;

-- Delete Competitor
DELETE FROM Competitors WHERE competitor_id = :character_ID_selected_from_competitors_page;

-- Delete Team
DELETE FROM Teams WHERE team_id = :character_ID_selected_from_teams_page;

-- Delete Competitor Registration
DELETE FROM Competitor_Registrations WHERE competitor_registration_id = :character_ID_selected_from_competitor_registrations_page;

-- Delete Dish
DELETE FROM Dishes WHERE dish_id = :character_ID_selected_from_dishes_page;

-- Delete Rating
DELETE FROM Ratings WHERE rating_id = :character_ID_selected_from_ratings_page;

-- Delete Event Year
DELETE FROM Event_Years WHERE event_year_id = :character_ID_selected_from_event_years_page;

-- Delete Course 
DELETE FROM Courses WHERE course_id = :course_id;

-- Delete Ticket
DELETE FROM Tickets WHERE ticket_id = :ticket_id;