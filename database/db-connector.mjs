// ./database/db-connector.js

// Get an instance of mysql we can use in the app
import mysql from 'mysql';

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_hesterca',
    password        : '3952',
    database        : 'cs340_hesterca',
})

export { pool };