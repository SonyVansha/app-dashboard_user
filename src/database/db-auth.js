const mysql = require('mysql2');
const mysql_promise = require('mysql2/promise');
require('dotenv').config()

// Get the connection to the database
const connect_db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const method_db = mysql_promise.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Create the table for users
const createUsersLogin = async () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;

    connect_db.query(createUsersTable, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Users table checked/created.');
    });
  };

module.exports = {connect_db, method_db, createUsersLogin};