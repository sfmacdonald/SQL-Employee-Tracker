const connection = require('mysql2').createConnection({
    host: '127.0.0.1',
    port: 5502,
    user: 'root',
    password: '',
    database: 'employee_management'
  });
  
  function addDepartment(name) {
    connection.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Department added successfully!');
      }
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
    connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Role added successfully!');
      }
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
  
  function addEmployee(firstName, lastName, roleId, managerId) {
    connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Employee added successfully!');
      }
    });
  }
  
  function updateEmployeeRole(employeeId, roleId) {
    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Employee role updated successfully!');
      }
    });
  }
  
  
  module.exports = {
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
  };
  