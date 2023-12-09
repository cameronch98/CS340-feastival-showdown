----------------------------------------------------------------------
-- DDL to define tables in database, and insert sample data into them
-- using subqueries where foreign keys are inserted. The database
-- consists of the following entities: Event_Years, Courses, Ticket-
-- Types, Tickets, Discounts, Teams, Attendees, Competitors, Ticket-
-- Sales, Competitor_Registrations, Dishes, and Ratings.
----------------------------------------------------------------------

-- Update config
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create the Event_Years table
CREATE OR REPLACE TABLE Event_Years (
    event_year_id int AUTO_INCREMENT PRIMARY KEY,
    year year NOT NULL UNIQUE
);

-- Create the Courses table
CREATE OR REPLACE TABLE Courses (
    course_id int AUTO_INCREMENT PRIMARY KEY,
    course_name varchar(50) NOT NULL UNIQUE
);

-- Create the Ticket_Types table
CREATE OR REPLACE TABLE Ticket_Types (
    ticket_type_id int AUTO_INCREMENT PRIMARY KEY,
    ticket_type varchar(50) NOT NULL UNIQUE
);

-- Create the Tickets table
CREATE OR REPLACE TABLE Tickets (
    ticket_id int AUTO_INCREMENT PRIMARY KEY,
    list_price decimal(5, 2) NOT NULL,
    ticket_type_id int NOT NULL,
    event_year_id int NOT NULL,
    CONSTRAINT type_year UNIQUE(ticket_type_id, event_year_id),
    FOREIGN KEY (ticket_type_id) REFERENCES Ticket_Types(ticket_type_id)
    ON DELETE CASCADE,
    FOREIGN KEY (event_year_id) REFERENCES Event_Years(event_year_id)
    ON DELETE CASCADE
);

-- Create the Discounts table
CREATE OR REPLACE TABLE Discounts (
    discount_id int AUTO_INCREMENT PRIMARY KEY,
    discount_name varchar(50) NOT NULL UNIQUE,
    discount_percent decimal(5, 2) NOT NULL
);

-- Create the Teams table
CREATE OR REPLACE TABLE Teams(
    team_id int AUTO_INCREMENT PRIMARY KEY,
    team_name varchar(100) UNIQUE NOT NULL
);

-- Create the Attendees table
CREATE OR REPLACE TABLE Attendees (
    attendee_id int AUTO_INCREMENT PRIMARY KEY,
    attendee_name varchar(100) NOT NULL,
    attendee_email varchar(255) UNIQUE NOT NULL,
    attendee_phone varchar(15) UNIQUE NOT NULL
);

-- Create the Ticket_Sales table
CREATE OR REPLACE TABLE Ticket_Sales (
    ticket_sale_id int AUTO_INCREMENT PRIMARY KEY,
    attendee_id int,
    ticket_id int NOT NULL,
    discount_id int DEFAULT NULL,
    FOREIGN KEY (attendee_id) REFERENCES Attendees(attendee_id)
    ON DELETE SET NULL,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id)
    ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES Discounts(discount_id)
    ON DELETE CASCADE
);

-- Create the Competitors table
CREATE OR REPLACE TABLE Competitors(
    competitor_id int AUTO_INCREMENT PRIMARY KEY,
    competitor_name varchar(100) NOT NULL,
    competitor_email varchar(255) UNIQUE NOT NULL,
    competitor_phone varchar(15) UNIQUE NOT NULL
);

-- Create the Competitor_Registrations table
CREATE OR REPLACE TABLE Competitor_Registrations(
    competitor_registration_id int AUTO_INCREMENT PRIMARY KEY,
    competitor_id int NOT NULL,
    team_id int NOT NULL,
    event_year_id int NOT NULL,
    CONSTRAINT competitor_year UNIQUE(competitor_id, event_year_id), 
    FOREIGN KEY(competitor_id) REFERENCES Competitors(competitor_id)
    ON DELETE CASCADE,
    FOREIGN KEY(team_id) REFERENCES Teams (team_id)
    ON DELETE CASCADE,
    FOREIGN KEY(event_year_id) REFERENCES Event_Years(event_year_id)
    ON DELETE CASCADE
);

