const inquirer = require('inquirer');

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
      choices: async () => {
        const departments = await getDepartments();
        return departments.map(department => ({ name: department.name, value: department.id }));
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
      choices: async () => {
        const roles = await getRoles();
        return roles.map(role => ({ name: role.title, value: role.id }));
      }
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the manager of the new employhee?',
      choices: async () => {
        const employees = await getEmployees();
        return employees.map(employee => ({ name: `${employee.firstName} ${employee.lastName}`, value: employee.id }));
      }
    }
  ],
  updateEmployeeRole: [
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee do you want to update?',
      choices: async () => {
        const employees = await getEmployees();
        return employees.map(employee => ({ name: `${employee.firstName} ${employee.lastName}`, value: employee.id }));
      }
    },
    {
      type: 'list',
      name: 'role',
      message: 'Which role do you want to assign to the employee?',
      choices: async () => {
        const roles = await getRoles();
        return roles.map(role => ({ name: role.title, value: role.id }));
      }
    }
  ]
};

function askQuestions(choice) {
  return questions[choice];
}

module.exports = {
  askQuestions
};
