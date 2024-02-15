// main.js
const inquirer = require("inquirer");
const { connection } = require("./dbConnection");

// Define questions for inquirer
const questions = {
  addDepartment: [
    {
      type: "input",
      name: "name",
      message: "What is the name of the new department?",
    },
  ],
  addRole({ departments }) {
    return [
      {
        type: "input",
        name: "title",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the new role belong to?",
        choices: departments,
      },
    ];
  },
  addEmployee: (roles, managers) => [
    {
      type: "input",
      name: "operatingNumber",
      message: "What is the operating number for the new employee? Follow the format: two letters, a hyphen, then 4 digits of your choosing (i.e. AB-1234)",
    },
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the new employee?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the new employee?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the role of the new employee?",
      choices: roles, 
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the manager of the new employee?",
      choices: managers, 
    },
  ],
  updateEmployeeRole: [
    {
      type: "list",
      name: "employee",
      message: "Which employee do you want to update?",
      choices: () => getEmployees(),
    },
    {
      type: "list",
      name: "role",
      message: "Which role do you want to assign to the employee?",
      choices: () => getRoles(),
    },
  ],
};

// Implementations of database-related functions

// Add a new department to the database
function addDepartment(name) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO department (name) VALUES (?)";
    connection.query(query, [name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log("Department added successfully!");
        resolve(results);
      }
    });
  });
}

// Get a department ID by its name
function getDepartments() {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT DepartmentName as name, DepartmentID as id FROM Departments";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching departments:", err);
        reject(err);
      } else {
        resolve(results.map((row) => ({ name: row.name, value: row.id })));
      }
    });
  });
}

function getRoles() {
  return new Promise((resolve, reject) => {
    const query = "SELECT Title FROM Roles";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching roles:", err);
        reject(err);
      } else {
        resolve(results.map((row) => ({ name: row.Title, value: row.RoleID })));
      }
    });
  });
}

function getEmployees() {
  return new Promise((resolve, reject) => {
    const query = "SELECT FirstName, LastName, EmployeeID FROM Employees";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching employees:", err);
        reject(err);
      } else {
        resolve(results.map((row) => ({ name: `${row.FirstName} ${row.LastName}`, value: row.EmployeeID })));
      }
    });
  });
}

function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO Roles (Title, Salary, DepartmentID) VALUES (?, ?, ?)";
    connection.query(query, [title, salary, departmentId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log("Role added successfully!");
        resolve(results);
      }
    });
  });
}

function addEmployee(operatingNumber, firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO Employees (OperatingNumber, FirstName, LastName, RoleID, ManagerID) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [operatingNumber, firstName, lastName, roleId, managerId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log("Employee added successfully!");
        resolve(results);
      }
    });
  });
}

function updateEmployeeRole(employeeId, roleId) {
  return new Promise((resolve, reject) => {
    const query = "UPDATE Employees SET RoleID = ? WHERE EmployeeID = ?";
    connection.query(query, [roleId, employeeId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log("Employee role updated successfully!");
        resolve(results);
      }
    });
  });
}

// Utility functions for getting IDs (not fully implemented in the provided snippet)
async function getRoleId(roleName) {
  // Implementation similar to getEmployees but for Roles based on roleName
}

async function getEmployeeId(employeeName) {
  // Implementation similar to getEmployees but for a specific employee based on employeeName
}



// Process answers based on choice, connection, and answers
async function processAnswers(choice) {
  // Implement logic to process answers based on the choice
  switch (choice) {
    case "addDepartment":
      try {
        const answers = await inquirer.prompt(questions.addDepartment);
        await addDepartment(answers.name);
        console.log("Department added successfully!");
      } catch (err) {
        console.error("Error adding department:", err);
      }
      break;

    case "addRole":
      try {
        console.log("Adding role...");
        const departments = await getDepartments();
        console.log("🚀 ~ processAnswers ~ departments:", departments);
        const answers = await inquirer.prompt(
          questions.addRole({ departments })
        );
        console.log("🚀 ~ processAnswers ~ answers:", answers);
      } catch (err) {
        console.error("Error adding role:", err);
      }
      break;
      
      case "addEmployee":
        try {
          const roles = await getRoles();
          const managers = await getEmployees();
          const answers = await inquirer.prompt(questions.addEmployee(roles, managers)); // Ensure this matches your updated questions structure
          // Validate operatingNumber format
          const opNumRegex = /^[A-Za-z]{2}-\d{4}$/;
          if (!opNumRegex.test(answers.operatingNumber)) {
            console.error(
              "Invalid operating number format. Please follow the format: AB-1234"
            );
            connection.end();
            process.exit(1);
          }

          const roleId = await getRoleId(answers.role);
          const managerId = await getEmployeeId(answers.manager);
          await addEmployee(
            answers.operatingNumber,
            answers.firstName,
            answers.lastName,
            roleId,
            managerId
          );
          connection.end();
        } catch (err) {
          console.error("Error adding employee:", err);
          connection.end();
          process.exit(1);
        }
        break;

     case "updateEmployeeRole":
       try {
        const answers = await inquirer.prompt(questions.updateEmployeeRole);
        const employeeId = await getEmployeeId(answers.employee); 
        const roleId = await getRoleId(answers.role); 
        await updateEmployeeRole(employeeId, roleId);
        console.log("Employee role updated successfully!");
      } catch (err) {
        console.error("Error updating employee role:", err);
      }
      break;

    default:
      console.log("Now exiting the Death Star Employee Database. Goodbye");
      connection.end();
      process.exit(0);
  }

  main();
}

async function main() {
  const foo = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Welcome to the Death Star Employee Database. What would you like to do?",
      choices: [
        { name: "Add a department", value: "addDepartment" },
        { name: "Add a role", value: "addRole" },
        { name: "Add an employee", value: "addEmployee" },
        { name: "Update an employee role", value: "updateEmployeeRole" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  processAnswers(foo.choice);
}

main();