-- Create the Dishes table
CREATE OR REPLACE TABLE Dishes(
    dish_id int AUTO_INCREMENT PRIMARY KEY, 
    dish_name varchar(100) UNIQUE NOT NULL,
    dish_description varchar(255) NOT NULL,
    team_id int NOT NULL, 
    course_id int NOT NULL,
    event_year_id int NOT NULL,
    CONSTRAINT team_course_year UNIQUE(team_id, course_id, event_year_id),
    FOREIGN KEY(team_id) REFERENCES Teams (team_id)
    ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES Courses (course_id)
    ON DELETE CASCADE,
    FOREIGN KEY(event_year_id) REFERENCES Event_Years(event_year_id)
    ON DELETE CASCADE
);

-- Create the Ratings table
CREATE OR REPLACE TABLE Ratings (
    rating_id int AUTO_INCREMENT PRIMARY KEY,
    rating int NOT NULL,
    comments text NOT NULL,
    attendee_id int,
    dish_id int NOT NULL,
    CONSTRAINT attendee_dish UNIQUE (attendee_id, dish_id),
    FOREIGN KEY (attendee_id) REFERENCES Attendees(attendee_id)
    ON DELETE SET NULL,
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id)
    ON DELETE CASCADE
);

-- Insert sample data into Event_Years
INSERT INTO Event_Years (
    year
)
VALUES
(
    2022
),
(
    2023
);

-- Insert sample data into Courses
INSERT INTO Courses (
    course_name
)
VALUES
(
    'Appetizer'
),
(
    'Entree'
),
(
    'Dessert'
);

-- Insert sample data into Ticket_Types
INSERT INTO Ticket_Types (
    ticket_type
)
VALUES
(
    'One-Day'
),
(
    'Two-Day'
),
(
    'Three-Day'
);

-- Insert into Tickets
INSERT INTO Tickets (
    list_price,
    ticket_type_id,
    event_year_id
)
VALUES
(
    8,
    (SELECT ticket_type_id FROM Ticket_Types WHERE ticket_type='One-Day'),
    (SELECT event_year_id FROM Event_Years WHERE year = 2022)
),
(
    16,
    (SELECT ticket_type_id FROM Ticket_Types WHERE ticket_type='Two-Day'),
    (SELECT event_year_id FROM Event_Years WHERE year = 2022)
),
(
    24,
    (SELECT ticket_type_id FROM Ticket_Types WHERE ticket_type='Three-Day'),
    (SELECT event_year_id FROM Event_Years WHERE year = 2022)
),
(
    10,
    (SELECT ticket_type_id FROM Ticket_Types WHERE ticket_type='One-Day'),
    (SELECT event_year_id FROM Event_Years WHERE year = 2023)
),
(
    20,
    (SELECT ticket_type_id FROM Ticket_Types WHERE ticket_type='Two-Day'),
    (SELECT event_year_id FROM Event_Years WHERE year = 2023)
),
(
    30,
    (SELECT ticket_type_id FROM Ticket_Types WHERE ticket_type='Three-Day'),
    (SELECT event_year_id FROM Event_Years WHERE year = 2022)
);

INSERT INTO Discounts (
    discount_name,
    discount_percent
)
VALUES
(
    "Early Bird",
    20
),
(
    "Flash Sale",
    10
),
(
    "Student",
    15
);

-- Insert sample data into Teams
INSERT INTO Teams (
    team_name
)
VALUES
(
    'Flavor Fusion'
),
(
    'Culinary Connoisseurs'
),
(
    'Bread Heads'
),
(
    'Tasty Titans'
);

