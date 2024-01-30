// main.js
const inquirer = require('inquirer');
const { connection } = require('./dbConnection'); // Import the connection from dbConnection.js

// Define questions for inquirer
const questions = {
  addDepartment: [
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
      choices: () => {
        return getDepartments().then(departments => {
          return departments.map(department => ({ name: department.name, value: department.id }));
        }).catch(err => {
          console.error(err);
          return [];
        });
      }
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
      choices: () => {
        return getRoles().then(roles => {
          return roles.map(role => ({ name: role.title, value: role.id }));
        }).catch(err => {
          console.error(err);
          return [];
        });
      }
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the manager of the new employee?',
      choices: () => {
        return getEmployees().then(employees => {
          return employees.map(employee => ({ name: `${employee.firstName} ${employee.lastName}`, value: employee.id }));
        }).catch(err => {
          console.error(err);
          return [];
        });
      }
    }
  ],
  updateEmployeeRole: [
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee do you want to update?',
      choices: () => {
        return getEmployees().then(employees => {
          return employees.map(employee => ({ name: `${employee.firstName} ${employee.lastName}`, value: employee.id }));
        }).catch(err => {
          console.error(err);
          return [];
        });
      }
    },
    {
      type: 'list',
      name: 'role',
      message: 'Which role do you want to assign to the employee?',
      choices: () => {
        return getRoles().then(roles => {
          return roles.map(role => ({ name: role.title, value: role.id }));
        }).catch(err => {
          console.error(err);
          return [];
        });
      }
    }
  ]
};

function askQuestions(choice) {
  return questions[choice];
}

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
function getDepartmentId(name) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM department WHERE name = ?';
    connection.query(query, [name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
}

// Add a new role to the database
function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query, [title, salary, departmentId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Role added successfully!');
        resolve(results);
      }
    });
  });
}

// Get a role ID by its title
function getRoleId(title) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM role WHERE title = ?';
    connection.query(query, [title], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
}

// Add a new employee to the database
function addEmployee(operatingNumber, firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO employee (operating_number, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [operatingNumber, firstName, lastName, roleId, managerId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Employee added successfully!');
        resolve(results);
      }
    });
  });
}

// Update an employee's role
function updateEmployeeRole(employeeId, roleId) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(query, [roleId, employeeId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Employee role updated successfully!');
        resolve(results);
      }
    });
  });
}


// Process answers based on choice, connection, and answers
function processAnswers(choice, connection, answers) {
  // Implement logic to process answers based on the choice
  switch (choice) {
    case 'addDepartment':
      // Process adding a department
      break;
    case 'addRole':
      // Process adding a role
      break;
    case 'addEmployee':
      // Process adding an employee
      break;
    case 'updateEmployeeRole':
      // Process updating an employee's role
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
inquirer.prompt(askQuestions(process.argv[2]))
  .then((answers) => {
    return processAnswers(process.argv[2], connection, answers);
  })
  .then(() => {
    console.log('Operation completed successfully.');
    connection.end();
  })
  .catch((err) => {
    console.error(err);
    connection.end();
    process.exit(1); // Exit with error code 1
  });

// Export necessary functions
module.exports = {
  askQuestions,
  // ... (Other exports as needed)
};
