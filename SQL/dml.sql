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