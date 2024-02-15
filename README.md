# SQL-Employee-Tracker
Track and view employee data in a SQL db

## Table of Contents

- [Project Name](#sql-employee-tracker)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)

## Description

The purpose of the application is that of a content management systems (CMS) to maintain employee records via a database that can be updated with a user's command terminal.

## Features

This terminal app has the following features and functions:

1. Ability to view the employee database via the command terminal including viewing all departments, all roles and all employees.
    - Viewing the employee database shall include:
        - A "Departments" table:
            - A formatted table showing department names and their respective department ID's
        - A "Roles" table:
            - A formatted table showing job titles, their role ID, the department that role belongs to and the salary for that role.
        - An "Employees" table:
            - A formatted table showing employee data including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to

2. Ability to add a new department, a new role and a new employee as well as update an employee's role. These additions/updates shall be reflected and viewed in the database once saved successfully. 
    - When adding a new department to the database, the user shall be prompted to input the following data:
        -  The name of the new department and that department is added to the database with an automated department ID that auto-increments
    - When adding a new role to the database, the user shall be prompted to input the following data:
        - The job title, salary, and coorrelating department (from the exisiting Departments table) for the new role
    - When adding a new employee to the database, the user shall be prompted to input the following data:
        - The employee’s ID, first name, last name, role (from the exisiting Roles table) and manager
    - When updating an employee's role:
        - The employee's role shall be selected from the existing Roles table

## Usage

The github repository may be found at https://github.com/sfmacdonald/SQL-Employee-Tracker

See attached screenrecording for demonstration: https://drive.google.com/file/d/1iti_YL-oIBPbyuSFFmsYQfb8Z5C78DBS/view

## Testing

Testing may be accomplished manually by:

1. Acessing the database via Node JS
2. When prompted, select the table that you wish to update (Departments, Roles, Employees)
3. Follow the onscreen prompts inputting the requested data
4. Once completed, review the additions/updates via mysql