-- Insert sample data into Attendees
INSERT INTO Attendees (
    attendee_name,
    attendee_email,
    attendee_phone
)
VALUES
(
    'Carla Downey',
    'CarlaHDowney@gmail.com',
    '973-770-8215'
),
(
    'Matthew Walters',
    'MatthewNWalters@gmail.com',
    '818-761-5490'
),
(
    'Allen Ruiz',
    'AllenTRuiz@yahoo.com',
    '209-230-4361'
),
(
    'John Green',
    'JohnGGreen@gmail.com',
    '321-720-2155'
),
(
    'Eleanor Toro',
    'EleanorMToro@icloud.com',
    '603-516-3781'
),
(
    'John Shugart',
    'JohnKShugart@outlook.com',
    '636-696-6776'
),
(
    'Charles Schiffer',
    'solon1971@gmail.com',
    '917-675-9886'
),
(
    'Immanuel Rober',
    'immanuel.rober@yahoo.com',
    '916-361-4436'
),
(
    'Erna Stanto',
    'erna_stanto6@yahoo.com',
    '610-207-9000'
),
(
    'Joseph Beavers',
    'flavie1986@gmail.com',
    '213-366-5774'
);

-- Insert sample data into Ticket_Sales
INSERT INTO Ticket_Sales (
    attendee_id,
    ticket_id,
    discount_id
)
VALUES
(
    4,
    2,
    NULL
),
(
    3,
    3,
    (SELECT discount_id FROM Discounts WHERE discount = "Flash Sale")
),
(
    6,
    3,
    NULL
),
(
    (SELECT attendee_id FROM Attendees WHERE attendee_email = "CarlaHDowney@gmail.com"),
    3,
    (SELECT discount_id FROM Discounts WHERE discount = "Student")
),
(
    2,
    1,
    NULL
),
(
    5,
    2,
    (SELECT discount_id FROM Discounts WHERE discount = "Early Bird")
),
(
    4,
    6,
    NULL
),
(
    10,
    6,
    NULL
),
(
    7,
    5,
    (SELECT discount_id FROM Discounts WHERE discount = "Flash Sale")
),
(
    8,
    5,
    NULL
),
(
    5,
    6,
    (SELECT discount_id FROM Discounts WHERE discount = "Early Bird")
),
(
    9,
    4,
    (SELECT discount_id FROM Discounts WHERE discount = "Early Bird")
),
(
    2,
    4,
    (SELECT discount_id FROM Discounts WHERE discount = "Early Bird")
);

-- Insert sample data into Competitors
INSERT INTO Competitors (
    competitor_name,
    competitor_email,
    competitor_phone
)
VALUES
(
    'Thomas Miller',
    'ThomasHMiller@outlook.com',
    '912-819-2602'
),
(   
    'Vincent Smith',
    'VincentTSmith@icloud.com',
    '918-343-0428'
),
(
    'Ronald Fillmore',
    'RonaldJFillmore@gmail.com',
    '314-589-5716'
),
(
    'Bob Nelson',
    'BobANelson@gmail.com',
    '610-918-6446'
),
(
    'Hui Taylor',
    'HuiLTaylor@icloud.com',
    '509-643-9317'
),
(
    'Ronnie Kay',
    'RonnieBKay@yahoo.com',
    '618-398-2717'
),
(
    'Allen Salcedo',
    'a.salcedo@imaginejourney.org',
    '872-878-6265'
),
(
    'Carmen Cevallos',
    'c.cevallos@accountvictory.net',
    '682-838-1759'
),
(
    'Isabella Wang',
    'i.wang@evolveavatar.com',
    '762-502-4174'
),
(
    'Ylva Ahmad',
    'y.ahmad@elegantkindle.io',
    '678-870-6674'
);

-- Insert sample data into Competitor_Registrations
INSERT INTO Competitor_Registrations (
    event_year_id,
    competitor_id,
    team_id
)
VALUES
(
    1,
    2,
    2
),
(   
    1,
    3,
    1
),
(
    1,
    6,
    2
),
(   
    1,
    5,
    1
),
(
    1,
    4,
    3
),
(
    1,
    1,
    3
),
(
    2,
    1,
    4
),
(
    2,
    4,
    3
),
(
    2,
    10,
    4
),
(
    2,
    6,
    2
),
(
    2,
    9,
    2
),
(
    2,
    8,
    1
),
(
    2,
    7,
    3
),
(
    2,
    5,
    1
);

