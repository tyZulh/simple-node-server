const mysql = require('mysql');

require('dotenv').config(process.cwd(), '.env')

/*
connect to the database
*/

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
});

/*
test the connection to the database
*/

connection.connect(err => {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database", err);
    }
});

module.exports = connection;