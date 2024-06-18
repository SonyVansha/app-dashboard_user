const mysql = require('mysql2');
require('dotenv').config()

// Buat pool koneksi dengan dukungan Promises
const connectdb = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// This function creates the users table
const createUsersTable = async () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
    users_id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(200) DEFAULT NULL,
    email varchar(200) DEFAULT NULL,
    password varchar(200) DEFAULT NULL,
    PRIMARY KEY (users_id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;
  `;
  try {
    const connection = await connectdb.getConnection();
    await connection.query(createTableSQL);
    connection.release();
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

module.exports = {
  connectdb,
  createUsersTable
};
