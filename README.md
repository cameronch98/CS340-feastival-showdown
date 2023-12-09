# CS340_feastival_showdown

Set against the vibrant backdrop of Gourmetville is a culinary crown jewel – the annual “Feastival Showdown”. This three-day event invites the city’s top home chefs, often accompanied by their families and friends, to create mouth-watering masterpieces. The competition's design is one of unity and collaboration, with teams consisting of 4 or 5 members, be it solo chefs, pairs, trios, or larger groups. The event days correspond to the courses each team will be creating: appetizers light up the first day, entrées take center stage on the second, and desserts sweeten the conclusion on the third. Attendees have the honor of optionally rating each dish on a scale of 1-10, with the aggregate point tally crowning the next Feastival Champion.
In an effort to elevate the festival's experience, the organizational team has hired us to design a database capable of allowing it to scale and maintain historical data by tracking its yearly popularity through ticket sales, attendee counts, team makeup and competitors, and food entries. It will currently track 20 eclectic teams, and a combined talent of 80 to 100 chefs, participating to win top prize. The event is expected to draw crowds of 2,000 attendees or more, with our system monitoring ticket sales which will be segmented based on single-day, two-day, and three-day tickets. 

Maintaining a comprehensive record of each year's events allows organizers to analyze the data to discern trends and patterns. We aim to facilitate several key goals:
* Marketing Analysis: Allow marketing teams to access data anytime to analyze trends and set promotional campaigns or establish partnerships with sponsors by showcasing growth. 
* Real-time Dashboard: Event organizers will have a real-time dashboard showing ticket sales, attendee registrations and ratings given.
* Integration Capabilities: The database can integrate with email marketing platforms to send promotional offers to previous attendees, including cached image URLs of all entries for use in these campaigns. 
* Expansion: With an estimated 10% annual growth in attendees and a 5% increase in competing teams over the next five years, the database will be built to efficiently manage and analyze this growth.
* Smart Ticketing: The database will be capable of tracking previous attendees, offering potential early bird discounts or priority entry.
* Personalized Recommendations: Based on past dish ratings, attendees can receive suggestions on which stalls or dishes they might like during the next event.

This new database system will revolutionize the Feastival Showdown experience. For the organizers, it offers a consolidated platform to manage teams, track sales, and gather attendee feedback seamlessly. Participants benefit from an organized platform that recognizes their contributions year after year, enhancing their loyalty to the event. Attendees, on the other hand, will enjoy a more streamlined experience, from purchasing tickets to rating dishes. As the event scales, our robust database will ensure that the quality of the experience remains consistently top-notch.

Citations:

Citation for navbar CSS
Date: 12/01/2023
Adapted from W3 Schools
Utilized general navbar structure. Adapted to color scheme and
modified to include active element properties. Modified to include
button for reloading database.
Source URL: https://www.w3schools.com/howto/howto_js_topnav.asp

Citation for table CSS
Date: 12/01/2023
Adapted from Dom(dcode) on dev.to
Utilized general table structure and bottom border. Header has been modified. Hovers are implemented instead of 'active' rows, button has been implemented for adding new entries. Delete/edit buttons were implemented in table rows. Color scheme is different. Several properties like size and shadow modified to liking. Padding and such has been modified at this point.
Source URL: https://dev.to/dcodeyt/creating-beautiful-html-tables-with-css-428l

Citation for starter app code
Date: 12/01/2023
Adapted from the CS340 starter app tutorials
This code has been modified heavily at this point. We are using
fetches now and lots of additional error handling logic. The main
similarities are getting the form elements and using an event handler
for form submission.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

Citation for model query promise logic
Date: 12/01/2023
Adapted from Darif Nemma on Medium
Learned how to use SQL queries with async await logic from this post and used that to clean up the code from having a lot of callback nesting. The main logic of returning a new promise from the results of the SQL query was the extent of what was utilized from this source.
Source URL: https://darifnemma.medium.com/how-to-interact-with-mysql-database-using-async-await-promises-in-node-js-9e6c81b683da

Citation: successPopup, failurePopup, 'popup' classes in html/css
Date: 12/08/2023
Adapted from youtube video
Learned the main logic of appending the class and removing it
to apply different styles and make the popup appear/disappear.
My popups are for success and failure though. Main div logic 
from video incorporated. Div duplicated to consider failure and
success. Messages are custom and specificity with ids and classes is modified to my own liking for styling purposes. The dom tree is 
modified to provide the message for the failure one, which is 
unique to our project. Works alongside successPopup and failurePopup functions in public js. A lot of the CSS from the video used and adapted to our particular use case including colors, some changes to shape, 
size and positioning, changes to the transformations. Image not used, instead custom headers for success or failure implemented.
Source URL: https://www.youtube.com/watch?v=AF6vGYIyV8M

Citation for elements following similar specificity declarations to
those in the website: (towards end of CSS)
Date: 12/08/2023
Adapted from MDN
The basis of the input validation CSS pseudoclasses was learned here
and the basic example utilizing the checks and x's was used and built
upon. There are many more specific declarations with custom strings
built for the forms in our project.
Source URL: https://developer.mozilla.org/en-US/docs/Web/CSS/:valid

Citation for disabled selected hidden option elements:
Date: 12/08/2023
Copied from stackoverflow
One liner copied to allow me to have placeholder name for
select elements without being able to submit them.
Source URL: https://stackoverflow.com/questions/5805059/how-do-i-make-a-placeholder-for-a-select-box