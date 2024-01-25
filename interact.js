const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '5502',
  user: 'root',
  password: '',
  database: 'employee_management'
});



