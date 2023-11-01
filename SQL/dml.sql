-- Select Attendees
SELECT
attendee_id AS ID,
attendee_name AS Name,
attendee_email AS Email,
attendee_phone AS Phone 
FROM Attendees;

-- Select Ticket_Sales (Ordered by Year, Total ASC)
SELECT
ticket_sale_id AS ID,
Attendees.attendee_name AS Attendee,
Ticket_Types.ticket_type AS Ticket,
unit_price AS Total,
Event_Years.year AS Year
FROM Ticket_Sales
JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id
JOIN Ticket_Types ON Ticket_Sales.ticket_type_id = Ticket_Types.ticket_type_id
JOIN Event_Years ON Ticket_Sales.event_year_id = Event_Years.event_year_id
ORDER BY Year, Total ASC;

-- Select Ticket_Types
SELECT
ticket_type_id AS ID,
ticket_type AS Ticket,
list_price AS Price
FROM Ticket_Types;

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
dish_image AS Image,
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
JOIN Attendees ON Ratings.attendee_id = Attendees.attendee_id
JOIN Event_Years ON Dishes.event_year_id = Event_Years.event_year_id
ORDER BY Year, Dish, Attendee ASC;

-- Select Event Years
SELECT 
event_year_id AS ID,
year AS Year
FROM Event_Years;

-- Insert Attendee
INSERT INTO Attendees (attendee_name, attendee_email, attendee_phone)
VALUES ( :name, :email, :phone);

-- Insert Ticket Sale
INSERT INTO Ticket_Sales (attendee_id, ticket_type_id, unit_price, event_year_id)
VALUES (:id, :ticket-type, :total, :year);

-- Insert Competitor
INSERT INTO Competitors (competitor_name, competitor_email, competitor_phone)
VALUES (:name, :email, :phone);

-- Insert Team
INSERT INTO Teams (team_name)
VALUES (:name);

-- Insert Competitor Registration
INSERT INTO Competitor_Registrations (competitor_id, team_id, event_year_id)
VALUES (:name, :team, :year);

-- Insert Dish
INSERT INTO Dishes (dish_name, dish_image, dish_description, course_id, team_id, event_year_id)
VALUES (:dishName, :dishImage, :description, :course, :team, :year);

-- Insert Rating
INSERT INTO Ratings (dish_id, rating, comments, attendee_id)
VALUES (:dish, :rating, :comments, :attendee);

-- Insert Event Year
INSERT INTO Event_Years (year)
VALUES (:year);

-- Update Attendee
UPDATE Attendees SET attendee_name = :name, attendee_email = :email, attendee_phone = :phone;

-- Update Ticket Sale
UPDATE Ticket_Sales SET attendee_id = :id, ticket_type_id = :ticket_type, unit_price = :total, event_year_id = :year;

-- Insert Competitor
INSERT INTO Competitors (competitor_name, competitor_email, competitor_phone)
VALUES (:name, :email, :phone);

-- Insert Team
INSERT INTO Teams (team_name)
VALUES (:name);

-- Insert Competitor Registration
INSERT INTO Competitor_Registrations (competitor_id, team_id, event_year_id)
VALUES (:name, :team, :year);

-- Insert Dish
INSERT INTO Dishes (dish_name, dish_image, dish_description, course_id, team_id, event_year_id)
VALUES (:dishName, :dishImage, :description, :course, :team, :year);

-- Insert Rating
INSERT INTO Ratings (dish_id, rating, comments, attendee_id)
VALUES (:dish, :rating, :comments, :attendee);

-- Insert Event Year
INSERT INTO Event_Years (year)
VALUES (:year);

-- Delete Attendee
DELETE FROM Attendees WHERE id = :character_ID_selected_from_attendees_page

-- Delete Ticket Sale
DELETE FROM Ticket_Sales WHERE id = :character_ID_selected_from_ticket_sales_page

-- Delete Competitor
DELETE FROM Competitors WHERE id = :character_ID_selected_from_competitors_page

-- Delete Team
DELETE FROM Teams WHERE id = :character_ID_selected_from_teams_page

-- Delete Competitor Registration
DELETE FROM Competitor_Registrations WHERE id = :character_ID_selected_from_competitor_registrations_page

-- Delete Dish
DELETE FROM Dishes WHERE id = :character_ID_selected_from_dishes_page

-- Delete Rating
DELETE FROM Ratings WHERE id = :character_ID_selected_from_ratings_page

-- Delete Event Year
DELETE FROM Event_Years WHERE id = :character_ID_selected_from_event_years_page