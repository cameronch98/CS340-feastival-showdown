-- Select Attendees
SELECT
attendee_id AS ID,
attendee_name AS Name,
attendee_email AS Email,
attendee_phone AS Phone 
FROM Attendees;

-- Select Ticket_Sales (Ordered by Year, Total ASC)
SELECT
Attendees.attendee_name AS Attendee,
Ticket_Types.ticket_type AS Ticket Type,
unit_price AS Total,
Event_Years.year AS Year
FROM Ticket_Sales
JOIN Attendees ON Ticket_Sales.attendee_id = Attendees.attendee_id
JOIN Ticket_Types ON Ticket_Sales.ticket_type_id = Ticket_Types.ticket_type_id
JOIN Event_Years ON Ticket_Sales.event_year_id = Event_Years.event_year_id
ORDER BY Year, Ticket Type ASC;

-- Select Ticket_Types
SELECT * FROM Ticket_Types;

-- Select Competitors
SELECT
competitor_id AS ID,
competitor_name AS Name,
competitor_email AS Email,
competitor_phone AS Phone 
FROM Competitors;

-- Select Teams
SELECT * FROM Teams;

-- Select Competitor Registrations (Ordered by Year, Team ASC)
SELECT 
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
dish_name AS Dish,
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

-- Select Ratings (Ordered by Year, Dish, Attendee ASC)
SELECT
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
SELECT * FROM Event_Years;