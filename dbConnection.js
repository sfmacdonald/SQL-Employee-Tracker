const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.on('error', (err) => {
  console.error('MySQL connection error:', err.stack);
  // Handle the error appropriately for your application
});

module.exports = { connection };