-- Insert sample data into Dishes
INSERT INTO Dishes (
    dish_name,
    dish_description,
    event_year_id,
    team_id,
    course_id
)
VALUES
(
    'Crispy Calamari Rings',
    'Lightly battered squid rings, deep-fried until golden, served with a tangy lemon aioli.',
    1,
    1,
    1
),
(
    'Honey-Glazed Salmon Fillet',
    'Fresh salmon glazed with a blend of honey, garlic, and soy, grilled to perfection, accompanied by asparagus spears.',
    1,
    2,
    2
),
(
    'Triple Chocolate Mousse',
    'Velvety layers of dark, milk, and white chocolate mousse, topped with a dusting of cocoa powder.',
    1,
    3,
    3
),
(
    'Stuffed Portobello Caps',
    'Meaty mushrooms filled with herbed goat cheese, spinach, and roasted red peppers, drizzled with balsamic glaze.',
    1,
    2,
    1
),
(
    'Thyme-Infused Lamb Chops',
    'Juicy lamb chops seasoned with fresh thyme and rosemary, seared to desired doneness, paired with roasted root vegetables.',
    1,
    3,
    2
),
(
    'Roasted Beetroot Salad',
    'Freshly roasted beetroots combined with feta cheese, walnuts, and a honey dressing.',
    2,
    1,
    1
),
(
    'Mango Sorbet',
    'A refreshing mango sorbet made from ripe mangoes and a hint of lime.',
    2, 
    1, 
    3
),
(
    'Ginger Chicken Stir-Fry', 
    'Aromatic ginger-infused chicken stir-fried with crisp vegetables in a light soy sauce.', 
    2, 
    3, 
    2
),
(
    'Spinach and Feta Tart',
    'A flaky tart filled with sautéed spinach and creamy feta cheese.', 
    2, 
    2, 
    1
),
(
    'Mocha Cheesecake',
    'Creamy cheesecake with a hint of coffee and chocolate.', 
    2, 
    2, 
    3
);

-- Insert sample data into Ratings
INSERT INTO Ratings (
    rating,
    comments,
    attendee_id,
    dish_id
)
VALUES
(
    9,
    'Give these to me any day of the week',
    1,
    1
),
(
    10,
    'BEST. SALMON. EVER.',
    2,
    2
),
(
    7,
    'Maybe too sweet for me?',
    1,
    3
),
(
    5,
    'Not a fan of calamari, and still not!',
    3,
    1
),
(
    9,
    'Thyme-anything is heaven on a plate!',
    4,
    5
),
(
    8, 
    'Loved the combination of flavors!', 
    8, 
    6
),
(
    9, 
    'A delightful dessert!', 
    7, 
    7
),
(
    7, 
    'Good but could use more ginger', 
    10, 
    8
),
(
    10, 
    'The tart was outstanding!', 
    9, 
    9
),
(
    8, 
    'Perfect balance of coffee and chocolate', 
    5, 
    10
);

-- Overview of DB
DESCRIBE Event_Years;
DESCRIBE Courses;
DESCRIBE Ticket_Types;
DESCRIBE Teams;
DESCRIBE Attendees;
DESCRIBE Ticket_Sales;
DESCRIBE Competitors;
DESCRIBE Competitor_Registrations;
DESCRIBE Dishes;
DESCRIBE Ratings;

-- Print out of sample data
SELECT * FROM Event_Years;
SELECT * FROM Courses;
SELECT * FROM Ticket_Types;
SELECT * FROM Discounts;
SELECT * FROM Tickets;
SELECT * FROM Teams;
SELECT * FROM Attendees;
SELECT * FROM Ticket_Sales;
SELECT * FROM Competitors;
SELECT * FROM Competitor_Registrations;
SELECT * FROM Dishes;
SELECT * FROM Ratings;

-- Update config
SET FOREIGN_KEY_CHECKS=1;
COMMIT;