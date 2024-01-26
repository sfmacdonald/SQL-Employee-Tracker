const inquirer = require('inquirer');
const mysql = require('mysql2');
const { askQuestions, processAnswers } = require('./prompts');
const {
  getDepartments,
  getDepartmentId,
  addDepartment,
  getRoles,
  getRoleId,
  addRole,
  getEmployees,
  getEmployeeId,
  addEmployee,
  updateEmployeeRole
} = require('./database');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 5502,
  user: 'root',
  password: '',
  database: 'employee_management'
});

// Use inquirer to prompt user input
inquirer.prompt(askQuestions(process.argv[2]))
  .then(processAnswers(process.argv[2], connection));
