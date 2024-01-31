// main.js
const readlineSync = require('readline-sync');
const inquirer = require('inquirer');
const { connection } = require('./dbConnection');

// Define questions for inquirer
const questions = {
  Department: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new department?'
    }
  ],
  addRole: [
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role?'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Which department does the new role belong to?',
      choices: () => getDepartments()
    }
  ],
  addEmployee: [
    {
      type: 'input',
      name: 'operatingNumber',
      message: 'What is the operating number for the new employee? Follow the format: two letters, a hyphen, then 4 digits of your choosing (i.e. AB-1234)'
    },
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the new employee?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the role of the new employee?',
      choices: () => getRoles()
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the manager of the new employee?',
      choices: () => getEmployees()
    }
  ],
  updateEmployeeRole: [
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee do you want to update?',
      choices: () => getEmployees()
    },
    {
      type: 'list',
      name: 'role',
      message: 'Which role do you want to assign to the employee?',
      choices: () => getRoles()
    }
  ]
};

// Implementations of database-related functions

// Add a new department to the database
function addDepartment(name) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, [name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Department added successfully!');
        resolve(results);
      }
    });
  });
}

// Get a department ID by its name
function getDepartments() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching departments:', err);
        reject(err);
      } else {
        resolve(results.map(row => row.name));
      }
    });
  });
}

function getRoles() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching roles:', err);
        reject(err);
      } else {
        resolve(results.map(row => row.title));
      }
    });
  });
}

function getEmployees() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        reject(err);
      } else {
        resolve(results.map(row => `${row.first_name} ${row.last_name}`));
      }
    });
  });
}

// Process answers based on choice, connection, and answers
async function processAnswers(choice, connection, answers) {
  // Implement logic to process answers based on the choice
  switch (choice) {
    case 'addDepartment':
      try {
        await addDepartment(answers.name);
        connection.end();
      } catch (err) {
        console.error('Error adding department:', err);
        connection.end();
        process.exit(1);
      }
      break;
    case 'addRole':
      try {
        const departmentId = await getDepartmentId(answers.department);
        await addRole(answers.title, answers.salary, departmentId);
        connection.end();
      } catch (err) {
        console.error('Error adding role:', err);
        connection.end();
        process.exit(1);
      }
      break;
    case 'addEmployee':
      try {
        // Validate operatingNumber format
        const opNumRegex = /^[A-Za-z]{2}-\d{4}$/;
        if (!opNumRegex.test(answers.operatingNumber)) {
          console.error('Invalid operating number format. Please follow the format: AB-1234');
          connection.end();
          process.exit(1);
        }

        const [roleId, managerId] = await Promise.all([getRoleId(answers.role), getEmployeeId(answers.manager)]);
        await addEmployee(answers.operatingNumber, answers.firstName, answers.lastName, roleId, managerId);
        connection.end();
      } catch (err) {
        console.error('Error adding employee:', err);
        connection.end();
        process.exit(1);
      }
      break;
    case 'updateEmployeeRole':
      try {
        const [employeeId, roleId] = await Promise.all([getEmployeeId(answers.employee), getRoleId(answers.role)]);
        await updateEmployeeRole(employeeId, roleId);
        connection.end();
      } catch (err) {
        console.error('Error updating employee role:', err);
        connection.end();
        process.exit(1);
      }
      break;
    // ... (Other cases as needed)
  }
}

// Listen for SIGINT signal and handle it gracefully
process.on('SIGINT', () => {
  console.log('Received SIGINT signal, exiting gracefully...');
  connection.end();
  process.exit(0);
});

// Main inquirer prompt flow
const choice = process.argv[2] || 'addDepartment'; // Set a default value if process.argv[2] is not defined
inquirer.prompt(questions[choice])
  .then(async (answers) => {
    await processAnswers(choice, connection, answers);
  })
  .then(() => {
    console.log('Operation completed successfully.');
  })
  .catch((err) => {
    console.error('Error during operation:', err);
    process.exit(1); // Exit with error code 1
  });

// Export necessary functions
module.exports = {
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getDepartments,
  getRoles,
  getEmployees
};