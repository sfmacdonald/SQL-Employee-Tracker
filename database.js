const { connection } = require('./dbConnection');

function addDepartment(name) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Department added successfully!');
        resolve();
      }
    });
  });
}

function getDepartmentId(name) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT id FROM department WHERE name = ?', [name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
}

function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Role added successfully!');
        resolve();
      }
    });
  });
}

function getRoleId(title) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT id FROM role WHERE title = ?', [title], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
}

function addEmployee(operatingNumber, firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO employee (operating_number, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)', [operatingNumber, firstName, lastName, roleId, managerId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Employee added successfully!');
        resolve();
      }
    });
  });
}

function updateEmployeeRole(employeeId, roleId) {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('Employee role updated successfully!');
        resolve();
      }
    });
  });
}

module.exports = {
  addDepartment,
  getDepartmentId,
  addRole,
  getRoleId,
  addEmployee,
  updateEmployeeRole
};
